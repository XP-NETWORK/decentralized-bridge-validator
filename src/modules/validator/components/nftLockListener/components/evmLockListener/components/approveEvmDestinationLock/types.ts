import { BridgeStorage } from "@src/contractsTypes";
import { IEvmWallet } from "@src/types";
import { INftTransferDetailsObject } from "../../types";

interface IApproveEvmDestinationLock {
    nftTransferDetailsObject: INftTransferDetailsObject,
    evmWallet: IEvmWallet;
    storageContract: BridgeStorage;
    txChain: string;
}

export { IApproveEvmDestinationLock }