import fs from "fs/promises";
import { generateWallet as evmGw } from "./handler/evm/utils";
import { generateWallet as mxGw } from "./handler/multiversx/utils";
import { generateWallet as secretGw } from "./handler/secrets/utils";
import { generateWallet as tzGw } from "./handler/tezos/utils";
import { generateWallet as tonGw } from "./handler/ton/utils";

import { JsonRpcProvider, VoidSigner, ethers } from "ethers";

import { Interface, createInterface } from "readline/promises";

import { getBalance } from "./handler/evm/utils";
import { raise } from "./handler/ton";
import { LogInstance, THandler } from "./handler/types";
import { IEvmChainConfig, IGeneratedWallets, IStakingConfig } from "./types";

export async function generateAndSaveWallets() {
  const wallets = {
    evmWallet: await evmGw()(),
    secretWallet: await secretGw(),
    tezosWallet: await tzGw(),
    multiversXWallet: await mxGw(),
    tonWallet: await tonGw(),
  };
  return fs.writeFile("secrets.json", JSON.stringify(wallets));
}

export async function generateWallets(): Promise<IGeneratedWallets> {
  const wallets = {
    evmWallet: await evmGw()(),
    secretWallet: await secretGw(),
    tezosWallet: await tzGw(),
    multiversXWallet: await mxGw(),
    tonWallet: await tonGw(),
  };
  return wallets;
}

export async function requireEnoughBalance(
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

  const otherChains = chains.filter((chain) => chain.chainIdent !== "BSC");

  await requireEnoughStorageChainBalance(storageConfig, stdio, secrets, log);

  await requireEnoughBalanceInChains(otherChains, stdio, log);

  await requireEnoughStakingBalanceAndChainBalance(
    stakingConfig,
    stdio,
    bscHandler,
    secrets,
    log,
  );
}

async function requireEnoughStorageChainBalance(
  storageConfig: IEvmChainConfig,
  stdio: Interface,
  secrets: IGeneratedWallets,
  log: LogInstance,
) {
  // Check for Storage Funds
  let storageFunded = false;
  while (!storageFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(storageConfig.rpcURL),
    );
    if (balance < BigInt(storageConfig.intialFund)) {
      log.error(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund chain your wallet ${secrets.evmWallet.address} on ${
          storageConfig.chain
        } with ${ethers.formatEther(
          BigInt(storageConfig.intialFund) - balance,
        )} ${storageConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await stdio.question("Press Enter to continue...");
      continue;
    }
    storageFunded = true;
  }
  log.info("Storage Has Enough Funds: ✅");
}

async function requireEnoughBalanceInChains(
  chains: THandler[],
  stdio: Interface,
  log: LogInstance,
) {
  for (const chain of chains) {
    let funded = false;
    while (!funded) {
      if (await chain.selfIsValidator()) {
        log.warn(
          `Chain ${chain.chainIdent} is a validator. Skipping Checking for funding.`,
        );
        funded = true;
        continue;
      }
      const balance = await chain.getBalance();
      const remainingRaw = chain.initialFunds - BigInt(balance);
      if (balance < BigInt(chain.initialFunds)) {
        log.error(
          `Current balance: ${ethers.formatEther(
            balance,
          )}; Fund chain your wallet ${chain.address} on ${
            chain.chainIdent
          } with ${remainingRaw / chain.decimals} ${chain.currency}.`,
        );
        // Sleep for 10 Seconds
        await stdio.question("Press Enter to continue...");
        continue;
      }
      funded = true;
      log.info(`${chain.chainIdent} Has Enough Funds: ✅`);
    }
  }
}

async function requireEnoughStakingBalanceAndChainBalance(
  stakingConfig: IStakingConfig,
  stdio: Interface,
  bscHandler: THandler,
  secrets: IGeneratedWallets,
  log: LogInstance,
): Promise<void> {
  let requireFunds =
    BigInt(bscHandler.initialFunds) + BigInt(stakingConfig.intialFund);
  let stakingChainFunded = false;

  if (await bscHandler.selfIsValidator()) {
    log.info(
      `Chain ${bscHandler.chainIdent} is already validator. Skipping Checking for funding.`,
    );
    requireFunds -= BigInt(bscHandler.initialFunds);
  } else {
    await requireEnoughBalanceInChains([bscHandler], stdio, log);
  }

  while (!stakingChainFunded) {
    const balance = await bscHandler.getBalance();
    if (balance < requireFunds) {
      log.error(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund staking chain your wallet ${secrets.evmWallet.address} on ${
          stakingConfig.chain
        } with ${ethers.formatEther(
          BigInt(stakingConfig.intialFund) - balance,
        )} ${stakingConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await stdio.question("Press Enter to continue...");
      continue;
    }
    stakingChainFunded = true;
  }
  log.info("Staking Has Enough Funds: ✅");
}
