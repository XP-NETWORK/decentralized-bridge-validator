import type { ERC20Staking } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";

export async function addNewChain(
  staking: ERC20Staking,
  chainType: string,
  validatorAddress: string,
  vid: string,
  logger: LogInstance,
) {
  const stakedAmt = await staking.stakingBalances(validatorAddress);
  if (stakedAmt > 0n) {
    const add = await staking.addNewChains([
      {
        chainType,
        validatorAddress: vid,
      },
    ]);
    const receipt = await add.wait();
    logger.info(
      `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
    );
  }
}
