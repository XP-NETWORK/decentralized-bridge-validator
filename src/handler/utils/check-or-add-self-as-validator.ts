import type { LogInstance, THandler } from "../types";

export async function checkOrAddSelfAsVal(
  chains: THandler[],
  log: LogInstance,
) {
  for (const chain of chains) {
    const selfIsValidator = await chain.selfIsValidator();
    if (!selfIsValidator) {
      const added = await chain.addSelfAsValidator();
      if (added === "failure") {
        throw new Error(
          `Failed to add self as validator for chain ${chain.chainIdent}`,
        );
      }
    } else log.info(`Validator is already added to ${chain.chainIdent}`);
  }
}
