import { ethers } from 'ethers';
import { erc20ABI } from '../../../../abi';
import { isStaked } from "../"
import waitForMSWithMsg from '../../../../utils/functions/waitForMSWithMsg';
import { getStakingContract } from '../../../../utils';
import { processDelayMilliseconds } from '../../../../utils/constants/processDelayMilliseconds';

const stakeTokens_ = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): Promise<void> => {

    const provider = new ethers.JsonRpcProvider(stakingChainConfig.rpcURL);
    const privateKey = evmWallet.privateKey;
    const wallet = new ethers.Wallet(privateKey, provider);
    const stakingContract = getStakingContract({ stakingChainConfig, evmWallet })
    const xpTokenContract = new ethers.Contract(stakingChainConfig.coinAddress, erc20ABI, wallet);

    const stakedAmount = await stakingContract.stakingBalances(wallet.address);

    if (await isStaked({ stakingChainConfig, evmWallet })) {
        console.log("Stake Found", stakedAmount.toString())
    } else {
        const amountToStake = stakingChainConfig.intialFund;
        try {

            const approveTx = await xpTokenContract.approve(stakingChainConfig.contractAddress, amountToStake)
            await approveTx.wait()
            console.log(`Token Approve Transaction Hash: ${approveTx.hash}`);

            const stakeTx = await stakingContract.stakeERC20();
            await stakeTx.wait();
            console.log(`Tokens staked Transaction Hash: ${stakeTx.hash}`);

            console.log('Tokens staked successfully!');
        } catch (error) {
            console.log(error)
            throw ("Error staking tokens")
        }
    }
}

const stakeTokens = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet) => {
    let stakedTokens = false;
    while (!stakedTokens) {
        try {
            await stakeTokens_({ stakingChainConfig, evmWallet })
            stakedTokens = true;
        } catch (e) {
            await waitForMSWithMsg(processDelayMilliseconds, "Error staking XpNets")
        }
    }
}


export default stakeTokens