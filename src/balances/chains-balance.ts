import type { Interface } from "node:readline/promises";
import { formatEther } from "ethers";
import type { LogInstance, THandler } from "../handler/types";

export async function requireEnoughBalanceInChains(
  chains: THandler[],
  stdio: Interface,
  log: LogInstance,
) {
  const notValidatorChains = (
    await Promise.all(
      chains.map(async (chain) => {
        try {
          if (await chain.selfIsValidator()) {
            log.info(`${chain.chainIdent} Validator ✅.`);
            return [];
          }
          log.warn(`${chain.chainIdent} Validator ❌.`);
          return [chain];
        } catch (e) {
          return [chain];
        }
        // throw new Error("Unreachable");
      }),
    )
  ).flat();
  let funded = false;
  for (const chain of notValidatorChains) {
    while (!funded) {
      const balance = await chain.getBalance();
      const remainingRaw = chain.initialFunds - BigInt(balance);
      if (balance < chain.initialFunds) {
        log.error(
          `Balance: ${formatEther(balance)}. Fund wallet ${chain.address} on ${
            chain.chainIdent
          } with ${Number(remainingRaw) / Number(chain.decimals)} ${
            chain.currency
          }.`,
        );
        // Sleep for 10 Seconds
        await stdio.question("Press Enter to continue...");
        continue;
      }
      funded = true;
      log.info(`${chain.chainIdent} Has Enough Funds: ✅`);
    }
  }
  return notValidatorChains;
}
