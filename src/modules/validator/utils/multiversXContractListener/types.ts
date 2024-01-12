import { IConfigAndWallets, IMultiversXChainConfig } from '@src/types';

interface IMultiversXContractListener extends IConfigAndWallets {
    eventIdentifier: string[];
    multiversXChainConfig: IMultiversXChainConfig;
    jobName: string;
}

export { IMultiversXContractListener };
