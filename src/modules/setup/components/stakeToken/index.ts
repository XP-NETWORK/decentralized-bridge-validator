import { isStaked } from "../"
import { waitForMSWithMsg, getStakingContract, getEvmFungibleContract } from '@src/utils';
import { processDelayMilliseconds } from '@src/utils/constants/processDelayMilliseconds';
import { IStakingChainConfigAndEvmWallet } from '@src/types';

const stakeTokens_ = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): Promise<void> => {

    const stakingContract = getStakingContract({ stakingChainConfig, evmWallet })
    const tokenContract = getEvmFungibleContract({ stakingChainConfig, evmWallet })

    if (await isStaked({ stakingChainConfig, evmWallet })) {
        console.info("Stake Found")
    } else {
        const amountToStake = stakingChainConfig.intialFund;
        try {

            console.log(await tokenContract.symbol())

            const approveTx = await tokenContract.approve(stakingChainConfig.contractAddress, amountToStake)
            await approveTx.wait()
            console.info(`Token Approve Transaction Hash: ${approveTx.hash}`);

            const stakeTx = await stakingContract.stakeERC20();
            await stakeTx.wait();
            console.info(`Tokens staked Transaction Hash: ${stakeTx.hash}`);

            console.info('Tokens staked successfully!');
        } catch (e) {
            console.log(e)
            if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "You can only stake once"`)) {
                throw ("Error staking tokens")
            }
        }
    }
}

const stakeTokens = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet) => {
    let stakedTokens = false;
    while (!stakedTokens) {
        try {
            await stakeTokens_({ stakingChainConfig, evmWallet });
            stakedTokens = true;
        } catch (e) {
            await waitForMSWithMsg(processDelayMilliseconds, "Error staking tokens")
        }
    }
}


export default stakeTokens