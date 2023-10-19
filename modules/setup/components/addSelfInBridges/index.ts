import { IConfigAndWallets } from "../../../validator/types";
import { handleEvmValidatorAddition } from "./components";


// @TODO after getting the bridge contract see if this still works

const addSelfInBridges = async ({ config, wallets }: IConfigAndWallets) => {

    for (const chainConfig of config.bridgeChains) {

        if (chainConfig.chainType === "evm") {

            const storageChainConfig = config.optimismChain;
            const evmChainConfig = chainConfig;
            const evmWallet = wallets.evmWallet;

            await handleEvmValidatorAddition({ storageChainConfig, evmChainConfig, evmWallet })
        }
    }

}

export default addSelfInBridges;
