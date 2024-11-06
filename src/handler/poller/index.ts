import type { EntityManager } from "@mikro-orm/sqlite";

import { setTimeout } from "node:timers/promises";
import type { AxiosInstance, AxiosResponse } from "axios";
import { LockedEvent } from "../../persistence/entities/locked";
import type {
  LockEvent,
  LockEventIter,
  LogInstance,
  TNftTransferDetailsObject,
  TNftTransferDetailsObjectIter,
} from "../types";

export default async function pollForLockEvents(
  identifier: string,
  cbLe: LockEventIter,
  cb: TNftTransferDetailsObjectIter,
  em: EntityManager,
  serverLinkHandler: AxiosInstance,
  logger: LogInstance,
) {
  type NTOWithID = { id?: number } & TNftTransferDetailsObject;
  async function cbNto(nto: NTOWithID) {
    try {
      await cb(nto, nto.id);
    } catch (e) {
      logger.error("Error processing polled event. Awaiting 10s", e);
      await setTimeout(10000);
    }
  }
  async function _cbLe(le: LockEvent) {
    try {
      await cbLe(le);
    } catch (e) {
      logger.error("Error processing polled event. Awaiting 10s", e);
      await setTimeout(10000);
    }
  }

  while (true) {
    const lastEv = await em
      .createQueryBuilder(LockedEvent)
      .select("*")
      .where({
        listenerChain: identifier,
      })
      .orderBy({
        id: "desc",
      })
      .getSingleResult();

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
        await cb(tx.toNTO(), tx.id);
      } catch (e) {
        logger.error(
          identifier,
          `${e} while polling for events. Sleeping for 10 seconds`,
        );
        await setTimeout(10000);
      }
    }

    let lastId = lastEv?.id ?? 0;
    if (lastId) {
      lastId += 1;
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let fetch: AxiosResponse<NTOWithID[], any>;
    try {
      const url = `/${identifier}?cursor=${lastId}&limit=10`;
      fetch = await serverLinkHandler.get<Array<NTOWithID>>(url);
    } catch (e) {
      const error = e as Error;
      logger.error(`Error fetching data: ${error.message}`);
      logger.info("Awaiting 2s");
      await setTimeout(1 * 1000);
      continue;
    }

    const nTx = fetch.data.length;
    if (nTx === 0) {
      logger.info(`0 Tx, lastId: ${lastId}, wait: 1s`);
      await setTimeout(1 * 1000);
      continue;
    }
    for (const tx of fetch.data) {
      if (tx.name === "") {
        return await _cbLe({
          destinationChain: tx.destinationChain,
          destinationUserAddress: tx.destinationUserAddress,
          listenerChain: tx.lockTxChain,
          metaDataUri: tx.metadata,
          nftType: tx.nftType,
          sourceChain: tx.sourceChain,
          sourceNftContractAddress: tx.sourceNftContractAddress,
          tokenAmount: tx.tokenAmount,
          tokenId: tx.tokenId,
          transactionHash: tx.transactionHash,
          id: tx.id,
        });
      }
      return await cbNto(tx);
    }
    logger.info(`${fetch.data.length} Tx, lastId: ${lastId}, wait: 1s`);
    await setTimeout(1 * 1000);
  }
}
