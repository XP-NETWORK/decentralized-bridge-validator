import { IEvmChainConfig, IEvmWallet, IMultiversXChainConfig, ITonChainConfig } from "@src/types";

interface IGetEvmNftDetails {
    sourceNftContractAddress: string;
    sourceChain: IMultiversXChainConfig | IEvmChainConfig | ITonChainConfig;
    evmWallet: IEvmWallet;
    tokenId: string;
    nftType: string;
    chainType: string;
}


export { IGetEvmNftDetails }