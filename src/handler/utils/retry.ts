import { setTimeout } from "node:timers/promises";
import type { LogInstance } from "../types";

export async function retry<T>(
  func: () => Promise<T>,
  ctx: string,
  log: LogInstance,
  retryCount?: number,
): Promise<T> {
  let count = retryCount;
  while (true) {
    try {
      log.trace(`Context: ${ctx} - Retrying:`);
      const res = await func();
      log.trace("RESULT", res);
      return res; // Only returns once the function succeeds
    } catch (err) {
      log.error(`Context: ${ctx} - Retrying. Error:`, err);
      // Use a Promise-based delay
      if (count) {
        count = count - 1;
        if (count <= 0) {
          throw new Error(`Failed ${ctx}`);
        }
      }
      await setTimeout(5000);
    }
  }
}
