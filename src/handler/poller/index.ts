import type { EntityManager } from "@mikro-orm/sqlite";

import type { AxiosInstance } from "axios";
import { LockedEvent } from "../../persistence/entities/locked";
import type { EventBuilder } from "../index";
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
  const lastId = (
    await em
      .createQueryBuilder(LockedEvent)
      .select("*")
      .where({
        listenerChain: identifier,
      })
      .orderBy({
        id: "desc",
      })
  ).at(0);
  while (true) {
    const fetch = await serverLinkHandler.get<Array<LockEventRes>>(
      `/${identifier}?cursor=${lastId?.id ?? 0}`,
    );
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
          ),
        );
      } catch (e) {
        logger.error(
          identifier,
          `${e} while polling for events. Sleeping for 10 seconds`,
        );
        await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
      }
    }
  }
}
