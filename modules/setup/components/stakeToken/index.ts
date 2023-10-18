import { ethers } from 'ethers';
import { erc20ABI, stakingABI } from '../../../../abi';
import { IStakingConfig } from '../../../../config/types';
import { isStaked } from "../"

const stakeTokens = async ({ stakingConfig, privateKey }: { stakingConfig: IStakingConfig, privateKey: string | undefined }) => {
    const provider = new ethers.JsonRpcProvider(stakingConfig.rpc);
    const wallet = new ethers.Wallet(privateKey || "", provider);
    const stakingContract = new ethers.Contract(stakingConfig.contractAddress, stakingABI, wallet);
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
            console.log(await stakingContract.xpToken(), stakingConfig.coinAddress)
            const tx = await stakingContract.stakeXP();
            console.log(`Tokens staked Transaction Hash: ${tx.hash}`);
            await tx.wait();
            console.log('Tokens staked successfully!');
        } catch (error) {
            console.log(error)
            throw ("Error staking tokens")
        }
    }
}


export default stakeTokens