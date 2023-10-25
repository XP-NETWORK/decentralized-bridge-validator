
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

type IEvmChainConfig = IChainConfig & {
    chainType: 'evm';
};

interface IEvmChainConfigAndEvmWallet {
    evmChainConfig: IEvmChainConfig;
    evmWallet: IEvmWallet;
}

interface IStakingConfig extends IEvmChainConfig {
    coinSymbol: string;
    coinAddress: string;
    lastBlock: number;
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
    storageConfig: IEvmChainConfig;
    stakingConfig: IStakingConfig;
}


export {
    IEvmWallet,
    IEvmChainConfig,
    IGeneratedWallets,
    IConfigAndWallets,
    IChainConfig,
    IEvmChainConfigAndEvmWallet,
    IStakingConfig,
    IStakingChainConfigAndEvmWallet,
    IContractConfig,
    IContractConfigAndEvmWallet,
    IBridgeConfig
}