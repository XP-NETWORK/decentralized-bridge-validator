import { IConfigAndWallets, IMultiversXChainConfig } from '@src/types';

type IMultiversXContractListener = {
    eventIdentifier: string[];
    multiversXChainConfig: IMultiversXChainConfig;
    jobName: string;
} & IConfigAndWallets;

export { IMultiversXContractListener };
