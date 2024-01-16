import { ethers } from 'ethers';
import { IHederaChainConfigAndEvmWallet } from '@src/types';
import { getCurrentHederaBalance } from '@src/utils';

const isHederaChainFunded = async ({
    hederaChainConfig,
    evmWallet,
}: IHederaChainConfigAndEvmWallet): Promise<boolean> => {
    let isFunded = true;
    try {
        const currentBalance = await getCurrentHederaBalance({
            hederaChainConfig,
            evmWallet,
        });
        const remainingRaw =
            BigInt(hederaChainConfig.intialFund) - BigInt(currentBalance);

        const remainingFund = ethers.formatEther(remainingRaw);
        if (currentBalance < BigInt(hederaChainConfig.intialFund)) {
            isFunded = false;
            console.info(
                `Current balance: ${ethers.formatEther(currentBalance)}; Fund chain your wallet ${evmWallet.address} on ${hederaChainConfig.chain} with ${remainingFund} ${hederaChainConfig.nativeCoinSymbol}.`,
            );
        }

        return isFunded;
    } catch (e) {
        throw `Error while isEvmChainFunded, orignal error: ${e}`;
    }
};

export default isHederaChainFunded;
