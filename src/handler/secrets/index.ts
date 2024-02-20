import * as secp256k1 from "@noble/secp256k1";
import chalk from "chalk";
import { sha256 } from "ethers";
import { SecretNetworkClient, Wallet, pubkeyToAddress } from "secretjs";
import { encodeSecp256k1Pubkey } from "secretjs/dist/wallet_amino";
import { BridgeStorage } from "../../contractsTypes/evm";
import { AddValidatorType } from "../../contractsTypes/secret/secretBridge";
import { THandler } from "../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../utils";

function SecretLog(msg: string) {
  console.log(chalk.red("SECRET:\t\t"), msg);
}

export function secretsHandler(
  client: SecretNetworkClient,
  wallet: Wallet,
  publicKey: string,
  bridge: string,
  bridgeCodeHash: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
): THandler {
  async function getStakingSignatureCount() {
    const res = (await client.query.compute.queryContract({
      contract_address: bridge,
      code_hash: bridgeCodeHash,
      query: {
        get_validators_count: {},
      },
    })) as { validator_count_response: { count: number } };
    return res.validator_count_response.count;
  }
  return {
    chainIdent: "SECRET",
    async signClaimData(buf) {
      const messageHash = sha256(Object.values(buf).join(""));

      const signature = await secp256k1.sign(messageHash, wallet.privateKey, {
        extraEntropy: true,
        der: false,
      });
      return {
        signer: wallet.address,
        signature: `0x${Buffer.from(signature).toString("hex")}`,
      };
    },
    async selfIsValidator() {
      const res = (await client.query.compute.queryContract({
        contract_address: bridge,
        code_hash: bridgeCodeHash,
        query: {
          get_validator: {
            address: Buffer.from(publicKey, "hex").toString("base64"),
          },
        },
      })) as { validator: { data: { added: boolean } } };
      return res.validator.data.added && res.validator.data.added;
    },
    async listenForLockEvents(builder, cb) {
      let lastBlock = Number(lastBlock_);
      while (true) {
        const latestBlockNumberResponse =
          await client.query.tendermint.getLatestBlock({});
        const latestBlockNumber = Number(
          latestBlockNumberResponse.block?.header?.height,
        );

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const query = `message.contract_address = '${bridge}' AND tx.height >= ${lastBlock} AND tx.height <= ${latestBlock}`;

        const logs = await client.query.txsQuery(query);
        const startBlock = lastBlock;
        lastBlock = latestBlockNumber;
        if (!logs.length) {
          SecretLog(
            `No Transactions found in chain from block: ${startBlock} to: ${latestBlockNumber}. "Waiting for 10 Seconds before looking for new transactions"`,
          );
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const log of logs) {
          const logToFind = log?.jsonLog
            ?.at(0)
            ?.events.find((item: { type: string }) => item.type === "wasm")
            ?.attributes.find(
              (item: { key: string }) => item.key === "LockedEventInfo",
            );
          if (!logToFind) continue;
          const parsedLog = JSON.parse(logToFind.value);
          const {
            token_id: tokenId, // Unique ID for the NFT transfer
            destination_chain: destinationChain, // Chain to where the NFT is being transferred
            destination_user_address: destinationUserAddress, // User's address in the destination chain
            source_nft_contract_address: sourceNftContractAddress, // Address of the NFT contract in the source chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
          } = parsedLog;
          return cb(
            builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount,
              nftType,
              sourceChain,
              log.transactionHash,
            ),
          );
        }
      }
    },
    async addSelfAsValidator() {
      const newV = Buffer.from(publicKey).toString("base64");
      let validatorsCount = await getStakingSignatureCount();
      let signatureCount = Number(
        await storage.getStakingSignaturesCount(newV),
      );

      while (signatureCount < confirmationCountNeeded(validatorsCount)) {
        await waitForMSWithMsg(
          ProcessDelayMilliseconds,
          `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
            validatorsCount,
          )}`,
        );
        signatureCount = Number(await storage.getStakingSignaturesCount(newV));
        validatorsCount = await getStakingSignatureCount();
      }
      const signatures = [...(await storage.getStakingSignatures(newV))].map(
        (item) => {
          return {
            signerAddress: item.signerAddress,
            signature: item.signature,
          };
        },
      );

      const validatorToAddPublicKeyUint8 = Buffer.from(wallet.address, "hex");
      const msg: AddValidatorType = {
        add_validator: {
          data: {
            validator: [
              encodeSecp256k1Pubkey(validatorToAddPublicKeyUint8).value,
              pubkeyToAddress(validatorToAddPublicKeyUint8),
            ],
            signatures: signatures.map((item) => {
              return {
                signature: Buffer.from(
                  item.signature.replace("0x", ""),
                  "hex",
                ).toString("base64"),
                signer_address: item.signerAddress,
              };
            }),
          },
        },
      };

      await client.tx.compute.executeContract(
        {
          contract_address: bridge,
          msg,
          code_hash: bridgeCodeHash,
          sender: pubkeyToAddress(Buffer.from(wallet.publicKey)),
        },
        {
          gasLimit: 200_000,
        },
      );

      return "success";
    },
    generateWallet() {
      const wallet = new Wallet();
      const pk = Buffer.from(wallet.privateKey).toString("hex");
      const address = wallet.address;
      return Promise.resolve({
        address,
        pk,
      });
    },
    async nftData(tokenId, contract) {
      const data = (
        (await client.query.compute.queryContract({
          contract_address: contract,
          query: { contract_info: {} },
        })) as { contract_info: { name: string; symbol: string } }
      ).contract_info;

      const royalty_info = (
        (await client.query.compute.queryContract({
          contract_address: contract,
          query: { royalty_info: { token_id: tokenId.toString() } },
        })) as {
          royalty_info: {
            royalty_info: {
              decimal_places_in_rates: number;
              royalties: [{ recipient: string; rate: number }];
            };
          };
        }
      ).royalty_info.royalty_info;
      const decimal_places_in_rates = royalty_info.decimal_places_in_rates;
      const max_percentage = Number(`1${"0".repeat(decimal_places_in_rates)}`);
      const rate = royalty_info.royalties[0].rate;
      const royalty = (rate / max_percentage) * 10000;

      const nft_info = (
        (await client.query.compute.queryContract({
          contract_address: contract,
          query: { nft_info: { token_id: tokenId.toString() } },
        })) as {
          nft_info: {
            extension: {
              media: [{ url: string }];
            };
          };
        }
      ).nft_info;
      const tokenURI = nft_info?.extension?.media[0]?.url || "";

      return {
        name: data.name,
        symbol: data.symbol,
        metadata: tokenURI,
        royalty: BigInt(royalty),
      };
    },
  };
}
