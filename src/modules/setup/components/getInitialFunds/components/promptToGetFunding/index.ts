import { isEvmChainFunded } from "./isEvmChainFunded";
import { isStakingCoinFunded } from "./isStakingCoinFunded";
import { IConfigAndWallets } from "@src/types";


const promptToGetFunding = async ({ wallets, config }: IConfigAndWallets): Promise<boolean> => {

    let isFunded = true;

    // Storage chain fund promt
    if (!await isEvmChainFunded({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet })) {
        isFunded = false
    }

    // Bridge chains fund promt
    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType == 'evm') {
            if (!await isEvmChainFunded({ evmChainConfig: chainConfig, evmWallet: wallets.evmWallet })) {
                isFunded = false
            }
        }
    }

    // Staking coin fund promt
    if (!await isStakingCoinFunded({ stakingChainConfig: config.stakingConfig, evmWallet: wallets.evmWallet })) {
        isFunded = false
    }

    if (isFunded) {
        console.log("To stake and initialize your node.");
    } else {
        console.log("Initializing your node");
    }

    return isFunded
};

export default promptToGetFunding