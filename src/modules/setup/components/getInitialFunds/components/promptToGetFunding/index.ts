import { isEvmChainFunded, isStakingCoinFunded } from "./components";
import { IConfigAndWallets, IEvmChainConfig } from "@src/types";


const promptToGetFunding = async ({ wallets, config }: IConfigAndWallets): Promise<boolean> => {

    let isFunded = true;

    // Storage chain fund promt
    if (!await isEvmChainFunded({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet })) {
        isFunded = false
    }

    // Bridge chains fund promt
    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.signType == 'ecdsa') {
            if (!await isEvmChainFunded({ evmChainConfig: chainConfig as IEvmChainConfig, evmWallet: wallets.evmWallet })) {
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
};

export default promptToGetFunding