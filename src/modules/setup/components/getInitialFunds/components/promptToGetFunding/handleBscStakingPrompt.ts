import { ethers } from "ethers";
import { getCurrentEvmBalance } from "../../../../../../utils/functions";

const handleBscStakingPromt = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): Promise<boolean> => {
    try {
        let isNotFullyFunded = false;

        const stakingCoinCurrentBalance = await getCurrentEvmBalance({ stakingChainConfig, evmWallet });
        const remainingStakingCoinRaw = ((BigInt(stakingChainConfig.intialFund)) - BigInt(stakingCoinCurrentBalance));
        const remainingStakingCoinFund = ethers.formatEther(remainingStakingCoinRaw);
        if (stakingCoinCurrentBalance < BigInt(stakingChainConfig.intialFund)) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(stakingCoinCurrentBalance)}; Fund chain your wallet ${evmWallet.address} on ${stakingChainConfig.chain} with ${remainingStakingCoinFund} ${stakingChainConfig.coinSymbol} [ Coin address ${stakingChainConfig.coinAddress}].`);
        }

        return isNotFullyFunded
    } catch (e) {
        throw (`Error while handleBscStakingPromt, orignal error: ${e}`)
    }
}


export { handleBscStakingPromt }