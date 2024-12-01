import type { Wallet } from "ethers";
import { type ERC20Staking, ERC20__factory } from "../../contractsTypes/evm";
import type { IGeneratedWallets, IStakingConfig } from "../../types";
import type { LogInstance, THandler } from "../types";

export async function stakeTokens(
  conf: IStakingConfig,
  signer: Wallet,
  staker: ERC20Staking,
  secrets: IGeneratedWallets,
  chains: THandler[],
  logger: LogInstance,
) {
  const others = chains.filter((e) => e.chainType !== "evm");
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
