import { IConfigAndWallets } from '@src/types';
import { handleValidatorAddition } from './components';

const addSelfInBridges = async ({ config, wallets }: IConfigAndWallets) => {
    const storageChainConfig = config.storageConfig;

    for (const chainConfig of config.bridgeChains) {
        await handleValidatorAddition({
            storageChainConfig,
            chainConfig,
            wallets,
        });
    }
};

export default addSelfInBridges;
