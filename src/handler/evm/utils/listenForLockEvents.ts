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

        const logs = await provider.getLogs({
          fromBlock: lastBlock,
          toBlock: latestBlock,
          address: bridge,
          topics: [
            Bridge__factory.createInterface().getEvent("Locked").topicHash,
          ],
        });

        if (!logs.length) {
          logger.trace(
            `No Transactions found in chain from block: ${lastBlock} to: ${latestBlock}. Waiting for 10 Seconds before looking for new transactions`,
            chainIdent,
          );
          lastBlock = latestBlock + 1;
          await em.upsert(Block, {
            chain: chainIdent,
            contractAddress: await bc.getAddress(),
            lastBlock: lastBlock,
          });
          await em.flush();
          await new Promise<undefined>((e) => setTimeout(e, 10000));
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
        await new Promise((e) => setTimeout(e, 10000));
      }
    }
  };
};

export default listenForLockEvents;
