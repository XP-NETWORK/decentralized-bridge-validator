import {
  AbiRegistry,
  Account,
  AddressValue,
  BigUIntValue,
  BinaryCodec,
  BytesValue,
  Field,
  ResultsParser,
  SmartContract,
  Struct,
} from "@multiversx/sdk-core/out";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import {
  Address,
  Nonce,
} from "@multiversx/sdk-network-providers/out/primitives";
import { Mnemonic, UserSigner } from "@multiversx/sdk-wallet/out";
import axios from "axios";
import { keccak256 } from "ethers";
import { BridgeStorage } from "../../contractsTypes/evm";
import { multiversXBridgeABI } from "../../contractsTypes/evm/abi";
import { THandler } from "../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../utils";

import { Root } from "./gateway";
import { MXClaimDataSchema } from "./schema";

export function multiversxHandler(
  provider: INetworkProvider,
  gatewayURL: string,
  signer: UserSigner,
  chainID: string,
  bridge: string,
  storage: BridgeStorage,
  lastBlock: bigint,
): THandler {
  const multiversXBridgeAddress = new Address(bridge);
  const abiRegistry = AbiRegistry.create(multiversXBridgeABI);
  const bc = new SmartContract({
    address: multiversXBridgeAddress,
    abi: abiRegistry,
  });

  const gateway = axios.create({
    baseURL: gatewayURL,
  });

  const vc = async (): Promise<bigint> => {
    const query = bc.createQuery({
      func: "validatorsCount",
    });
    const queryResponse = await provider.queryContract(query);
    const validatorsCountDefinition = bc.getEndpoint("validatorsCount");

    const { firstValue } = new ResultsParser().parseQueryResponse(
      queryResponse,
      validatorsCountDefinition,
    );
    if (!firstValue)
      throw new Error("Failed to read validator count in multiversx");
    const count = firstValue.valueOf();
    return count;
  };
  const getNonFungibleToken = async (
    collection: string,
    nonce: number,
  ): Promise<{ royalties: number; metaData: string }> => {
    const nonceAsHex = new Nonce(nonce).hex();
    const response = (
      await (
        await fetch(
          `${gatewayURL.replace(
            "gateway",
            "api",
          )}/nfts/${collection}-${nonceAsHex}`,
        )
      ).json()
    ).data;
    return {
      metaData: atob(response.uris[1]),
      royalties: response.royalties,
    };
  };
  return {
    chainIdent: "MULTIVERSX",
    async generateWallet() {
      const mnemonic = Mnemonic.generate();
      const secretKey = mnemonic.deriveKey(0);
      return {
        address: secretKey.generatePublicKey().toAddress().bech32(),
        pk: secretKey.hex(),
      };
    },
    async selfIsValidator() {
      const query = bc.createQuery({
        func: "validators",
        args: [
          new BytesValue(Buffer.from(signer.getAddress().bech32(), "hex")),
        ],
      });
      const queryResponse = await provider.queryContract(query);
      const validatorsDefinition = bc.getEndpoint("validators");
      const resultsParser = new ResultsParser();
      const { firstValue } = resultsParser.parseQueryResponse(
        queryResponse,
        validatorsDefinition,
      );
      let added = false;
      if (firstValue) ({ added } = firstValue.valueOf()[0]);
      return added;
    },
    async listenForLockEvents(builder, cb) {
      let lastBlock_ = lastBlock;
      while (true) {
        const txs = (
          await gateway.get<Root>(`hyperblock/by-nonce/${lastBlock_}`)
        ).data;

        const txsForBridge = txs.data.hyperblock.transactions.filter(
          (e) =>
            (e.receiver.toLowerCase() === bridge.toLowerCase() &&
              e.function === "lock721") ||
            e.function === "lock1155",
        );

        if (!txsForBridge.length) {
          console.info(
            `No Transactions found in chain ${this.chainIdent} from block: ${lastBlock}`,
          );
          console.log(
            "Waiting for 10 Seconds before looking for new transactions",
          );
          const lastestStatus = await provider.getNetworkStatus();
          const lastNonce = lastestStatus.HighestFinalNonce;
          lastBlock_ = lastBlock_ + 1n;
          if (lastBlock >= lastNonce) {
            // Sleep for 2 minutes
            await new Promise<undefined>((e) => setTimeout(e, 2 * 60 * 1000));
            continue;
          }
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const tx of txsForBridge) {
          const response = (
            await axios.get(
              `${gatewayURL.replace("gateway", "api")}/transactions/${tx.hash}`,
            )
          ).data;
          const lockEvent = response.results.logs.find(
            (e: { identifier: string }) =>
              e.identifier === "lock721" || e.identifier === "lock1155",
          );
          const completed = response.results.logs.find(
            (e: { identifier: string }) => e.identifier === "completedTxEvent",
          );

          if (!lockEvent || !completed) {
            throw new Error("Invalid Lock Transaction");
          }
          const decodedLogs = decodeBase64Array(lockEvent.topics);
          const tokenId = String(decodedLogs[1].charCodeAt(0));
          const destinationChain = decodedLogs[2];
          const destinationUserAddress = decodedLogs[3];
          const sourceNftContractAddress = decodedLogs[4];
          const tokenAmount = String(decodedLogs[5].charCodeAt(0));
          const nftType = decodedLogs[6];
          const sourceChain = decodedLogs[7];
          return cb(
            builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount,
              nftType,
              sourceChain,
              tx.hash,
            ),
          );
        }
      }
    },
    async nftData(tokenId, contract) {
      const nftDetails =
        await provider.getDefinitionOfTokenCollection(contract);
      const { royalties, metaData } = await getNonFungibleToken(
        contract,
        parseInt(tokenId),
      );
      return {
        name: nftDetails.name,
        symbol: nftDetails.ticker,
        metadata: metaData,
        royalty: BigInt(royalties),
      };
    },
    async addSelfAsValidator() {
      let validatorCount = Number(await vc());
      let signatureCount = Number(
        await storage.getStakingSignaturesCount(signer.getAddress().bech32()),
      );

      while (signatureCount < confirmationCountNeeded(validatorCount)) {
        await waitForMSWithMsg(
          ProcessDelayMilliseconds,
          `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
            validatorCount,
          )}`,
        );
        signatureCount = Number(
          await storage.getStakingSignaturesCount(signer.getAddress().bech32()),
        );
        validatorCount = Number(await vc());
      }

      const signatures = [
        ...(await storage.getStakingSignatures(signer.getAddress().bech32())),
      ].map((item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      });

      const userAddress = new Address(signer.getAddress().bech32());
      const userAccount = new Account(userAddress);
      const userOnNetwork = await provider.getAccount(userAddress);
      userAccount.update(userOnNetwork);

      const data = [
        new AddressValue(signer.getAddress()),
        signatures.map((item) => {
          return {
            sig: new BytesValue(
              Buffer.from(item.signature.replace("0x", ""), "hex"),
            ),
            public_key: new AddressValue(new Address(userAddress.bech32())),
          };
        }),
      ];

      const transaction = bc.methods
        .addValidator(data)
        .withSender(signer.getAddress())
        .withChainID(chainID)
        .withNonce(userAccount.nonce)
        .withGasLimit(6_000_000_00)
        .buildTransaction();
      transaction.applySignature(
        await signer.sign(transaction.serializeForSigning()),
      );
      await provider.sendTransaction(transaction);
      return "success";
    },
    async signClaimData(buf) {
      // Mitigation if destination user address is invalid
      let destinationAddress = new Address(buf.royaltyReceiver);
      try {
        destinationAddress = new Address(buf.destinationUserAddress);
      } catch (e) {
        console.error(
          "wrong destination address, nft sent to royality reciever address",
        );
      }
      const claimDataArgs = new Struct(MXClaimDataSchema, [
        new Field(
          new BytesValue(
            Buffer.from(new Nonce(Number(buf.tokenId)).hex(), "hex"),
          ),
          "token_id",
        ),
        new Field(new BytesValue(Buffer.from(buf.sourceChain)), "source_chain"),
        new Field(
          new BytesValue(Buffer.from(buf.destinationChain)),
          "destination_chain",
        ),
        new Field(
          new AddressValue(destinationAddress),
          "destination_user_address",
        ),
        new Field(
          new BytesValue(Buffer.from(buf.sourceNftContractAddress)),
          "source_nft_contract_address",
        ),
        new Field(new BytesValue(Buffer.from(buf.name)), "name"),
        new Field(
          new BytesValue(Buffer.from(`N${buf.sourceChain.toUpperCase()}`)),
          "symbol",
        ),
        new Field(new BigUIntValue(Number(buf.royalty)), "royalty"),
        new Field(
          new AddressValue(new Address(buf.royaltyReceiver)),
          "royalty_receiver",
        ),
        new Field(new BytesValue(Buffer.from(buf.metadata)), "attrs"),
        new Field(
          new BytesValue(Buffer.from(buf.transactionHash)),
          "transaction_hash",
        ),
        new Field(new BigUIntValue(buf.tokenAmount), "token_amount"),
        new Field(new BytesValue(Buffer.from(buf.nftType)), "nft_type"),
        new Field(new BigUIntValue(buf.fee), "fee"),
      ]);

      const data = new BinaryCodec().encodeNested(claimDataArgs);

      const signedData = await signer.sign(Buffer.from(keccak256(data), "hex"));
      return {
        signature: signedData.toString("hex"),
        signer: signer.getAddress().bech32(),
      };
    },
  };
}

const decodeBase64Array = (encodedArray: string[]): string[] => {
  return encodedArray.map((encodedString) => {
    return Buffer.from(encodedString, "base64").toString("utf-8");
  });
};
