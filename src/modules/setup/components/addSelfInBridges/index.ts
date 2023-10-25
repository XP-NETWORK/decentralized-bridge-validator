import { IConfigAndWallets } from "@src/types";
import { handleEvmValidatorAddition } from "./components";

const addSelfInBridges = async ({ config, wallets }: IConfigAndWallets) => {

    const storageChainConfig = config.storageConfig;

    for (const chainConfig of config.bridgeChains) {

        if (chainConfig.chainType === "evm") {

            const evmChainConfig = chainConfig;
            const evmWallet = wallets.evmWallet;

            await handleEvmValidatorAddition({ storageChainConfig, evmChainConfig, evmWallet })
        }
    }

}

export default addSelfInBridges;
