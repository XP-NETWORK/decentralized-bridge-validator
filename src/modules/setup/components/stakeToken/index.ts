import { isStaked } from '../';
import {
    waitForMSWithMsg,
    getStakingContract,
    getEvmFungibleContract,
} from '@src/utils';
import { ProcessDelayMilliseconds } from '@src/utils/constants/processDelayMilliseconds';
import { IStakingChainConfigAndWallets } from '@src/types';
import { RetryPriority } from '@src/utils/constants/retries';

const stakeTokens_ = async ({
    stakingChainConfig,
    wallets,
}: IStakingChainConfigAndWallets): Promise<void> => {
    const stakingContract = getStakingContract({
        stakingChainConfig,
        evmWallet: wallets.evmWallet,
    });
    const tokenContract = getEvmFungibleContract({
        stakingChainConfig,
        evmWallet: wallets.evmWallet,
    });

    let _isStaked = false;
    try {
        _isStaked = await isStaked({
            stakingChainConfig,
            evmWallet: wallets.evmWallet,
        });
    } catch (e) {
        console.info(
            '[stakeTokens_ isStaked] Failed to get isStaked with error',
            e,
        );
        throw '[stakeTokens_ isStaked] Failed to get isStaked';
    }

    if (_isStaked) {
        console.info('Stake Found');
        return;
    }

    const amountToStake = stakingChainConfig.intialFund;
    try {
        const approveTx = await tokenContract.approve(
            stakingChainConfig.contractAddress,
            amountToStake,
        );
        await approveTx.wait();
        console.info(`Token Approve Transaction Hash: ${approveTx.hash}`);
    } catch (e) {
        console.info(
            '[stakeTokens_ approve] Failed to approve amount to stake with error',
            e,
        );
        throw 'execution reverted: "Approve Failed"';
    }

    try {
        const stakeTx = await stakingContract.stakeERC20([
            {
                validatorAddress: wallets.evmWallet.address,
                chainType: 'evm',
            },
            {
                validatorAddress: wallets.multiversXWallet.userWallet.address,
                chainType: 'multiversX',
            },
        ]);
        await stakeTx.wait();
        console.info(`Tokens staked Transaction Hash: ${stakeTx.hash}`);
    } catch (e) {
        console.info(
            '[stakeTokens_ stakeERC20] Failed to stake ERC20 with error',
            e,
        );

        if (
            !(
                e &&
                e.shortMessage &&
                e.shortMessage ===
                    `execution reverted: "You can only stake once"`
            )
        ) {
            throw 'Error staking tokens';
        }
    }

    console.info('Tokens staked successfully!');
};

const stakeTokens = async ({
    stakingChainConfig,
    wallets,
}: IStakingChainConfigAndWallets) => {
    let stakedTokens = false;
    let retries = 0;
    while (!stakedTokens) {
        try {
            await stakeTokens_({ stakingChainConfig, wallets });
            stakedTokens = true;
        } catch (e) {
            await waitForMSWithMsg(
                ProcessDelayMilliseconds,
                'Error staking tokens',
            );

            console.info(
                '[stakeTokens stakeTokens_] Failed To stake tokens with error',
                e,
            );
            retries++;

            if (retries >= RetryPriority.HIGH) {
                break;
            }
        }
    }
};

export default stakeTokens;
