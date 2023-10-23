import { ethers } from "ethers";
import { stakingABI } from "../../../../abi";

const isStaked = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): Promise<boolean> => {
    const privateKey = evmWallet.privateKey
    const provider = new ethers.JsonRpcProvider(stakingChainConfig.rpcURL);
    const wallet = new ethers.Wallet(privateKey || "", provider);
    const stakingContract = new ethers.Contract(stakingChainConfig.contractAddress, stakingABI, wallet);
    const stakedAmount = await stakingContract.stakingBalances(wallet.address);
    const zero = 0;
    return stakedAmount > BigInt(zero)
}

export default isStaked