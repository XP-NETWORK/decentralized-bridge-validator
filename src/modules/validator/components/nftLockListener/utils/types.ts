import { IEvmChainConfig, IEvmWallet, IMultiversXChainConfig } from "@src/types";

interface IGetEvmNftDetails {
    sourceNftContractAddress: string;
    sourceChain: IMultiversXChainConfig | IEvmChainConfig;
    evmWallet: IEvmWallet;
    tokenId: string;
    nftType: string;
    chainType: string;
}


export { IGetEvmNftDetails }