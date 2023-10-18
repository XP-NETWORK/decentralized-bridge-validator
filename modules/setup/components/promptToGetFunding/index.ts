import { IChainSpecs } from "../../../../config/types";
import { IGeneratedWallets } from "../../types";
import { handleEvmPromt } from "./handleEvmPrompt";
import { handleBscStakingPromt } from "./handleBscStakingPrompt";
import { IPromptToGetFunding } from "./types";


const promptToGetFunding = async ({wallets, config}: IPromptToGetFunding): Promise<boolean> => {

    let isNotFullyFunded = false;
    const evmPublicAddress = wallets.evmWallet.address;

    // Optimism fund promt
    isNotFullyFunded = await handleEvmPromt({ chainConfig: config.optimismChain, evmPublicAddress, isNotFullyFunded });

    // Bridge chains fund promt
    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType == 'evm') {
            isNotFullyFunded = await handleEvmPromt({ chainConfig, evmPublicAddress, isNotFullyFunded });
        }
    }

    // Staking coin fund promt
    await handleBscStakingPromt({ chainConfig: config.stakingConfig, evmPublicAddress, isNotFullyFunded })

    if (isNotFullyFunded) {
        console.log("To stake and initialize your node.");
    } else {
        console.log("Initializing your node");
    }

    return isNotFullyFunded
};

export default promptToGetFunding