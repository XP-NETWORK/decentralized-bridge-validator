import { EntityManager } from "@mikro-orm/sqlite";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import axios, { Axios } from "axios";
import { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import { LockEventIter } from "../../types";
import { Root } from "../types/gateway";
import MxLog from "./log";

const CHAIN_IDENT = "MULTIVERSX";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock: number,
  bridge: string,
  gateway: Axios,
  provider: INetworkProvider,
  gatewayURL: string,
  em: EntityManager,
) {
  let lastBlock_ = lastBlock;
  while (true) {
    try {
      {
        const txs = (
          await gateway.get<Root>(
            `hyperblock/by-nonce/${lastBlock_.toString()}`,
          )
        ).data;

        const txsForBridge = txs.data.hyperblock.transactions.filter(
          (e) =>
            (e.receiver.toLowerCase() === bridge.toLowerCase() &&
              e.function === "lock721") ||
            e.function === "lock1155",
        );

        if (!txsForBridge.length) {
          MxLog(
            `No Transactions found in chain from block: ${lastBlock_}. Waiting for 10 Seconds before looking for new transactions`,
          );
          const lastestStatus = await provider.getNetworkStatus();
          const lastNonce = lastestStatus.HighestFinalNonce;
          lastBlock_ = lastBlock_ + 1;
          if (lastBlock >= lastNonce) {
            // Sleep for 2 minutes
            await new Promise<undefined>((e) => setTimeout(e, 2 * 60 * 1000));
            continue;
          }
          await em.upsert(Block, {
            chain: CHAIN_IDENT,
            contractAddress: bridge,
            lastBlock: Number(lastBlock_),
          });
          await em.flush();
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
          await cb(
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
        lastBlock_ = lastBlock_ + 1;
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: Number(lastBlock_),
        });
        await em.flush();
      }
    } catch (e) {
      MxLog(`${e} while listening for events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
}

const decodeBase64Array = (encodedArray: string[]): string[] => {
  return encodedArray.map((encodedString) => {
    return Buffer.from(encodedString, "base64").toString("utf-8");
  });
};
