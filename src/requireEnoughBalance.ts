import { JsonRpcProvider, VoidSigner, ethers } from "ethers";

import secrets from "../secrets.json";
import { getBalance } from "./handler/evm/utils";
import { THandler } from "./handler/types";
import { IEvmChainConfig, IStakingConfig } from "./types";

export async function requireEnoughBalance(
  chains: THandler[],
  storageConfig: IEvmChainConfig,
  stakingConfig: IStakingConfig,
) {
  // Check for Storage Funds
  let storageFunded = false;
  while (!storageFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(storageConfig.rpcURL),
    );
    if (balance < BigInt(storageConfig.intialFund)) {
      console.info(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund chain your wallet ${secrets.evmWallet.address} on ${
          storageConfig.chain
        } with ${ethers.formatEther(
          balance - BigInt(storageConfig.intialFund),
        )} ${storageConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));
      continue;
    }
    storageFunded = false;
  }

  for (const chain of chains) {
    let funded = false;
    while (!funded) {
      const balance = await chain.getBalance();
      const remainingRaw = chain.initialFunds - BigInt(balance);
      if (balance < BigInt(chain.initialFunds)) {
        console.info(
          `Current balance: ${ethers.formatEther(
            balance,
          )}; Fund chain your wallet ${chain.address} on ${
            chain.chainIdent
          } with ${ethers.formatEther(remainingRaw)} ${chain.currency}.`,
        );
        // Sleep for 10 Seconds
        await new Promise((resolve) => setTimeout(resolve, 10000));
        continue;
      }
      funded = true;
    }
  }

  // Check for Staking Funds
  let stakingCoinFunded = false;
  while (!stakingCoinFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      new JsonRpcProvider(stakingConfig.rpcURL),
    );
    if (balance < BigInt(stakingConfig.intialFund)) {
      console.info(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund chain your wallet ${secrets.evmWallet.address} on ${
          stakingConfig.chain
        } with ${ethers.formatEther(
          balance - BigInt(stakingConfig.intialFund),
        )} ${stakingConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));
      continue;
    }
    stakingCoinFunded = true;
  }
}
