import { setTimeout } from "node:timers/promises";
import type { AxiosInstance } from "axios";
import { JsonRpcProvider, Wallet } from "ethers";
import { ERC20Staking__factory, ERC20__factory } from "../contractsTypes/evm";
import type { IGeneratedWallets, IStakingConfig } from "../types";
import type { LogInstance, THandler } from "./types";

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
  return setTimeout(ms);
}

export async function checkOrAddSelfAsVal(
  chains: THandler[],
  log: LogInstance,
) {
  for (const chain of chains) {
    const selfIsValidator = await chain.selfIsValidator();
    if (!selfIsValidator) {
      const added = await chain.addSelfAsValidator();
      if (added === "failure") {
        throw new Error(
          `Failed to add self as validator for chain ${chain.chainIdent}`,
        );
      }
    } else log.info(`Validator is already added to ${chain.chainIdent}`);
  }
}

export async function retry<T>(
  func: () => Promise<T>,
  ctx: string,
  log: LogInstance,
  retryCount?: number,
): Promise<T> {
  let count = retryCount;
  while (true) {
    try {
      log.info(`Context: ${ctx} - Retrying:`);
      const res = await func();
      log.trace("RESULT", res);
      return res; // Only returns once the function succeeds
    } catch (err) {
      log.info(`Context: ${ctx} - Retrying. Error:`, err);
      // Use a Promise-based delay
      if (count) {
        count = count - 1;
        console.log(`Retry count: ${count}`);
        if (count <= 0) {
          throw new Error(`Failed ${ctx}`);
        }
      }
      await setTimeout(5000);
    }
  }
}

export async function stakeTokens(
  conf: IStakingConfig,
  secrets: IGeneratedWallets,
  chains: THandler[],
  logger: LogInstance,
) {
  const others = chains.filter((e) => e.chainType !== "evm");
  const provider = new JsonRpcProvider(conf.rpcURL);
  const signer = new Wallet(secrets.evmWallet.privateKey, provider);
  const staker = ERC20Staking__factory.connect(conf.contractAddress, signer);
  const token = ERC20__factory.connect(conf.coinAddress, signer);
  const staked = await staker.stakingBalances(secrets.evmWallet.address);
  if (staked > 0n) {
    logger.info(
      `Already staked ${staked} ${conf.coinSymbol} in contract ${conf.contractAddress}`,
    );
    return;
  }
  const amtToStake = await staker.stakingAmount();
  logger.info("Awaiting completion of approve transaction.");

  const approve = await (
    await token.approve(conf.contractAddress, amtToStake * amtToStake)
  ).wait();

  logger.info("Approved to stake: ✅");
  if (!approve || approve.status !== 1) {
    throw new Error("Failed to approve staking");
  }

  const data = [
    {
      validatorAddress: secrets.evmWallet.address,
      chainType: "evm",
    },
    ...others.map((e) => {
      return {
        validatorAddress: e.publicKey,
        chainType: e.chainType,
      };
    }),
  ];

  logger.info("Awaiting completion of stake transaction.");
  const staking = await (await staker.stakeERC20(data)).wait();
  logger.info("Stake complete: ✅");

  if (!staking || staking.status !== 1) {
    throw new Error("Failed to stake");
  }
}

export async function fetchHttpOrIpfs(uri: string, http: AxiosInstance) {
  const url = new URL(uri);
  if (url.protocol === "http:" || url.protocol === "https:") {
    const response = await http.get(uri);
    return response.data;
  }
  if (url.protocol === "ipfs:") {
    try {
      return (
        await http.get(`https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`)
      ).data;
    } catch (ex) {
      return (
        await http.get(
          `https://xpnetwork.infura-ipfs.io/ipfs/${uri.replace("ipfs://", "")}`,
        )
      ).data;
    }
  }
  throw new Error("Unsupported protocol");
}

export async function useMutexAndRelease<Lock, Return>(
  lock: () => Promise<readonly [Lock, () => void]>,
  func: (t: Lock) => Promise<Return>,
) {
  const [resource, release] = await lock();
  try {
    const res = await func(resource);
    return res;
  } finally {
    release();
  }
}
