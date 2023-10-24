import { BridgeStorage } from "../../../../../../../contractsTypes";
import { INftTransferDetailsObject } from "../types";

interface IApproveEvmDestinationLock {
    nftTransferDetailsObject: INftTransferDetailsObject,
    evmChainConfigAndEvmWallet: IEvmChainConfigAndEvmWallet;
    storageContract: BridgeStorage
}

export { IApproveEvmDestinationLock }