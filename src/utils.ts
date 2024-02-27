import fs from "fs/promises";
import { generateWallet as evmGw } from "./handler/evm/utils";
import { generateWallet as mxGw } from "./handler/multiversx/utils";
import { generateWallet as secretGw } from "./handler/secrets/utils";
import { generateWallet as tzGw } from "./handler/tezos/utils";
import { generateWallet as tonGw } from "./handler/ton/utils";

import { JsonRpcProvider, VoidSigner, ethers } from "ethers";

import { Interface, createInterface } from "readline/promises";
import secrets from "../secrets.json";
import { getBalance } from "./handler/evm/utils";
import { THandler } from "./handler/types";
import { ValidatorLog } from "./handler/utils";
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
) {
  const stdio = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  await requireEnoughStorageChainBalance(storageConfig, stdio);

  await requireEnoughBalanceInChains(chains, stdio);

  await requireEnoughStakingBalance(stakingConfig, stdio);
}

async function requireEnoughStorageChainBalance(
  storageConfig: IEvmChainConfig,
  stdio: Interface,
) {
  // Check for Storage Funds
  let storageFunded = false;
  while (!storageFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(storageConfig.rpcURL),
    );
    if (balance < BigInt(storageConfig.intialFund)) {
      ValidatorLog(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund chain your wallet ${secrets.evmWallet.address} on ${
          storageConfig.chain
        } with ${ethers.formatEther(
          balance - BigInt(storageConfig.intialFund),
        )} ${storageConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await stdio.question("Press Enter to continue...");
      continue;
    }
    storageFunded = true;
  }
  ValidatorLog("Storage Has Enough Funds: ✅");
}

async function requireEnoughBalanceInChains(
  chains: THandler[],
  stdio: Interface,
) {
  for (const chain of chains) {
    let funded = false;
    while (!funded) {
      const balance = await chain.getBalance();
      const remainingRaw = chain.initialFunds - BigInt(balance);
      if (balance < BigInt(chain.initialFunds)) {
        ValidatorLog(
          `Current balance: ${ethers.formatEther(
            balance,
          )}; Fund chain your wallet ${chain.address} on ${
            chain.chainIdent
          } with ${ethers.formatEther(remainingRaw)} ${chain.currency}.`,
        );
        // Sleep for 10 Seconds
        await stdio.question("Press Enter to continue...");
        continue;
      }
      funded = true;
    }
    ValidatorLog(`${chain.chainIdent} Has Enough Funds: ✅`);
  }
}

async function requireEnoughStakingBalance(
  stakingConfig: IStakingConfig,
  stdio: Interface,
): Promise<void> {
  // Check for Staking Funds
  let stakingCoinFunded = false;
  while (!stakingCoinFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(stakingConfig.rpcURL),
    );
    if (balance < BigInt(stakingConfig.intialFund) * 2n) {
      ValidatorLog(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund chain storage your wallet ${secrets.evmWallet.address} on ${
          stakingConfig.chain
        } with ${ethers.formatEther(
          balance - BigInt(stakingConfig.intialFund),
        )} ${stakingConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await stdio.question("Press Enter to continue...");
      continue;
    }
    stakingCoinFunded = true;
  }
  ValidatorLog("Staking Has Enough Funds: ✅");
}
