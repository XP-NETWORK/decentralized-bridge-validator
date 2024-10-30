import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import { Block } from "../../../../persistence/entities/block";
import type { EventBuilder } from "../../../event-builder";
import { tryRerunningFailed } from "../../../poller/utils";
import type { LockEventIter, LogInstance } from "../../../types";

const CHAIN_IDENT = "NEAR";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  theGraphApi: AxiosInstance,
  nearBlocksApi: AxiosInstance,
  lastBlock_: number,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true)
    try {
      await tryRerunningFailed(CHAIN_IDENT, em, builder, cb, logger);
      const response = await theGraphApi.post<{
        data: {
          lockedEvents: {
            hash: string;
            token_id: string;
            destination_chain: string;
            destination_user_address: string;
            source_nft_contract_address: string;
            nft_amount: string;
            source_chain: string;
            metadata_uri: string | null | undefined;
          }[];
        };
      }>("/", {
        query: `{ lockedEvents(skip: ${lastBlock}) { id block hash source_nft_contract_address source_chain destination_chain destination_user_address nft_amount metadata_uri token_id } }`,
        operationName: "Subgraphs",
        variables: {},
      });

      if (response.data.data.lockedEvents.length === 0) {
        logger.info(`0 Txns Since: ${lastBlock}. Awaiting 10s`);
        await setTimeout(10000);
        continue;
      }
      logger.info(`Found ${response.data.data.lockedEvents.length} new TXs`);

      for (const tx of response.data.data.lockedEvents) {
        lastBlock += 1;
        const { data } = await nearBlocksApi.get<{
          receipts: {
            receipt_id: string;
            originated_from_transaction_hash: string;
          }[];
        }>(`/search/receipts?keyword=${tx.hash}`);
        const txHash = data.receipts[0].originated_from_transaction_hash;

        await cb(
          await builder.nftLocked(
            tx.token_id,
            tx.destination_chain,
            tx.destination_user_address,
            tx.source_nft_contract_address,
            tx.nft_amount,
            "singular",
            tx.source_chain,
            txHash,
            "NEAR",
            tx.metadata_uri || "",
            undefined,
          ),
        );
      }
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: lastBlock,
      });
      await em.flush();
    } catch (e) {
      logger.error("Error while listening for events", e);
      await setTimeout(10000);
    }
}
