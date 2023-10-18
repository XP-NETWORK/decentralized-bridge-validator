import { ethers } from "ethers";
import { getCurrentBalance } from "../../../../utils/functions";
import { IHandleEvmPromt } from "./types";

const handleEvmPromt = async ({ chainConfig, evmPublicAddress, isNotFullyFunded }: IHandleEvmPromt) => {
    try {
        const currentBalance = await getCurrentBalance({ rpc: chainConfig.rpc, accAddress: evmPublicAddress });
        const remainingRaw = (BigInt(chainConfig.intialFund) || BigInt("0")) - BigInt(currentBalance);

        const remainingFund = ethers.formatEther(remainingRaw)
        if (currentBalance < (BigInt(chainConfig.intialFund) || BigInt("0"))) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(currentBalance)}; Fund chain your wallet ${evmPublicAddress} on ${chainConfig.chain} with ${remainingFund} ${chainConfig.nativeCoinSymbol}.`);
        }

        return isNotFullyFunded
    } catch (e) {
        throw (`Error while handleEvmPromt, orignal error: ${e}`)
    }
}


export { handleEvmPromt }