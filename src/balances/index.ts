import { createInterface } from "node:readline/promises";
import { raise } from "../handler/chains";
import type { LogInstance, THandler } from "../handler/types";
import type {
  IEvmChainConfig,
  IGeneratedWallets,
  IStakingConfig,
} from "../types";
import { requireEnoughStakingBalanceAndChainBalance } from "./staking-balance";
import { requireEnoughStorageChainBalance } from "./storage-balance";

export async function requireEnoughBalanceForStakingAndStorage(
  chains: THandler[],
  storageConfig: IEvmChainConfig,
  stakingConfig: IStakingConfig,
  secrets: IGeneratedWallets,
  log: LogInstance,
) {
  const stdio = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const bscHandler =
    chains.find((chain) => chain.chainIdent === "BSC") ||
    raise("BSC Chain not found");

  await requireEnoughStorageChainBalance(storageConfig, stdio, secrets, log);

  await requireEnoughStakingBalanceAndChainBalance(
    stakingConfig,
    stdio,
    bscHandler,
    secrets,
    log,
  );
}
