import { ethers } from "ethers";
import { getCurrentEvmBalance } from "@src/utils";
import { IEvmChainConfigAndEvmWallet } from "@src/types";

const isEvmChainNotFunded = async ({ evmChainConfig, evmWallet }: IEvmChainConfigAndEvmWallet): Promise<boolean> => {
    let isNotFullyFunded = false;
    try {
        const currentBalance = await getCurrentEvmBalance({ evmChainConfig, evmWallet });
        const remainingRaw = (BigInt(evmChainConfig.intialFund) || BigInt("0")) - BigInt(currentBalance);

        const remainingFund = ethers.formatEther(remainingRaw)
        if (currentBalance < (BigInt(evmChainConfig.intialFund) || BigInt("0"))) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(currentBalance)}; Fund chain your wallet ${evmWallet.address} on ${evmChainConfig.chain} with ${remainingFund} ${evmChainConfig.nativeCoinSymbol}.`);
        }

        return isNotFullyFunded
    } catch (e) {
        throw (`Error while isEvmChainNotFunded, orignal error: ${e}`)
    }
}


export { isEvmChainNotFunded }