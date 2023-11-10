import { IStakingChainConfigAndEvmWallet } from '@src/types';
import { getStakingContract } from '@src/utils';

const isStaked = async ({
    stakingChainConfig,
    evmWallet,
}: IStakingChainConfigAndEvmWallet): Promise<boolean> => {
    const stakingContract = getStakingContract({
        stakingChainConfig,
        evmWallet,
    });

    const zero = BigInt(0);
    let stakedAmount = zero;
    try {
        stakedAmount = await stakingContract.stakingBalances(evmWallet.address);
    } catch (error) {
        console.info(
            '[isStaked] Failed to get staking balances with error',
            error,
        );
        throw 'Failed to get staking balances';
    }

    return stakedAmount > zero;
};

export default isStaked;
