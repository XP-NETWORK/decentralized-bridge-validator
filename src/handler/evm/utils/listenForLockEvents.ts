import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { JsonRpcProvider } from "ethers";
import type { EventBuilder } from "../..";
import type { TSupportedChains } from "../../../config";
import { type Bridge, Bridge__factory } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import { LockedEvent } from "../../../persistence/entities/locked";
import type { LockEventIter, LogInstance } from "../../types";

const listenForLockEvents = (
  provider: JsonRpcProvider,
  lastBlock_: number,
  blockChunks: number,
  bridge: string,
  bc: Bridge,
  chainIdent: TSupportedChains,
  em: EntityManager,
  logger: LogInstance,
) => {
  return async (builder: EventBuilder, cb: LockEventIter) => {
    let lastBlock = lastBlock_;
    while (true) {
      try {
        const latestBlockNumber = await provider.getBlockNumber();

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;
        if (lastBlock >= latestBlock) {
          await setTimeout(2000); // Sleep for 2 seconds
          continue;
        }

        const logs = await provider.getLogs({
          fromBlock: lastBlock,
          toBlock: latestBlock,
          address: bridge,
          topics: [
            Bridge__factory.createInterface().getEvent("Locked").topicHash,
          ],
        });
        logger.trace(
          `From block: ${lastBlock} to: ${latestBlock}. Tx Count ${logs.length}`,
          chainIdent,
        );
        if (!logs.length) {
          lastBlock = latestBlock + 1;
          await em.upsert(Block, {
            chain: chainIdent,
            contractAddress: await bc.getAddress(),
            lastBlock: lastBlock,
          });
          await em.flush();
          await setTimeout(10000);
          continue;
        }
        for (const log of logs.filter(
          (lg, index, self) =>
            index ===
            self.findIndex((t) => t.transactionHash === lg.transactionHash),
        )) {
          const decoded = bc.interface.parseLog(log);
          if (!decoded) continue;
          const found = await em.findOne(LockedEvent, {
            transactionHash: log.transactionHash,
            listenerChain: chainIdent,
          });
          if (found) {
            logger.info("Transaction already processed");
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
          contractAddress: await bc.getAddress(),
          lastBlock: lastBlock,
        });
        await em.flush();
      } catch (e) {
        logger.error(
          `${e} while listening for lock events. Sleeping for 10 seconds`,
          chainIdent,
        );
        await setTimeout(10000);
      }
    }
  };
};

export default listenForLockEvents;
