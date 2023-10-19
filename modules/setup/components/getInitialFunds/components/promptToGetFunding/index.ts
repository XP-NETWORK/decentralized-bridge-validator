import { handleEvmPromt } from "./handleEvmPrompt";
import { handleBscStakingPromt } from "./handleBscStakingPrompt";
import { IPromptToGetFunding } from "./types";


const promptToGetFunding = async ({ wallets, config }: IPromptToGetFunding): Promise<boolean> => {

    let isNotFullyFunded = false;
    const evmPublicAddress = wallets.evmWallet.address;

    // Optimism fund promt
    if (await handleEvmPromt({ evmChainConfig: config.optimismChain, evmPublicAddress })) {
        isNotFullyFunded = true
    }

    // Bridge chains fund promt
    for (const evmChainConfig of config.bridgeChains) {
        if (evmChainConfig.chainType == 'evm') {
            if (await handleEvmPromt({ evmChainConfig, evmPublicAddress })) {
                isNotFullyFunded = true
            }
        }
    }

    // Staking coin fund promt
    if (await handleBscStakingPromt({ evmChainConfig: config.stakingConfig, evmPublicAddress })) {
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