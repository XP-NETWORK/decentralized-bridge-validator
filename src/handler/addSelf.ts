import chalk from "chalk";
import { THandler } from "./types";

export function ValidatorLog(...log: unknown[]) {
  console.log(chalk.green("VALIDATOR:"), ...log);
}

export async function checkOrAddSelfAsVal(chains: THandler[]) {
  for (const chain of chains) {
    const selfIsValidator = await chain.selfIsValidator();
    ValidatorLog(`Validator is already added to ${chain.chainIdent}`);
    if (!selfIsValidator) {
      const added = await chain.addSelfAsValidator();
      if (added === "failure") {
        throw new Error(
          `Failed to add self as validator for chain ${chain.chainIdent}`,
        );
      }
    }
  }
}
