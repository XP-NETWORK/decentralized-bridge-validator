import { ethers } from "ethers";
import { getCurrentEvmBalance } from "../../../../../../utils/functions";
import { IHandleEvmPromt } from "./types";

const handleEvmPromt = async ({ evmChainConfig, evmPublicAddress }: IHandleEvmPromt): Promise<boolean> => {
    let isNotFullyFunded = false;
    try {
        const currentBalance = await getCurrentEvmBalance({ rpc: evmChainConfig.rpc, accAddress: evmPublicAddress });
        const remainingRaw = (BigInt(evmChainConfig.intialFund) || BigInt("0")) - BigInt(currentBalance);

        const remainingFund = ethers.formatEther(remainingRaw)
        if (currentBalance < (BigInt(evmChainConfig.intialFund) || BigInt("0"))) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(currentBalance)}; Fund chain your wallet ${evmPublicAddress} on ${evmChainConfig.chain} with ${remainingFund} ${evmChainConfig.nativeCoinSymbol}.`);
        }
        
        return isNotFullyFunded
    } catch (e) {
        throw (`Error while handleEvmPromt, orignal error: ${e}`)
    }
}


export { handleEvmPromt }