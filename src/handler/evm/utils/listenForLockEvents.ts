import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../..";
import type { TSupportedChains } from "../../../config";
import { type Bridge, Bridge__factory } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import { LockedEvent } from "../../../persistence/entities/locked";
import type { LockEventIter, LogInstance } from "../../types";
import type { EVMProviderFetch, MutexReleaser } from "../types";

const listenForLockEvents = (
  fetchProvider: EVMProviderFetch,
  lastBlock_: number,
  blockChunks: number,
  bridge: string,
  bc: () => Promise<[Bridge, MutexReleaser]>,
  chainIdent: TSupportedChains,
  em: EntityManager,
  logger: LogInstance,
) => {
  return async (builder: EventBuilder, cb: LockEventIter) => {
    const [b, release] = await bc();
    const ifs = b.interface;
    release();
    let lastBlock = lastBlock_;
    while (true) {
      try {
        let [p, r] = await fetchProvider();
        const latestBlockNumber = await p.getBlockNumber();
        r();

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;
        if (lastBlock >= latestBlock) {
          await setTimeout(2000); // Sleep for 2 seconds
          continue;
        }
        const startBlock = lastBlock;
        [p, r] = await fetchProvider();
        const logs = await p.getLogs({
          fromBlock: lastBlock,
          toBlock: latestBlock,
          address: bridge,
          topics: [
            Bridge__factory.createInterface().getEvent("Locked").topicHash,
          ],
        });
        r();
        if (!logs.length) {
          logger.trace(
            `[${startBlock} -> ${latestBlock}]: ${logs.length} TXs.`,
          );
          lastBlock = latestBlock + 1;
          await em.upsert(Block, {
            chain: chainIdent,
            contractAddress: bridge,
            lastBlock: lastBlock,
          });
          await em.flush();
          await setTimeout(10000);
          continue;
        }
        logger.trace(`[${lastBlock} -> ${latestBlock}]: ${logs.length} TXs.`);
        for (const log of logs.filter(
          (lg, index, self) =>
            index ===
            self.findIndex((t) => t.transactionHash === lg.transactionHash),
        )) {
          logger.trace(`Processing TX at: ${log.transactionHash}`);
          const decoded = ifs.parseLog(log);
          if (!decoded) continue;
          const found = await em.findOne(LockedEvent, {
            transactionHash: log.transactionHash,
            listenerChain: chainIdent,
          });
          if (found) {
            logger.info("Transaction already processed", log.transactionHash);
            continue;
          }
          await cb(
            await builder.nftLocked(
              decoded.args.tokenId.toString(),
              decoded.args.destinationChain,
              decoded.args.destinationUserAddress,
              decoded.args.sourceNftContractAddress,
              decoded.args.tokenAmount.toString(),
              decoded.args.nftType,
              decoded.args.sourceChain,
              log.transactionHash,
              chainIdent,
              decoded.args.metaDataUri,
            ),
          );
        }
        lastBlock = latestBlock;
        await em.upsert(Block, {
          chain: chainIdent,
          contractAddress: bridge,
          lastBlock: lastBlock + 1,
        });
        await em.flush();
      } catch (e) {
        logger.error(
          "Error while listening for lock events. Sleeping for 10 seconds",
          e,
        );
        await setTimeout(10000);
      }
    }
  };
};

export default listenForLockEvents;
