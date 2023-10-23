import { ethers } from "ethers";
import { stakingABI } from "../../../../abi";
import { IIsStaked } from "./types";

const isStaked = async ({ stakingConfig, privateKey }: IIsStaked): Promise<boolean> => {
    const provider = new ethers.JsonRpcProvider(stakingConfig.rpc);
    const wallet = new ethers.Wallet(privateKey || "", provider);
    const stakingContract = new ethers.Contract(stakingConfig.contractAddress, stakingABI, wallet);
    const stakedAmount = await stakingContract.stakingBalances(wallet.address);
    const zero = 0;
    return stakedAmount > BigInt(zero)
}

export default isStaked