import {
  Address,
  Dictionary,
  Sender,
  TonClient,
  WalletContractV4,
  beginCell,
  toNano,
} from "@ton/ton";
import { sign } from "ton-crypto";
import TonWeb from "tonweb";
import { HttpProvider } from "tonweb/dist/types/providers/http-provider";
import { BridgeStorage } from "../../contractsTypes/evm";
import {
  Bridge,
  ClaimData,
  NewValidator,
  SignerAndSignature,
  loadLockedEvent,
  storeClaimData,
} from "../../contractsTypes/ton/tonBridge";
import { NftCollection } from "../../contractsTypes/ton/tonNftCollection";
import { NftItem } from "../../contractsTypes/ton/tonNftContract";
import { THandler, TWallet } from "../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../utils";

export function tonHandler(
  client: TonClient,
  provider: HttpProvider,
  signer: WalletContractV4,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  walletSender: Sender,
  secretKey: string,
): THandler {
  const bc = client.open(
    Bridge.fromAddress(Address.parseFriendly(bridge).address),
  );

  const tonweb = new TonWeb(provider);

  return {
    async addSelfAsValidator() {
      const publicKey = TonWeb.utils.bytesToHex(signer.publicKey);
      let validatorsCount = Number(await bc.getValidatorsCount());
      let signatureCount = Number(
        await storage.getStakingSignaturesCount(publicKey),
      );

      while (signatureCount < confirmationCountNeeded(validatorsCount)) {
        await waitForMSWithMsg(
          ProcessDelayMilliseconds,
          `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
            validatorsCount,
          )}`,
        );
        signatureCount = Number(
          await storage.getStakingSignaturesCount(publicKey),
        );
        validatorsCount = Number(await bc.getValidatorsCount());
      }

      const stakingSignatures = [
        ...(await storage.getStakingSignatures(publicKey)),
      ].map((item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      });
      const newValidatorPublicKey = Buffer.from(publicKey, "hex");
      const newValidatorPublicKeyBigInt = beginCell()
        .storeBuffer(newValidatorPublicKey)
        .endCell()
        .beginParse()
        .loadUintBig(256);
      const newValidator: NewValidator = {
        $$type: "NewValidator",
        key: newValidatorPublicKeyBigInt,
      };

      const sigs = Dictionary.empty<bigint, SignerAndSignature>();
      stakingSignatures.forEach((item, index) => {
        const signerPublicKey = Buffer.from(item.signerAddress, "hex");
        const signerPublicKeyBigInt = beginCell()
          .storeBuffer(signerPublicKey)
          .endCell()
          .beginParse()
          .loadUintBig(256);

        const sig: SignerAndSignature = {
          $$type: "SignerAndSignature",
          key: signerPublicKeyBigInt,
          signature: beginCell()
            .storeBuffer(Buffer.from(item.signature, "hex"))
            .endCell(),
        };
        sigs.set(BigInt(index), sig);
      });

      await bc.send(
        walletSender,
        {
          value: toNano("0.05"),
        },
        {
          $$type: "AddValidator",
          newValidatorPublicKey: newValidator,
          newValidatorAddress: Address.parseFriendly(publicKey).address,
          sigs,
          len: beginCell()
            .storeUint(sigs.keys.length, 256)
            .endCell()
            .beginParse()
            .loadUintBig(256),
        },
      );
      return "success";
    },
    async selfIsValidator() {
      const thisValidatorPk = beginCell()
        .storeBuffer(signer.publicKey)
        .endCell()
        .beginParse()
        .loadUintBig(256);
      const res = await tonweb.provider.call(bridge, "Validator", [
        ["num", thisValidatorPk.toString()],
      ]);
      return !!res.stack[0][1].elements.length;
    },
    chainIdent: "TON",
    async listenForLockEvents(builder, cb) {
      let lastBlock = Number(lastBlock_);
      while (true) {
        console.log(lastBlock);

        const latestTx = await client.getTransactions(
          Address.parseFriendly(bridge).address,
          { limit: 1 },
        );

        const transactions = await client.getTransactions(
          Address.parseFriendly(bridge).address,
          {
            limit: 100,
            hash: latestTx[0].hash().toString("base64"),
            lt: latestTx[0].lt.toString(),
            to_lt: String(lastBlock),
            inclusive: true,
          },
        );

        const startBlock = lastBlock;
        lastBlock = Number(transactions[0].lt);
        if (!transactions.length) {
          console.info(
            `No Transactions found in chain ${this.chainIdent} from block: ${startBlock} to: ${lastBlock}`,
          );
          console.log(
            "Waiting for 10 Seconds before looking for new transactions",
          );
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const tx of transactions) {
          for (let i = 0; i < tx.outMessages.size; i++) {
            const log = tx.outMessages.get(i) ?? raise("Unreachable");
            // if its not the lock nft event we early return
            if (log.body.asSlice().loadUint(32) !== 3571773646) {
              continue;
            }
            const {
              tokenId, // Unique ID for the NFT transfer
              destinationChain, // Chain to where the NFT is being transferred
              destinationUserAddress, // User's address in the destination chain
              sourceNftContractAddress, // Address of the NFT contract in the source chain
              tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
              nftType, // Sigular or multiple ( 721 / 1155)
              sourceChain, // Source chain of NFT
            } = loadLockedEvent(log.body.asSlice());

            const getSourceNftContractAddress = () => {
              try {
                return sourceNftContractAddress
                  .asSlice()
                  .loadAddress()
                  .toString();
              } catch (e) {
                return sourceNftContractAddress.asSlice().loadStringTail();
              }
            };

            return cb(
              builder.nftLocked(
                tokenId.toString(),
                destinationChain,
                destinationUserAddress,
                getSourceNftContractAddress(),
                tokenAmount.toString(),
                nftType,
                sourceChain,
                Buffer.from(tx.hash()).toString("hex"),
              ),
            );
          }
        }
      }
    },
    async nftData(_tokenId, contract) {
      const nftItem = client.open(
        NftItem.fromAddress(Address.parseFriendly(contract).address),
      );

      const getCollectionMetaData = async () => {
        const nftData = await nftItem.getGetNftData();
        if (nftData.collection_address) {
          const nftCollection = client.open(
            NftCollection.fromAddress(nftData.collection_address),
          );
          const { collection_content } =
            await nftCollection.getGetCollectionData();
          const collectionContentSlice = collection_content.asSlice();
          collectionContentSlice.loadUint(8);
          const metaDataURL = collectionContentSlice.loadStringTail();
          console.log({ metaDataURL });
          return metaDataURL;
        }
        const individualContentSlice = nftData.individual_content.asSlice();
        individualContentSlice.loadBits(8);
        const metaDataURL = individualContentSlice.loadStringTail();
        return metaDataURL;
      };

      const nftData = await nftItem.getGetNftData();
      const individualContentSlice = nftData.individual_content.asSlice();
      individualContentSlice.loadBits(8);
      const metaDataURL = individualContentSlice.loadStringTail();

      const metaData = (
        await (await fetch(await getCollectionMetaData())).json()
      ).data;

      let royalty = 0n;

      if (nftData.collection_address) {
        const nftCollection = client.open(
          NftCollection.fromAddress(nftData.collection_address),
        );
        const royaltyParams = await nftCollection.getRoyaltyParams();
        const royaltyInNum =
          royaltyParams.numerator / royaltyParams.denominator;
        const standardRoyalty = royaltyInNum * BigInt(10);
        royalty = standardRoyalty;
      }
      return {
        metadata: metaDataURL,
        symbol: "TTON",
        name: metaData.name,
        royalty,
      };
    },
    async signClaimData(data) {
      const sk = Buffer.from(secretKey, "hex");
      const {
        tokenId,
        sourceChain,
        destinationChain,
        destinationUserAddress,
        sourceNftContractAddress,
        name,
        symbol,
        royalty,
        royaltyReceiver,
        metadata,
        transactionHash,
        tokenAmount,
        nftType,
        fee,
      } = data;
      // Mitigation if destination user address is invalid
      let destinationAddress: Address;
      try {
        destinationAddress = Address.parseFriendly(
          destinationUserAddress,
        ).address;
      } catch (e) {
        destinationAddress = Address.parseFriendly(royaltyReceiver).address;
      }
      let sourceNftContractAddress_ = beginCell()
        .storeSlice(
          beginCell()
            .storeStringTail(sourceNftContractAddress)
            .endCell()
            .asSlice(),
        )
        .endCell();
      try {
        sourceNftContractAddress_ = beginCell()
          .storeSlice(
            beginCell()
              .storeAddress(
                Address.parseFriendly(sourceNftContractAddress).address,
              )
              .endCell()
              .asSlice(),
          )
          .endCell();
      } catch (e) {
        console.log("Not Native TON Address");
      }
      const claimData: ClaimData = {
        $$type: "ClaimData",
        data1: {
          $$type: "ClaimData1",
          tokenId: BigInt(tokenId),
          destinationChain,
          destinationUserAddress: destinationAddress,
          sourceChain,
          tokenAmount: BigInt(tokenAmount),
        },
        data2: {
          $$type: "ClaimData2",
          name,
          nftType,
          symbol,
        },
        data3: {
          $$type: "ClaimData3",
          fee: BigInt(fee),
          metadata,
          royaltyReceiver: Address.parseFriendly(royaltyReceiver).address,
          sourceNftContractAddress: sourceNftContractAddress_,
        },
        data4: {
          $$type: "ClaimData4",
          newContent: beginCell()
            .storeInt(0x01, 8)
            .storeStringRefTail(metadata)
            .endCell(),
          royalty: {
            $$type: "RoyaltyParams",
            numerator: BigInt(10000),
            denominator: BigInt(royalty),
            destination: Address.parseFriendly(royaltyReceiver).address,
          },
          transactionHash,
        },
      };
      const signature = `0x${sign(
        beginCell().store(storeClaimData(claimData)).endCell().hash(),
        sk,
      ).toString("hex")}`;

      return {
        signature: signature,
        signer: TonWeb.utils.bytesToHex(signer.publicKey),
      };
    },
    generateWallet() {
      const KeyPair = TonWeb.utils.nacl.sign.keyPair();
      const response: Promise<TWallet> = Promise.resolve({
        address: TonWeb.utils.bytesToHex(KeyPair.publicKey),
        pk: TonWeb.utils.bytesToHex(KeyPair.secretKey),
      });
      return response;
    },
  };
}

export function raise(msg: string): never {
  throw new Error(msg);
}
