import { JsonRpcProvider, Wallet } from "ethers";
import { ERC20Staking__factory, ERC20__factory } from "../contractsTypes/evm";
import { IGeneratedWallets, IStakingConfig } from "../types";
import { LogInstance, THandler } from "./types";

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

export async function checkOrAddSelfAsVal(
  chains: THandler[],
  log: LogInstance,
) {
  for (const chain of chains) {
    const selfIsValidator = await chain.selfIsValidator();
    log.info(`Validator is already added to ${chain.chainIdent}`);
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

export async function retry<T>(
  func: () => Promise<T>,
  ctx: string,
  log: LogInstance,
  retries = 3,
): Promise<T> {
  return await func().catch(async (err) => {
    if (retries === 0) {
      throw err;
    }
    log.info(`Context: ${ctx} - Retrying ${retries} more times. Error: ${err}`);
    await new Promise((r) => setTimeout(r, 6000 * (3 - retries)));
    return retry(func, ctx, log, retries - 1);
  });
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
  const amtToStake = conf.intialFund;

  const approve = await (
    await token.approve(conf.contractAddress, amtToStake)
  ).wait();
  if (!approve || approve.status !== 1) {
    throw new Error("Failed to approve staking");
  }

  const staking = await (
    await staker.stakeERC20([
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
    ])
  ).wait();

  if (!staking || staking.status !== 1) {
    throw new Error("Failed to stake");
  }
}
