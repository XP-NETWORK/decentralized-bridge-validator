import { IConfigAndWallets, IEvmChainConfig } from "@src/types";
import { handleEvmValidatorAddition } from "./components";

const addSelfInBridges = async ({ config, wallets }: IConfigAndWallets) => {

    const storageChainConfig = config.storageConfig;

    for (const chainConfig of config.bridgeChains) {

        if (chainConfig.signType === 'ecdsa') {

            const evmChainConfig = chainConfig;
            const evmWallet = wallets.evmWallet;

            await handleEvmValidatorAddition({ storageChainConfig, evmChainConfig: evmChainConfig as IEvmChainConfig, evmWallet })
        }
    }

}

export default addSelfInBridges;
