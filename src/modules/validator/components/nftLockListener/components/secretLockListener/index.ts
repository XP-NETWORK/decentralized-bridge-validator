import { secretContractListener } from '@src/modules/validator/utils';
import { getSecretLockListenerHandler } from './utils';
import { ISecretLockListener } from '../../types';

const secretLockListener = async ({
    config,
    secretChainConfig,
    wallets,
}: ISecretLockListener) => {
    const {
        contractAddress,
        rpcURL,
        lastBlock: lastBlock_,
        chain,
        chainId,
    } = secretChainConfig;

    const handleLog = getSecretLockListenerHandler({
        config,
        secretChainConfig,
        wallets,
    });

    try {
        await secretContractListener({
            contractAddress,
            rpcURL,
            lastBlock_,
            chain,
            chainId,
            eventId: 'LockedEventInfo',
            handleLog,
        });
    } catch (e) {
        console.error('Error in secretLockListener', e);
    }
};

export default secretLockListener;
