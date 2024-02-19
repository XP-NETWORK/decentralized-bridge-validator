import { hash } from "@stablelib/blake2b";
import { packDataBytes } from "@taquito/michel-codec";
import { InMemorySigner } from "@taquito/signer";
import { Signer, TezosToolkit } from "@taquito/taquito";
import { Tzip16Module, bytes2Char, tzip16 } from "@taquito/tzip16";
import {
  b58cdecode,
  b58cencode,
  prefix,
  validateAddress,
} from "@taquito/utils";
import * as bip39 from "bip39";
import base58check from "bs58check";
import { keccak256 } from "ethers";
//@ts-expect-error no types copium
import sodium from "libsodium-wrappers-sumo";
import { TSupportedChains } from "../../config";
import { BridgeStorage } from "../../contractsTypes/evm";
import { BridgeContractType } from "../../contractsTypes/tezos/Bridge.types";
import { NFTContractType } from "../../contractsTypes/tezos/NFT.types";
import { tas } from "../../contractsTypes/tezos/type-aliases";
import { THandler } from "../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../utils";
import { TezosGetContractOperations } from "./operations";
import {
  TezosNftTransferDetailsSchema,
  TezosNftTransferDetailsTypes,
} from "./schema";

export async function tezosHandler(
  chainIdent: TSupportedChains,
  provider: TezosToolkit,
  signer: Signer,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
  restApiUrl: string,
): Promise<THandler> {
  const bc = await provider.contract.at<BridgeContractType>(bridge);

  const getNftTokenMetaData = async (contract: string, tokenId: bigint) => {
    const nftContract = await provider.contract.at<NFTContractType>(contract);

    const tokenMetaData = await (
      await nftContract.storage()
    ).token_metadata.get(tas.nat(tokenId.toString()));
    const metaDataInHex = tokenMetaData.token_info.get("");
    return bytes2Char(metaDataInHex);
  };
  return {
    async selfIsValidator() {
      return (await bc.storage()).validators.has(
        tas.address(await signer.publicKeyHash()),
      );
    },
    async addSelfAsValidator() {
      let validatorsCount = (await bc.storage()).validators_count.toNumber();
      let signatureCount = Number(
        await storage.getStakingSignaturesCount(await signer.publicKeyHash()),
      );

      while (signatureCount < confirmationCountNeeded(validatorsCount)) {
        await waitForMSWithMsg(
          ProcessDelayMilliseconds,
          `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
            validatorsCount,
          )}`,
        );
        signatureCount = Number(
          await storage.getStakingSignaturesCount(await signer.publicKeyHash()),
        );
        validatorsCount = (await bc.storage()).validators_count.toNumber();
      }

      const stakingSignatures = [
        ...(await storage.getStakingSignatures(await signer.publicKey())),
      ].map((item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      });

      await bc.methods
        .add_validator(
          tas.address(await signer.publicKeyHash()),
          stakingSignatures.map((e) => {
            const addr = tas.address(
              b58cencode(
                hash(
                  new Uint8Array(b58cdecode(e.signerAddress, prefix.edpk)),
                  20,
                ),
                prefix.tz1,
              ),
            );
            const sig = tas.signature(
              Buffer.from(e.signature.replace("0x", ""), "hex").toString(),
            );
            return {
              addr,
              sig,
              signer: tas.key(e.signerAddress),
            };
          }),
        )
        .send();
      return "success";
    },
    chainIdent: chainIdent,
    async listenForLockEvents(builder, cb) {
      let lastBlock = Number(lastBlock_);
      while (true) {
        console.log(lastBlock);

        const latestBlockNumber = (await provider.rpc.getBlockHeader()).level;

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const logs = await TezosGetContractOperations({
          fromLevel: lastBlock,
          toLevel: latestBlock,
          contractAddress: bridge,
          restApiURL: restApiUrl,
        });
        const startBlock = lastBlock;
        lastBlock = latestBlockNumber;
        if (!logs.length) {
          console.info(
            `No Transactions found in chain ${chainIdent} from block: ${startBlock} to: ${latestBlockNumber}`,
          );
          console.log(
            "Waiting for 10 Seconds before looking for new transactions",
          );
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const log of logs) {
          const isLocked = log.tag === "locked";
          if (!isLocked) continue;
          const sourceNftContractAddress = extractStrOrAddr(
            log.source_nft_address,
          );

          const {
            token_id: tokenId, // Unique ID for the NFT transfer
            dest_chain: destinationChain, // Chain to where the NFT is being transferred
            dest_address: destinationUserAddress, // User's address in the destination chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
            transaction_hash: transactionHash,
          } = log;
          return cb(
            builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount,
              nftType,
              sourceChain,
              transactionHash,
            ),
          );
        }
      }
    },
    async nftData(tokenId, contract) {
      const tokenMd = await getNftTokenMetaData(contract, BigInt(tokenId));
      let name = "NTEZOS";
      try {
        provider.addExtension(new Tzip16Module());
        const nftContract = await provider.contract.at(contract, tzip16);
        const md = nftContract.tzip16();
        name = (await md.metadataName()) ?? name;
      } catch (e) {
        console.log("error getting name Tezos");
      }
      let symbol = "NTEZOS";
      try {
        const isUrl = URLCanParse(tokenMd);
        if (isUrl) {
          const metaData: { symbol?: string } = await fetch(tokenMd).then(
            (res) => res.json(),
          );
          symbol = metaData.symbol ?? symbol;
        }
        symbol = JSON.parse(tokenMd).symbol ?? symbol;
      } catch (e) {
        console.log("error getting symbol Tezos", e);
      }
      let royalty = 0n;
      try {
        const metaDataOrURL = await getNftTokenMetaData(
          contract,
          BigInt(tokenId),
        );
        const isUrl = URLCanParse(metaDataOrURL);
        let metaData: {
          royalties: {
            decimals: number;
            shares: {
              [key: string]: number;
            };
          };
        };

        if (isUrl) {
          metaData = await fetch(metaDataOrURL).then((res) => res.json());
        } else {
          metaData = JSON.parse(metaDataOrURL);
        }
        const decimal_places_in_rates = metaData.royalties.decimals;
        const max_percentage = Number(
          `1${"0".repeat(decimal_places_in_rates)}`,
        );
        const rate = Object.values(metaData.royalties.shares)[0];
        royalty = BigInt((rate / max_percentage) * 10000);
      } catch (e) {
        console.log("Error getting royalty Tezos");
      }
      return {
        metadata: tokenMd,
        name,
        symbol,
        royalty,
      };
    },
    async signClaimData(data) {
      // Mitigation if destination user address is invalid
      data.destinationUserAddress = data.royaltyReceiver;
      console.log(
        "Invalid Tezos destination address",
        data.destinationUserAddress,
      );

      const isTezosAddr = validateAddress(data.sourceNftContractAddress) === 3;

      const sourceNftContractAddress = isTezosAddr
        ? {
            addr: data.sourceNftContractAddress,
          }
        : {
            str: data.sourceNftContractAddress,
          };

      const encoded = TezosNftTransferDetailsSchema.Encode({
        token_id: data.tokenId,
        source_chain: data.sourceChain,
        dest_chain: data.destinationChain,
        dest_address: data.destinationUserAddress,
        source_nft_contract_address: sourceNftContractAddress,
        name: data.name,
        symbol: data.symbol,
        royalty: data.royalty,
        royalty_receiver: data.royaltyReceiver,
        metadata: data.metadata,
        transaction_hash: data.transactionHash,
        token_amount: data.tokenAmount,
        nft_type: data.nftType,
        fee: data.fee,
      });

      const packedData = packDataBytes(encoded, TezosNftTransferDetailsTypes);
      const packeyBytes = packedData.bytes;
      const hashedBytes = keccak256(Buffer.from(packeyBytes, "hex"));
      const signature = `0x${Buffer.from(
        (await signer.sign(hashedBytes)).sig,
      ).toString("hex")}`;
      return {
        signature: signature,
        signer: await signer.publicKey(),
      };
    },
    async generateWallet() {
      const mnemonic = bip39.generateMnemonic(256);
      const seed = await bip39.mnemonicToSeed(mnemonic, "");
      await sodium.ready;
      const keys = sodium.crypto_sign_seed_keypair(seed.slice(0, 32), "hex");
      const b58encodedSecret = base58check.encode(
        Buffer.from(`2bf64e07${keys.privateKey}`, "hex"),
      );
      const newWallet = await InMemorySigner.fromSecretKey(b58encodedSecret);
      return {
        address: await newWallet.publicKeyHash(),
        pk: await newWallet.secretKey(),
      };
    },
  };
}

const URLCanParse = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const extractStrOrAddr = (
  addr: { str: string } | { addr: string },
): string => {
  if ("str" in addr) return addr.str;
  return addr.addr;
};
