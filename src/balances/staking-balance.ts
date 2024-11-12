import type { Interface } from "node:readline/promises";
import { ethers } from "ethers";
import {
  ERC20Staking__factory,
  ERC20Token__factory,
} from "../contractsTypes/evm";
import type { LogInstance, THandler } from "../handler/types";
import type { IGeneratedWallets, IStakingConfig } from "../types";
import { requireEnoughBalanceInChains } from "./chains-balance";

export async function requireEnoughStakingBalanceAndChainBalance(
  stakingConfig: IStakingConfig,
  stdio: Interface,
  bscHandler: THandler,
  secrets: IGeneratedWallets,
  log: LogInstance,
): Promise<void> {
  let requireFunds =
    BigInt(bscHandler.initialFunds) + BigInt(stakingConfig.intialFund);
  let stakingChainFunded = false;
  const provider = new ethers.JsonRpcProvider(stakingConfig.rpcURL);
  const stakingContract = ERC20Staking__factory.connect(
    stakingConfig.contractAddress,
    provider,
  );
  const amtToStake = await stakingContract.stakingAmount();
  const isStaked = await stakingContract.stakingBalances(
    secrets.evmWallet.address,
  );
  let erc20Balance = await ERC20Token__factory.connect(
    stakingConfig.coinAddress,
    provider,
  ).balanceOf(secrets.evmWallet.address);

  if (await bscHandler.selfIsValidator()) {
    log.info(
      `Chain ${bscHandler.chainIdent} is already validator. Skipping Checking for funding.`,
    );
    requireFunds -= BigInt(bscHandler.initialFunds);
  } else {
    await requireEnoughBalanceInChains([bscHandler], stdio, log);
  }
  while (!(amtToStake <= erc20Balance) && !isStaked) {
    erc20Balance = await ERC20Token__factory.connect(
      stakingConfig.coinAddress,
      provider,
    ).balanceOf(secrets.evmWallet.address);

    log.error(
      `Current balance: ${ethers.formatEther(
        erc20Balance,
      )}; Fund staking chain, your wallet ${secrets.evmWallet.address} on ${
        stakingConfig.chain
      } with ${ethers.formatEther(amtToStake - erc20Balance)} ${
        stakingConfig.coinSymbol
      }.`,
    );
    await stdio.question("Press Enter to continue...");
  }
  while (!stakingChainFunded) {
    const balance = await bscHandler.getBalance();
    if (balance < requireFunds) {
      log.error(
        `Current balance: ${ethers.formatEther(
          balance,
        )}; Fund staking chain your wallet ${secrets.evmWallet.address} on ${
          stakingConfig.chain
        } with ${ethers.formatEther(requireFunds - balance)} ${
          stakingConfig.nativeCoinSymbol
        }.`,
      );
      // Sleep for 10 Seconds
      await stdio.question("Press Enter to continue...");
      continue;
    }
    stakingChainFunded = true;
  }
  log.info("Staking Has Enough Funds: ✅");
}
