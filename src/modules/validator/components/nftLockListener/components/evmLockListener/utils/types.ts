interface IGetNftDetails {
    sourceNftContractAddress: string;
    sourceChainRpcURL: string;
    evmWallet: IEvmWallet;
    tokenId: string;
    nftType: string;
}

export { IGetNftDetails }