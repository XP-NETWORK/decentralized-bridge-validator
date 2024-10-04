import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateWallet as evmGw } from "./handler/evm/utils";
import { generateWallet as icpGw } from "./handler/icp/utils";
import { generateWallet as mxGw } from "./handler/multiversx/utils";
import { generateWallet as nearGw } from "./handler/near/utils";
import { generateWallet as secretGw } from "./handler/secrets/utils";
import { generateWallet as tzGw } from "./handler/tezos/utils";
import { generateWallet as tonGw } from "./handler/ton/utils";

import { JsonRpcProvider, VoidSigner, ethers } from "ethers";

import { type Interface, createInterface } from "node:readline/promises";

import { ERC20Token__factory } from "./contractsTypes/evm";
import { ERC20Staking__factory } from "./contractsTypes/evm";
import { getBalance } from "./handler/evm/utils";
import { raise } from "./handler/ton";
import type { LogInstance, THandler } from "./handler/types";
import type {
  IEvmChainConfig,
  IGeneratedWallets,
  IStakingConfig,
} from "./types";

export async function syncWallets(
  logger: LogInstance,
): Promise<IGeneratedWallets> {
  const rootDirPath = path.resolve(__dirname, ".."); // Adjust based on actual structure
  const secretsPath = path.join(rootDirPath, "secrets.json");
  if (!fs.existsSync(secretsPath)) {
    logger.warn("Secrets Not Found. Generating new Wallets");
    const wallets: IGeneratedWallets = {
      evmWallet: await evmGw()(),
      secretWallet: await secretGw(),
      tezosWallet: await tzGw(),
      multiversXWallet: await mxGw(),
      tonWallet: await tonGw(),
      icpWallet: await icpGw(),
      nearWallet: await nearGw(),
    };
    await writeFile(secretsPath, JSON.stringify(wallets));
    return wallets;
  }
  const sc = await readFile(secretsPath, { encoding: "utf-8" });
  const secrets = JSON.parse(sc);
  if (!("evmWallet" in secrets)) {
    logger.warn("Generating new wallet for Evm");
    secrets.evmWallet = await evmGw()();
  } else if (!("secretWallet" in secrets)) {
    logger.warn("Generating new wallet for Secret/Cosmwasm");
    secrets.secretWallet = await secretGw();
  } else if (!("tezosWallet" in secrets)) {
    logger.warn("Generating new wallet for Tezos");
    secrets.tezosWallet = await tzGw();
  } else if (!("multiversXWallet" in secrets)) {
    logger.warn("Generating new wallet for Multiversx");
    secrets.multiversXWallet = await mxGw();
  } else if (!("tonWallet" in secrets)) {
    logger.warn("Generating new wallet for Ton");
    secrets.tonWallet = await tonGw();
  } else if (!("icpWallet" in secrets)) {
    logger.warn("Generating new wallet for ICP");
    secrets.icpWallet = await icpGw();
  } else if (!("nearWallet" in secrets)) {
    logger.warn("No wallet for near found, please add it to secrets.json");
    // process.exit(1);
  }
  await writeFile(secretsPath, JSON.stringify(secrets));
  return secrets;
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
      async () => {
        return [new JsonRpcProvider(storageConfig.rpcURL), () => {}];
      },
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
