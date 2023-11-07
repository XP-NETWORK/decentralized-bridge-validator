import { isStaked } from "../"
import { waitForMSWithMsg, getStakingContract, getEvmFungibleContract } from '@src/utils';
import { processDelayMilliseconds } from '@src/utils/constants/processDelayMilliseconds';
import { IStakingChainConfigAndWallets } from '@src/types';

const stakeTokens_ = async ({ stakingChainConfig, wallets }: IStakingChainConfigAndWallets): Promise<void> => {

    const stakingContract = getStakingContract({ stakingChainConfig, evmWallet: wallets.evmWallet })
    const tokenContract = getEvmFungibleContract({ stakingChainConfig, evmWallet: wallets.evmWallet })

    if (await isStaked({ stakingChainConfig, evmWallet: wallets.evmWallet })) {
        console.info("Stake Found")
    } else {
        const amountToStake = stakingChainConfig.intialFund;
        try {

            const approveTx = await tokenContract.approve(stakingChainConfig.contractAddress, amountToStake)
            await approveTx.wait()
            console.info(`Token Approve Transaction Hash: ${approveTx.hash}`);

            const stakeTx = await stakingContract.stakeERC20([
                {
                    validatorAddress: wallets.evmWallet.address,
                    chainType: "evm"
                },
                {
                    validatorAddress: wallets.multiversXWallet.userWallet.address,
                    chainType: "multiversX"
                }
            ]);
            await stakeTx.wait();
            console.info(`Tokens staked Transaction Hash: ${stakeTx.hash}`);

            console.info('Tokens staked successfully!');
        } catch (e) {
            if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "You can only stake once"`)) {
                throw ("Error staking tokens")
            }
        }
    }
}

const stakeTokens = async ({ stakingChainConfig, wallets }: IStakingChainConfigAndWallets) => {
    let stakedTokens = false;
    while (!stakedTokens) {
        try {
            await stakeTokens_({ stakingChainConfig, wallets });
            stakedTokens = true;
        } catch (e) {
            await waitForMSWithMsg(processDelayMilliseconds, "Error staking tokens")
        }
    }
}


export default stakeTokens