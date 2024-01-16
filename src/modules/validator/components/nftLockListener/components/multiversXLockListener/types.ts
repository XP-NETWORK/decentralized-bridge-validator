import { IConfigAndWallets, IMultiversXChainConfig } from '@src/types';

type IMultiversXLockListener = {
    multiversXChainConfig: IMultiversXChainConfig;
} & IConfigAndWallets;

export { IMultiversXLockListener };
