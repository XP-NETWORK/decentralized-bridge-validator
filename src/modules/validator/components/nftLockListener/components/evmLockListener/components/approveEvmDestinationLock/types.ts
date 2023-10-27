import { BridgeStorage } from "@src/contractsTypes";
import { IEvmChainConfigAndEvmWallet } from "@src/types";
import { INftTransferDetailsObject } from "../../types";

interface IApproveEvmDestinationLock {
    nftTransferDetailsObject: INftTransferDetailsObject,
    evmChainConfigAndEvmWallet: IEvmChainConfigAndEvmWallet;
    storageContract: BridgeStorage
}

export { IApproveEvmDestinationLock }