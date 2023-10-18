import { ethers } from "ethers";
import { getCurrentBalance } from "../../../../utils/functions";
import { IHandleEvmPromt } from "./types";

const handleBscStakingPromt = async ({ chainConfig, evmPublicAddress, isNotFullyFunded }: IHandleEvmPromt) => {
    try {
        if (!('coinAddress' in chainConfig)) {
            return isNotFullyFunded;
        }

        const stakingCoinCurrentBalance = await getCurrentBalance({ rpc: chainConfig.rpc, accAddress: evmPublicAddress, coinAddress: chainConfig.coinAddress });
        const remainingStakingCoinRaw = ((BigInt(chainConfig.intialFund)) - BigInt(stakingCoinCurrentBalance));
        const remainingStakingCoinFund = ethers.formatEther(remainingStakingCoinRaw);
        if (stakingCoinCurrentBalance < BigInt(chainConfig.intialFund)) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(stakingCoinCurrentBalance)}; Fund chain your wallet ${evmPublicAddress} on ${chainConfig.chain} with ${remainingStakingCoinFund} ${chainConfig.coinSymbol} [ Coin address ${chainConfig.coinAddress}].`);
        }

        return isNotFullyFunded
    } catch (e) {
        throw (`Error while handleBscStakingPromt, orignal error: ${e}`)
    }
}


export { handleBscStakingPromt }