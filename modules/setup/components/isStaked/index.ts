import { ethers } from "ethers";
import { IStakingConfig } from "../../../../config/types";
import { stakingABI } from "../../../../abi";

const isStaked = async ({ stakingConfig, privateKey }: { stakingConfig: IStakingConfig, privateKey: string | undefined }) => {
    const provider = new ethers.JsonRpcProvider(stakingConfig.rpc);
    const wallet = new ethers.Wallet(privateKey || "", provider);
    const stakingContract = new ethers.Contract(stakingConfig.contractAddress, stakingABI, wallet);
    const stakedAmount = await stakingContract.stakingBalances(wallet.address);
    return stakedAmount > BigInt(0)
}

export default isStaked