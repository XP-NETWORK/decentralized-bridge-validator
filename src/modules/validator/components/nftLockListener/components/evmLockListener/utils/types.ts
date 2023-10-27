import { IBridgeConfig, IEvmChainConfig, IEvmWallet } from "@src/types";

interface IGetNftDetails {
    sourceNftContractAddress: string;
    sourceChainRpcURL: string;
    evmWallet: IEvmWallet;
    tokenId: string;
    nftType: string;
}
interface IHandleLockEventLog {
    config: IBridgeConfig;
    evmChainConfig: IEvmChainConfig;
    evmWallet: IEvmWallet
}

export { IGetNftDetails, IHandleLockEventLog }