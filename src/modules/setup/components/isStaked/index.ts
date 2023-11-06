import { IStakingChainConfigAndEvmWallet } from "@src/types";
import { getStakingContract } from "@src/utils";

const isStaked = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): Promise<boolean> => {
    const stakingContract = getStakingContract({ stakingChainConfig, evmWallet })
    const stakedAmount = await stakingContract.stakingBalances(evmWallet.address);
    const zero = 0;
    return stakedAmount > BigInt(zero)
}

export default isStaked