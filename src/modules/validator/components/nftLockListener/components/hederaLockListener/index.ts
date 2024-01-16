import { getHederaLockListenerHandler } from './utils';
import { IHederaLockListener } from '../../types';
import hederaContractListener from '@src/modules/validator/utils/hederaContractListener';

const hederaLockListener = async ({
    config,
    hederaChainConfig,
    wallets,
}: IHederaLockListener) => {
    const {
        contractAddress,
        rpcURL,
        lastBlock: lastBlock_,
        chain,
    } = hederaChainConfig;

    const handleLog = getHederaLockListenerHandler({
        config,
        hederaChainConfig,
        wallets,
    });

    try {
        await hederaContractListener({
            contractAddress,
            rpcURL,
            lastBlock_,
            chain,
            handleLog,
        });
    } catch (e) {
        console.error('Error in evmLockListener', hederaChainConfig.chain, e);
    }
};

export default hederaLockListener;
