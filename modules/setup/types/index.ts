interface IWalletConfig {
    chain: string;
    address: string;
    privateKey: string;
}

interface IGeneratedWallets {
    optimismChainWallet: IWalletConfig;
    bridgeChainsWallet: IWalletConfig[];
}

export { IWalletConfig , IGeneratedWallets}