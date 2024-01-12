import { ethers } from 'ethers';
import { getCurrentEvmBalance } from '@src/utils';
import { IEvmChainConfigAndEvmWallet } from '@src/types';

const isEvmChainFunded = async ({
    evmChainConfig,
    evmWallet,
}: IEvmChainConfigAndEvmWallet): Promise<boolean> => {
    let isFunded = true;
    try {
        const currentBalance = await getCurrentEvmBalance({
            evmChainConfig,
            evmWallet,
        });
        const remainingRaw =
            BigInt(evmChainConfig.intialFund) - BigInt(currentBalance);

        const remainingFund = ethers.formatEther(remainingRaw);
        if (currentBalance < BigInt(evmChainConfig.intialFund)) {
            isFunded = false;
            console.info(
                `Current balance: ${ethers.formatEther(
                    currentBalance,
                )}; Fund chain your wallet ${evmWallet.address} on ${
                    evmChainConfig.chain
                } with ${remainingFund} ${evmChainConfig.nativeCoinSymbol}.`,
            );
        }

        return isFunded;
    } catch (e) {
        throw `Error while isEvmChainFunded, orignal error: ${e}`;
    }
};

export default isEvmChainFunded;
