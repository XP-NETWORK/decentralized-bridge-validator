import { setTimeout } from "node:timers/promises";
import type { Aptos } from "@aptos-labs/ts-sdk";
import type { EntityManager } from "@mikro-orm/sqlite";
import { Block } from "../../../../persistence/entities/block";
import type { EventBuilder } from "../../../event-builder";
import type { LockEventIter, LogInstance } from "../../../types";
import { useMutexAndRelease } from "../../../utils";

const CHAIN_IDENT = "APTOS";
const WAIT_TIME = 10000;

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  fetchProvider: () => Promise<readonly [Aptos, () => void]>,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true) {
    try {
      const events = await useMutexAndRelease(
        fetchProvider,
        async (p) =>
          await p.getEvents({
            options: {
              orderBy: [
                {
                  transaction_version: "asc",
                },
              ],
              where: {
                transaction_version: {
                  _gte: lastBlock,
                },
                indexed_type: {
                  _eq: `${bridge}::aptos_nft_bridge::LockedEvent`,
                },
              },
            },
          }),
      );
      if (!events.length) {
        logger.info(
          `0 Events after ${lastBlock}+. Awaiting ${WAIT_TIME / 1000}s`,
        );
        await setTimeout(WAIT_TIME);
      }
      logger.info(`Found ${events.length} events`);
      for (const ev of events) {
        const data = ev.data;
        await cb(
          await builder.nftLocked(
            data.token_id,
            aptosHexStringToStr(data.destination_chain),
            data.destination_user_address,
            data.collection_address,
            data.token_amount,
            aptosHexStringToStr(data.nft_type),
            aptosHexStringToStr(data.source_chain),
            ev.transaction_version.toString(),
            CHAIN_IDENT,
            data.metadata_uri,
          ),
        );
        lastBlock = ev.transaction_version + 1;
      }
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: lastBlock,
      });
      await em.flush();
    } catch (e) {
      logger.error(
        `Error in processing events. Awaiting ${WAIT_TIME / 1000}s.`,
        e,
      );
      await setTimeout(WAIT_TIME);
    }
  }
}

function aptosHexStringToStr(str: string): string {
  return Buffer.from(str.slice(2), "hex").toString("utf-8");
}
