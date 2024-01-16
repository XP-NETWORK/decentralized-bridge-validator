import {
    isEvmChainFunded,
    isMultiversXChainFunded,
    isSecretChainFunded,
    isStakingCoinFunded,
    isTonChainFunded,
    isHederaChainFunded,
} from './components';
import { IConfigAndWallets } from "@src/types";


const promptToGetFunding = async ({ wallets, config }: IConfigAndWallets): Promise<boolean> => {
    try {
        let isFunded = true;

        // Storage chain fund promt
        if (!await isEvmChainFunded({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet })) {
            isFunded = false
        }

        // Bridge chains fund promt
        for (const chainConfig of config.bridgeChains) {
            if (chainConfig.chainType === 'evm') {
                if (!await isEvmChainFunded({ evmChainConfig: chainConfig, evmWallet: wallets.evmWallet })) {
                    isFunded = false
                }
            } else if (chainConfig.chainType === 'hedera') {
                if (!await isHederaChainFunded({ hederaChainConfig: chainConfig, evmWallet: wallets.evmWallet })) {
                    isFunded = false
                }
            }
             else if (chainConfig.chainType === "multiversX") {
                if (!await isMultiversXChainFunded({ multiversXChainConfig: chainConfig, multiversXWallet: wallets.multiversXWallet })) {
                    isFunded = false
                }
            } else if (chainConfig.chainType === "ton") {
                if (!await isTonChainFunded({ tonChainConfig: chainConfig, tonWallet: wallets.tonWallet })) {
                    isFunded = false
                }
            } else if (chainConfig.chainType === "scrt") {
                if (!await isSecretChainFunded({ secretChainConfig: chainConfig, secretWallet: wallets.secretWallet })) {
                    isFunded = false
                }
            }
        }

        // Staking coin fund promt
        if (!await isStakingCoinFunded({ stakingChainConfig: config.stakingConfig, evmWallet: wallets.evmWallet })) {
            isFunded = false
        }

        if (isFunded) {
            console.info("To stake and initialize your node.");
        } else {
            console.info("Initializing your node");
        }

        return isFunded
    } catch (e) {
        console.log("Error in promptToGetFunding", e)
        throw new Error("Error in promptToGetFunding")
    }

};

export default promptToGetFunding