import { IConfigAndWallets } from '@src/types';
import { createJobWithWorker } from '../../utils';
import {
    evmLockListener,
    multiversXLockListener,
    secretLockListener,
    tonLockListener,
    tezosLockListener,
} from './components';
import {
    IEvmLockListener,
    IHederaLockListener,
    ISecretLockListener,
    ITezosLockListener,
    ITonLockListener,
} from './types';
import hederaLockListener from './components/hederaLockListener';

const nftLockListener = async ({ config, wallets }: IConfigAndWallets) => {
    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType === 'evm') {
            const jobData: IEvmLockListener = {
                evmChainConfig: chainConfig,
                config,
                wallets,
            };
            const jobName: string = `evmLockedEventListener_${chainConfig.chain}`;
            await createJobWithWorker<IEvmLockListener>({
                jobData,
                jobName,
                jobFunction: evmLockListener,
            });
        } else if (chainConfig.chainType === 'hedera') {
            const jobData: IHederaLockListener = {
                hederaChainConfig: chainConfig,
                config,
                wallets,
            };
            const jobName: string = `hederaLockedEventListener_${chainConfig.chain}`;
            await createJobWithWorker<IHederaLockListener>({
                jobData,
                jobName,
                jobFunction: hederaLockListener,
            });
        } else if (chainConfig.chainType === 'multiversX') {
            await multiversXLockListener({
                config,
                wallets,
                multiversXChainConfig: chainConfig,
            });
        } else if (chainConfig.chainType === 'ton') {
            const jobData: ITonLockListener = {
                tonChainConfig: chainConfig,
                config,
                wallets,
            };
            const jobName: string = `tonLockedEventListener_${chainConfig.chain}`;
            await createJobWithWorker<ITonLockListener>({
                jobData,
                jobName,
                jobFunction: tonLockListener,
            });
        } else if (chainConfig.chainType === 'scrt') {
            const jobData: ISecretLockListener = {
                config,
                secretChainConfig: chainConfig,
                wallets,
            };
            const jobName: string = `secretLockedEventListener_${chainConfig.chain}`;
            await createJobWithWorker<ISecretLockListener>({
                jobData,
                jobName,
                jobFunction: secretLockListener,
            });
        } else if (chainConfig.chainType === 'tezos') {
            const jobData: ITezosLockListener = {
                config,
                tezosChainConfig: chainConfig,
                wallets,
            };
            const jobName: string = `tezosLockedEventListener_${chainConfig.chain}`;
            await createJobWithWorker<ITezosLockListener>({
                jobData,
                jobName,
                jobFunction: tezosLockListener,
            });
        }
    }
};

export default nftLockListener;
