import { ethers } from "ethers";
import { getCurrentEvmBalance } from "../../../../../../utils/functions";
import { IHandleEvmPromt } from "./types";

const handleBscStakingPromt = async ({ evmChainConfig, evmPublicAddress }: IHandleEvmPromt): Promise<boolean> => {
    try {
        let isNotFullyFunded = false;
        if (!('coinAddress' in evmChainConfig)) {
            return isNotFullyFunded;
        }

        const stakingCoinCurrentBalance = await getCurrentEvmBalance({ rpc: evmChainConfig.rpc, accAddress: evmPublicAddress, coinAddress: evmChainConfig.coinAddress });
        const remainingStakingCoinRaw = ((BigInt(evmChainConfig.intialFund)) - BigInt(stakingCoinCurrentBalance));
        const remainingStakingCoinFund = ethers.formatEther(remainingStakingCoinRaw);
        if (stakingCoinCurrentBalance < BigInt(evmChainConfig.intialFund)) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(stakingCoinCurrentBalance)}; Fund chain your wallet ${evmPublicAddress} on ${evmChainConfig.chain} with ${remainingStakingCoinFund} ${evmChainConfig.coinSymbol} [ Coin address ${evmChainConfig.coinAddress}].`);
        }

        return isNotFullyFunded
    } catch (e) {
        throw (`Error while handleBscStakingPromt, orignal error: ${e}`)
    }
}


export { handleBscStakingPromt }