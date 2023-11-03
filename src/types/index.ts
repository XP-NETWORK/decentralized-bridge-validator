interface ISecretKeyCrypto {
    ciphertext: string;
    cipherparams: {
        iv: string;
    };
    cipher: string;
    kdf: string;
    kdfparams: {
        dklen: number;
        salt: string;
        n: number;
        r: number;
        p: number;
    };
    mac: string;
}

interface ISecretKey {
    version: number;
    kind: string;
    id: string;
    address: string;
    bech32: string;
    crypto: ISecretKeyCrypto;
}

interface IMultiversXWallet {
    password: string;
    userWallet: ISecretKey
}


interface IEvmWallet {
    address: string;
    privateKey: string;
}

interface IGeneratedWallets {
    evmWallet: IEvmWallet;
    multiversXWallet: IMultiversXWallet;
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
    chainType: string
}

interface IEvmChainConfig extends IChainConfig {
    chainType: 'evm';
}

interface IMultiversXChainConfig extends IChainConfig {
    chainType: 'ed25519';
    elasticSearchURL: string;
}


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
    bridgeChains: (IChainConfig | IEvmChainConfig)[];
    storageConfig: IEvmChainConfig;
    stakingConfig: IStakingConfig;
}


export {
    IEvmWallet,
    IMultiversXWallet,
    IEvmChainConfig,
    IGeneratedWallets,
    IConfigAndWallets,
    IChainConfig,
    IEvmChainConfigAndEvmWallet,
    IStakingConfig,
    IStakingChainConfigAndEvmWallet,
    IContractConfig,
    IContractConfigAndEvmWallet,
    IBridgeConfig,
    IMultiversXChainConfig
}