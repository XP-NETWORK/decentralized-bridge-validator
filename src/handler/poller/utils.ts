import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import { LockedEvent } from "../../persistence/entities/locked";
import type { LockEventIter, LogInstance } from "../types";

export async function tryRerunningFailed(
  identifier: string,
  em: EntityManager,
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

  for (const prevFailed of failedData) {
    try {
      logger.info(`Retrying failed event: ${prevFailed.id} ->`, prevFailed);
      await cb({
        tokenId: prevFailed.tokenId.toString(),
        destinationChain: prevFailed.destinationChain,
        destinationUserAddress: prevFailed.destinationUserAddress,
        sourceNftContractAddress: prevFailed.sourceNftContractAddress,
        tokenAmount: prevFailed.tokenAmount.toString(),
        nftType: prevFailed.nftType,
        sourceChain: prevFailed.sourceChain,
        transactionHash: prevFailed.transactionHash,
        listenerChain: prevFailed.listenerChain,
        metaDataUri: prevFailed.metaDataUri,
      });
    } catch (e) {
      logger.error(`Failed to retry event: ${prevFailed.id} ->`, e);
    } finally {
      await setTimeout(10000);
    }
  }
}
