import { ethers } from "ethers";
import { getCurrentEvmBalance } from "@src/utils";
import { IStakingChainConfigAndEvmWallet } from "@src/types";

const isStakingCoinFunded = async ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): Promise<boolean> => {
    try {
        let isFunded = true;

        const stakingCoinCurrentBalance = await getCurrentEvmBalance({ stakingChainConfig, evmWallet });
        const remainingStakingCoinRaw = ((BigInt(stakingChainConfig.intialFund)) - BigInt(stakingCoinCurrentBalance));
        const remainingStakingCoinFund = ethers.formatEther(remainingStakingCoinRaw);
        if (stakingCoinCurrentBalance < BigInt(stakingChainConfig.intialFund)) {
            isFunded = false
            console.log(`Current balance: ${ethers.formatEther(stakingCoinCurrentBalance)}; Fund chain your wallet ${evmWallet.address} on ${stakingChainConfig.chain} with ${remainingStakingCoinFund} ${stakingChainConfig.coinSymbol} [ Coin address ${stakingChainConfig.coinAddress}].`);
        }

        return isFunded
    } catch (e) {
        throw (`Error while isStakingCoinFunded, orignal error: ${e}`)
    }
}


export { isStakingCoinFunded }