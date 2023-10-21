import { ethers } from 'ethers';
import { erc20ABI, stakingABI } from '../../../../abi';
import { isStaked } from "../"
import { IStakeTokens } from './types';
import waitForMSWithMsg from '../../../../utils/functions/waitForMSWithMsg';
import { getStakingContract } from '../../../../utils';

const stakeTokens_ = async ({ stakingConfig, privateKey }: IStakeTokens): Promise<void> => {
    const provider = new ethers.JsonRpcProvider(stakingConfig.rpc);
    const wallet = new ethers.Wallet(privateKey || "", provider);
    const stakingContract = getStakingContract({ evmChainConfig: stakingConfig, evmWallet: { address: wallet.address, privateKey } })
    const xpTokenContract = new ethers.Contract(stakingConfig.coinAddress, erc20ABI, wallet);

    const stakedAmount = await stakingContract.stakingBalances(wallet.address);

    if (await isStaked({ stakingConfig, privateKey })) {
        console.log("Stake Found", stakedAmount.toString())
    } else {
        const amountToStake = stakingConfig.intialFund;
        try {
            const approveTx = await xpTokenContract.approve(stakingConfig.contractAddress, amountToStake)
            await approveTx.wait()
            console.log(`Token Approve Transaction Hash: ${approveTx.hash}`);
            console.log(await stakingContract.ERC20Token(), stakingConfig.coinAddress)
            const tx = await stakingContract.stakeERC20();
            console.log(`Tokens staked Transaction Hash: ${tx.hash}`);
            await tx.wait();
            console.log('Tokens staked successfully!');
        } catch (error) {
            console.log(error)
            throw ("Error staking tokens")
        }
    }
}

const stakeTokens = async ({ stakingConfig, privateKey }: IStakeTokens) => {
    let stakedTokens = false
    while (!stakedTokens) {
        try {
            await stakeTokens_({ stakingConfig, privateKey })
            stakedTokens = true;
        } catch (e) {
            await waitForMSWithMsg(5000, "Error staking XpNets")
        }
    }
}


export default stakeTokens