import { IChain } from "../config/types";
import { IEvmWallet } from "../modules/setup/types";

interface IGetEvmBridgeContract {
    evmChainConfig: IChain;
    evmWallet: IEvmWallet;
}
interface IGetStorageContract {
    storageChainConfig: IChain;
    evmWallet: IEvmWallet;
}

interface IGetCurrentEvmBalance {
    rpc: string;
    accAddress: string
    coinAddress?: string;
}

export { IGetEvmBridgeContract, IGetStorageContract, IGetCurrentEvmBalance }