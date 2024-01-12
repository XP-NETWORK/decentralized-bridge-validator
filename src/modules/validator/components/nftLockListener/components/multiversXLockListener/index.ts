import { multiversXContractListener } from '@src/modules/validator/utils';
import { IMultiversXLockListener } from './types';

const multiversXLockListener = async ({
    config,
    wallets,
    multiversXChainConfig,
}: IMultiversXLockListener) => {
    await multiversXContractListener({
        eventIdentifier: ['lock721', 'lock1155'],
        multiversXChainConfig,
        config,
        wallets,
        jobName: 'multiversXLockedEventListener',
    });
};

export default multiversXLockListener;
