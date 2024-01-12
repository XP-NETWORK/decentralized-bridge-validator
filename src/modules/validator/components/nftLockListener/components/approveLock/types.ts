import { BridgeStorage } from '@src/contractsTypes';
import { IGeneratedWallets, TChain } from '@src/types';
import { INftTransferDetailsObject } from '../types';

interface IApproveLock {
    nftTransferDetailsObject: INftTransferDetailsObject;
    wallets: IGeneratedWallets;
    storageContract: BridgeStorage;
    destinationChainObject: TChain;
    txChain: string;
}

export { IApproveLock };
