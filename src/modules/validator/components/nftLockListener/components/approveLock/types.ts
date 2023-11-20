import { BridgeStorage } from "@src/contractsTypes";
import { IChainConfig, IGeneratedWallets } from "@src/types";
import { INftTransferDetailsObject } from "../types";

interface IApproveLock {
    nftTransferDetailsObject: INftTransferDetailsObject,
    wallets: IGeneratedWallets;
    storageContract: BridgeStorage;
    destinationChainObject: IChainConfig;
    txChain: string;
}

export { IApproveLock }