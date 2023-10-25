import { isEvmChainNotFunded } from "./isEvmChainNotFunded";
import { isStakingCoinNotFunded } from "./isStakingCoinNotFunded";
import { IConfigAndWallets } from "@src/types";


const promptToGetFunding = async ({ wallets, config }: IConfigAndWallets): Promise<boolean> => {

    let isNotFullyFunded = false;

    // Storage chain fund promt
    if (await isEvmChainNotFunded({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet })) {
        isNotFullyFunded = true
    }

    // Bridge chains fund promt
    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType == 'evm') {
            if (await isEvmChainNotFunded({ evmChainConfig: chainConfig, evmWallet: wallets.evmWallet })) {
                isNotFullyFunded = true
            }
        }
    }

    // Staking coin fund promt
    if (await isStakingCoinNotFunded({ stakingChainConfig: config.stakingConfig, evmWallet: wallets.evmWallet })) {
        isNotFullyFunded = true
    }

    if (isNotFullyFunded) {
        console.log("To stake and initialize your node.");
    } else {
        console.log("Initializing your node");
    }

    return isNotFullyFunded
};

export default promptToGetFunding