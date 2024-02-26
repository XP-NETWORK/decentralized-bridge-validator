export const confirmationCountNeeded = (validatorCount: number) => {
  const twoByThree = 0.666666667;
  const paddedValidatorCount = 1;
  return Math.floor(twoByThree * validatorCount) + paddedValidatorCount;
};

export const ProcessDelayMilliseconds = 5000;

export function waitForMSWithMsg(ms: number, msg: string): Promise<void> {
  const secondsInMilliSeconds = 1000;
  const numberOfDecimals = 2;
  console.info(
    `${msg}, retrying in ${(ms / secondsInMilliSeconds).toFixed(
      numberOfDecimals,
    )} seconds`,
  );
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import chalk from "chalk";
import { THandler } from "./types";

export function ValidatorLog(...log: unknown[]) {
  console.log(chalk.bgGray("VALIDATOR:\t"), ...log);
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
