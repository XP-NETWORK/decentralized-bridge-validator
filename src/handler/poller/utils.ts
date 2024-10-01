import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import { LockedEvent } from "../../persistence/entities/locked";
import type { EventBuilder } from "../event-builder";
import type { LockEventIter, LogInstance } from "../types";

export async function tryRerunningFailed(
  identifier: string,
  em: EntityManager,
  builder: EventBuilder,
  cb: LockEventIter,
  logger: LogInstance,
) {
  const failedData = await em
    .createQueryBuilder(LockedEvent)
    .select("*")
    .where({
      listenerChain: identifier,
      status: false,
    })
    .orderBy({
      id: "desc",
    });

  for (const tx of failedData) {
    try {
      logger.info(
        `Retrying failed event: ${tx.id} -> ${tx.transactionHash}@${tx.sourceChain}`,
      );
      await cb(
        await builder.nftLocked(
          tx.tokenId.toString(),
          tx.destinationChain,
          tx.destinationUserAddress,
          tx.sourceNftContractAddress,
          tx.tokenAmount.toString(),
          tx.nftType,
          tx.sourceChain,
          tx.transactionHash,
          tx.listenerChain,
          tx.metaDataUri,
          tx.id,
        ),
      );
    } catch (e) {
      logger.error(`Failed to retry event: ${tx.id} ->`, e);
    } finally {
      await setTimeout(10000);
    }
  }
}
