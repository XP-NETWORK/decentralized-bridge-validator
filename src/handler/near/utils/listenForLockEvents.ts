import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { Near } from "near-api-js";
import type { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import type { LockEventIter, LogInstance } from "../../types";
import type { Transaction } from "../types/near-blocks";

const CHAIN_IDENT = "NEAR";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  near: Near,
  nearBlocksApi: AxiosInstance,
  lastBlock_: number,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true)
    try {
      const response = await nearBlocksApi.get<{
        cursor?: number;
        txns: unknown[];
      }>(`/account/${bridge}/txns`);
      if (!response.data.cursor) {
        logger.trace(`0 Txns Since: ${lastBlock}. Awaiting 10s`);
        await setTimeout(10000);
        continue;
      }

      if (response.data.cursor < lastBlock) {
        logger.trace(`0 Txns Since: ${lastBlock}. Awaiting 10s`);
        await setTimeout(10000);
        continue;
      }

      const { data } = await nearBlocksApi.get<{
        txns: Transaction[];
      }>(`/account/${bridge}/txns?cursor=${lastBlock}`);
      const newCursor = data.txns[0].id;

      for (const tx of data.txns) {
        const txn = await near.connection.provider.txStatusReceipts(
          tx.transaction_hash,
          bridge,
          "NONE",
        );
        //@ts-ignore
        if (!("SuccessValue" in txn.status)) {
          continue;
        }
        const log = txn.receipts_outcome
          .flatMap((e) => e.outcome.logs)
          .filter((e) => e.includes("locked"))[0];
        if (!log) continue;
        const parsed = JSON.parse(log).data;

        await cb(
          await builder.nftLocked(
            parsed.token_id,
            parsed.destination_chain,
            parsed.destination_user_address,
            parsed.source_nft_contract_address,
            parsed.token_amount,
            "singular",
            parsed.source_chain,
            tx.transaction_hash,
            "NEAR",
            parsed.metadata_uri,
            undefined,
          ),
        );
      }
      lastBlock = Number(newCursor);
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: Number(newCursor),
      });
      await em.flush();
    } catch (e) {
      logger.error("Error while listening for events", e);
      await setTimeout(10000);
    }
}
