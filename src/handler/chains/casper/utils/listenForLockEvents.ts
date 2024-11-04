import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import { EventName, EventStream } from "casper-js-sdk";
import type { EventBuilder } from "../../../event-builder";
import type { LockEventIter, LogInstance } from "../../../types";

// const CHAIN_IDENT = "CASPER";
const WAIT_TIME = 10000;

export default async function listenForLockEvents(
  _builder: EventBuilder,
  _cb: LockEventIter,
  _lastBlock_: number,
  ess: string,
  _em: EntityManager,
  logger: LogInstance,
) {
  // let lastBlock = lastBlock_;
  while (true) {
    try {
      const stream = new EventStream(ess);
      stream.start();
      stream.subscribe(EventName.TransactionProcessed, (ev) => {
        throw new Error(`PANIC: Not yet implemented. ${ev}`);
      });
    } catch (e) {
      logger.error(
        `Error in processing events. Awaiting ${WAIT_TIME / 1000}s.`,
        e,
      );
      await setTimeout(WAIT_TIME);
    }
  }
}
