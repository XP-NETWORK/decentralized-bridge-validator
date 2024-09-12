import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { Near } from "near-api-js";
import type { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import type { LockEventIter, LogInstance } from "../../types";

const CHAIN_IDENT = "NEAR";

export default async function listenForLockEvents(
  _builder: EventBuilder,
  _cb: LockEventIter,
  near: Near,
  lastBlock_: number,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  const lastBlock = lastBlock_;
  while (true)
    try {
      {
        const latestBlockNumberResponse = await near.connection.provider.block({
          finality: "final",
        });
        const latestBlockNumber = latestBlockNumberResponse.header.height;
        if (lastBlock >= latestBlockNumber) {
          logger.trace(`0 blocks since Last Block: ${lastBlock}. Awaiting 10s`);
          await setTimeout(10000);
          continue;
        }
        throw new Error("Not implemented");
      }
      // biome-ignore lint/correctness/noUnreachable: <explanation>
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: lastBlock,
      });
      await em.flush();
    } catch (e) {
      logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
      await setTimeout(10000);
    }
}
