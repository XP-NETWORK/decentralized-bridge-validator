import type { LogInstance, THandler } from "../types";

export async function checkOrAddSelfAsVal(
  chains: THandler[],
  log: LogInstance,
) {
  for (const chain of chains) {
    const selfIsValidator = await chain.selfIsValidator();
    if (!selfIsValidator) {
      let success = false;
      while (!success) {
        success = await chain.addSelfAsValidator();
        log.error(
          `Failed to add self as validator for chain ${chain.chainIdent}`,
        );
      }
    } else log.info(`Validator is already added to ${chain.chainIdent}`);
  }
}
