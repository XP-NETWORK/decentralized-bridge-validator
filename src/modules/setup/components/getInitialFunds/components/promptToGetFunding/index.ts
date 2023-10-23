import { handleEvmPromt } from "./handleEvmPrompt";
import { handleBscStakingPromt } from "./handleBscStakingPrompt";


const promptToGetFunding = async ({ wallets, config }: IConfigAndWallets): Promise<boolean> => {

    let isNotFullyFunded = false;

    // Optimism fund promt
    if (await handleEvmPromt({ evmChainConfig: config.optimismChain, evmWallet: wallets.evmWallet })) {
        isNotFullyFunded = true
    }

    // Bridge chains fund promt
    for (const evmChainConfig of config.bridgeChains) {
        if (evmChainConfig.chainType == 'evm') {
            if (await handleEvmPromt({ evmChainConfig,  evmWallet: wallets.evmWallet  })) {
                isNotFullyFunded = true
            }
        }
    }

    // Staking coin fund promt
    if (await handleBscStakingPromt({ stakingChainConfig: config.stakingConfig, evmWallet: wallets.evmWallet })) {
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