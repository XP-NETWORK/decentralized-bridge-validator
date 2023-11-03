import { ethers } from "ethers";
import { getCurrentMultiversXBalance } from "@src/utils";
import { IMultiversXChainConfigAndMultiversXWallet } from "@src/types";

const isMultiversXChainFunded = async ({ multiversXChainConfig, multiversXWallet }: IMultiversXChainConfigAndMultiversXWallet): Promise<boolean> => {
    let isFunded = true;
    try {
        const currentBalance = await getCurrentMultiversXBalance({ multiversXChainConfig, multiversXWallet });
        const remainingRaw = (BigInt(multiversXChainConfig.intialFund) || BigInt("0")) - BigInt(currentBalance);

        const remainingFund = ethers.formatEther(remainingRaw)
        if (currentBalance < BigInt(multiversXChainConfig.intialFund)) {
            isFunded = false
            console.info(`Current balance: ${ethers.formatEther(currentBalance)}; Fund chain your wallet ${multiversXWallet.userWallet.address} on ${multiversXChainConfig.chain} with ${remainingFund} ${multiversXChainConfig.nativeCoinSymbol}.`);
        }

        return isFunded
    } catch (e) {
        throw (`Error while isEvmChainFunded, orignal error: ${e}`)
    }
}


export default isMultiversXChainFunded