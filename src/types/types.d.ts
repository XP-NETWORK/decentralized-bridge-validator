
interface IEvmWallet {
    address: string;
    privateKey: string;
}

interface IGeneratedWallets {
    evmWallet: IEvmWallet
}

interface IConfigAndWallets {
    config: IBridgeConfig;
    wallets: IGeneratedWallets;
}

interface IChainConfig {
    chain: string;
    rpcURL: string;
    nativeCoinSymbol: string;
    intialFund: string;
    contractAddress: string;
    lastBlock: number;
    chainType: 'evm'
}

interface IStakingConfig extends IChainConfig {
    coinSymbol: string;
    coinAddress: string;
    lastBlock: number;
}

interface IEvmChainConfigAndEvmWallet {
    evmChainConfig: IChainConfig;
    evmWallet: IEvmWallet;
}

interface IStakingChainConfigAndEvmWallet {
    stakingChainConfig: IStakingConfig;
    evmWallet: IEvmWallet;
}

interface IContractConfig {
    contractAddress: string;
    rpcURL: string;
}


interface IContractConfigAndEvmWallet {
    contractConfig: IContractConfig;
    evmWallet: IEvmWallet;
}



interface IBridgeConfig {
    bridgeChains: IChainConfig[];
    optimismChain: IChainConfig;
    stakingConfig: IStakingConfig;
}
