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

interface ITonWallet {
    publicKey: string;
    secretKey: string
}


interface IEvmWallet {
    address: string;
    privateKey: string;
}

interface IGeneratedWallets {
    evmWallet: IEvmWallet;
    multiversXWallet: IMultiversXWallet;
    tonWallet: ITonWallet
}

interface IConfigAndWallets {
    config: IBridgeConfig;
    wallets: IGeneratedWallets;
}

interface IChainConfig {
    chain: string;
    nativeCoinSymbol: string;
    intialFund: string;
    contractAddress: string;
    lastBlock: number;
    chainType: string
}
interface IChainConfigAndWallets {
    chainConfig: IEvmChainConfig | IMultiversXChainConfig | ITonChainConfig;
    wallets: IGeneratedWallets;
}
interface IEvmChainConfig extends IChainConfig {
    chainType: 'evm';
    rpcURL: string;
}

interface ITonChainConfig extends IChainConfig {
    chainType: 'ton';
    rpcURL: string;
}

interface IMultiversXChainConfig extends IChainConfig {
    chainType: 'multiversX';
    elasticSearchURL: string;
    gatewayURL: string;
    chainID: string
}


interface IEvmChainConfigAndEvmWallet {
    evmChainConfig: IEvmChainConfig;
    evmWallet: IEvmWallet;
}

interface ITonChainConfigAndTonWallet {
    tonChainConfig: ITonChainConfig;
    tonWallet: ITonWallet
}

interface IMultiversXChainConfigAndMultiversXWallet {
    multiversXChainConfig: IMultiversXChainConfig;
    multiversXWallet: IMultiversXWallet;
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
interface IStakingChainConfigAndWallets {
    stakingChainConfig: IStakingConfig;
    wallets: IGeneratedWallets;
}
interface ITonContractConfig {
    contractAddress: string;
    rpcURL: string;
}
interface IEvmContractConfig {
    contractAddress: string;
    rpcURL: string;
}

interface IMultiversXContractConfig {
    contractAddress: string;
    gatewayURL: string;
}

interface IEvmContractConfigAndEvmWallet {
    contractConfig: IEvmContractConfig;
    evmWallet: IEvmWallet;
}


interface IMultiversXContractConfigAndMultiversXWallet {
    contractConfig: IMultiversXContractConfig;
    multiversXWallet: IMultiversXWallet;
}




interface IBridgeConfig {
    bridgeChains: (IMultiversXChainConfig | IEvmChainConfig | ITonChainConfig)[];
    storageConfig: IEvmChainConfig;
    stakingConfig: IStakingConfig;
}

interface IBridge {
    validators: (address: string) => Promise<{ added: boolean }>;
    validatorsCount: () => Promise<bigint>;
    addValidator: (validatorAddress: string, signatures: {
        signerAddress: string;
        signature: string
    }[]) => Promise<{ hash: string; wait: () => Promise<unknown> }>;
}

interface INftContract {
    name: () => Promise<string>;
    symbol: () => Promise<string>;
    royaltyInfo: (tokenId: bigint) => Promise<string>;
    tokenURI: (tokenId: bigint) => Promise<string>;
}


export {
    IBridge,
    IEvmWallet,
    IMultiversXWallet,
    IEvmChainConfig,
    IGeneratedWallets,
    IConfigAndWallets,
    IChainConfigAndWallets,
    IChainConfig,
    IEvmChainConfigAndEvmWallet,
    IMultiversXChainConfigAndMultiversXWallet,
    IStakingConfig,
    IStakingChainConfigAndEvmWallet,
    IEvmContractConfig,
    IEvmContractConfigAndEvmWallet,
    IBridgeConfig,
    IMultiversXChainConfig,
    IMultiversXContractConfig,
    IStakingChainConfigAndWallets,
    IMultiversXContractConfigAndMultiversXWallet,
    INftContract,
    ITonWallet,
    ITonChainConfig,
    ITonChainConfigAndTonWallet,
    ITonContractConfig
}