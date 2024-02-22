import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import axios, { Axios } from "axios";
import { EventBuilder } from "../..";
import { EventIter } from "../../types";
import { Root } from "../types/gateway";
import MxLog from "./log";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: EventIter,
  lastBlock: bigint,
  bridge: string,
  gateway: Axios,
  provider: INetworkProvider,
  gatewayURL: string,
) {
  let lastBlock_ = lastBlock;
  while (true) {
    const txs = (
      await gateway.get<Root>(`hyperblock/by-nonce/${lastBlock_.toString()}`)
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
}

const decodeBase64Array = (encodedArray: string[]): string[] => {
  return encodedArray.map((encodedString) => {
    return Buffer.from(encodedString, "base64").toString("utf-8");
  });
};
