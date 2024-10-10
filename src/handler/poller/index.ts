import type { EntityManager } from "@mikro-orm/sqlite";

import { setTimeout } from "node:timers/promises";
import type { AxiosInstance, AxiosResponse } from "axios";
import { LockedEvent } from "../../persistence/entities/locked";
import type { EventBuilder } from "../event-builder";
import type { LockEventIter, LogInstance } from "../types";
import type { LockEventRes } from "./types";

export default async function pollForLockEvents(
  identifier: string,
  builder: EventBuilder,
  cb: LockEventIter,
  em: EntityManager,
  serverLinkHandler: AxiosInstance,
  logger: LogInstance,
) {
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
    let fetch: AxiosResponse<LockEventRes[], any>;
    try {
      const url = `/${identifier}?cursor=${lastId}&limit=10`;
      fetch = await serverLinkHandler.get<Array<LockEventRes>>(url);
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
      try {
        await cb(
          await builder.nftLocked(
            tx.token_id.toString(),
            tx.destination_chain,
            tx.destination_user_address,
            tx.source_nft_contract_address,
            tx.token_amount.toString(),
            tx.nft_type,
            tx.source_chain,
            tx.transaction_hash,
            tx.listener_chain,
            tx.meta_data_uri,
            tx.id,
          ),
        );
      } catch (e) {
        logger.error(
          identifier,
          `${e} while polling for events. Sleeping for 10 seconds`,
        );
        await setTimeout(10000);
      }
    }
    logger.info(`${fetch.data.length} Tx, lastId: ${lastId}, wait: 1s`);
    await setTimeout(1 * 1000);
  }
}
