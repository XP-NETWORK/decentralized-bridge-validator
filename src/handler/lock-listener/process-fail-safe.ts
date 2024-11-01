import { setTimeout } from "node:timers/promises";
import type { LockEvent } from "../types";
import type { LogInstance, THandler } from "../types";

export const processEventsFailSafe = async (
  chain: THandler,
  ev: LockEvent,
  log: LogInstance,
  processEvent: (chain: THandler, ev: LockEvent) => Promise<void>,
) => {
  let success = false;
  while (!success) {
    try {
      await processEvent(chain, ev);
      success = true;
    } catch (e) {
      log.error("Error processing poll events", ev, e);
      log.info("Awaiting 2s");
      await setTimeout(2 * 1000);
    }
  }
};
