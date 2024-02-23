import { JsonRpcProvider, VoidSigner, ethers } from "ethers";

import { createInterface } from "readline/promises";
import secrets from "../secrets.json";
import { ValidatorLog } from "./handler/addSelf";
import { getBalance } from "./handler/evm/utils";
import { THandler } from "./handler/types";
import { IEvmChainConfig, IStakingConfig } from "./types";

export async function requireEnoughBalance(
  chains: THandler[],
  storageConfig: IEvmChainConfig,
  stakingConfig: IStakingConfig,
) {
  const stdio = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // Check for Storage Funds
  let storageFunded = false;
  while (!storageFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(storageConfig.rpcURL),
    );
    if (balance < BigInt(storageConfig.intialFund)) {
      console.log(
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

  for (const chain of chains) {
    let funded = false;
    while (!funded) {
      const balance = await chain.getBalance();
      const remainingRaw = chain.initialFunds - BigInt(balance);
      if (balance < BigInt(chain.initialFunds)) {
        console.log(
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

  // Check for Staking Funds
  let stakingCoinFunded = false;
  while (!stakingCoinFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(stakingConfig.rpcURL),
    );
    if (balance < BigInt(stakingConfig.intialFund)) {
      console.log(
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
