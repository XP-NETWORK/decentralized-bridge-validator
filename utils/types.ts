import { IChain } from "../config/types";
import { IEvmWallet } from "../modules/setup/types";

interface IEvmChainConfigAndEvmWallet {
    evmChainConfig: IChain;
    evmWallet: IEvmWallet;
}


interface IGetCurrentEvmBalance {
    rpc: string;
    accAddress: string
    coinAddress?: string;
}
interface IContractConfig {
    contractAddress: string;
    rpcURL : string;
}


interface IContractConfigAndEvmWallet {
    contractConfig: IContractConfig;
    evmWallet: IEvmWallet;
}

export { IEvmChainConfigAndEvmWallet, IGetCurrentEvmBalance, IContractConfigAndEvmWallet }