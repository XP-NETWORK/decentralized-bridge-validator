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
  const lastBlock = lastBlock_;
  while (true)
    try {
      const response = await nearBlocksApi.get<{
        cursor: number;
        txns: unknown[];
      }>(`/account/${bridge}/txns`);

      if (response.data.cursor <= lastBlock) {
        logger.trace(`0 Txns Since: ${lastBlock}. Awaiting 10s`);
        await setTimeout(10000);
        continue;
      }

      const { data } = await nearBlocksApi.get<{
        txns: Transaction[];
      }>(`/account/${bridge}/txn?method=lock_nft&cursor=${lastBlock}`);
      const newCursor = data.txns[0].id;

      for (const tx of data.txns) {
        const txn = await near.connection.provider.txStatusReceipts(
          tx.transaction_hash,
          bridge,
          "FINAL",
        );
        const log = txn.receipts_outcome
          .flatMap((e) => e.outcome.logs)
          .filter((e) => e.includes("locked"))[0];
        if (!log) continue;
        const parsed = JSON.parse(log).data;

        cb(
          await builder.nftLocked(
            parsed.token_id,
            parsed.destination_chain,
            parsed.destionation_address,
            parsed.source_nft_contract_address,
            parsed.token_amount,
            "singular",
            parsed.source_chain,
            tx.transaction_hash,
            "NEAR",
            "",
            undefined,
          ),
        );
      }

      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: Number(newCursor),
      });
      await em.flush();
    } catch (e) {
      logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
      await setTimeout(10000);
    }
}
