import { SupportedChains } from '@src/config/chainSpecs';

type ISecretKeyCrypto = {
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
};

type ISecretKey = {
    version: number;
    kind: string;
    id: string;
    address: string;
    bech32: string;
    crypto: ISecretKeyCrypto;
};

type IMultiversXWallet = {
    password: string;
    userWallet: ISecretKey;
};

type ITonWallet = {
    publicKey: string;
    secretKey: string;
};

type IEvmWallet = {
    address: string;
    privateKey: string;
};
type IHederaWallet = {
    address: string;
    privateKey: string;
};

type ISecretWallet = {
    publicKey: string;
    privateKey: string;
};

type ITezosWallet = {
    publicKey: string;
    secretKey: string;
};

type IGeneratedWallets = {
    evmWallet: IEvmWallet;
    multiversXWallet: IMultiversXWallet;
    tonWallet: ITonWallet;
    secretWallet: ISecretWallet;
    tezosWallet: ITezosWallet;
};

type IConfigAndWallets = {
    config: IBridgeConfig;
    wallets: IGeneratedWallets;
};

type IChainConfig = {
    chain: string;
    nativeCoinSymbol: string;
    intialFund: string;
    contractAddress: string;
    lastBlock: number;
    chainType: string;
};
type IChainConfigAndWallets = {
    chainConfig: TChain;
    wallets: IGeneratedWallets;
};
type IEvmChainConfig = {
    chainType: 'evm';
    rpcURL: string;
} & IChainConfig;

type IHederaChainConfig = {
    chainType: 'hedera';
    rpcURL: string;
    royaltyInfoProxyAddress: string;
} & IChainConfig;

type ISecretChainConfig = {
    chainType: 'scrt';
    rpcURL: string;
    chainId: string;
} & IChainConfig;

type ITonChainConfig = {
    chainType: 'ton';
    rpcURL: string;
} & IChainConfig;

type ITezosChainConfig = {
    chainType: 'tezos';
    restApiURL: string;
    rpcURL: string;
} & IChainConfig;

type IMultiversXChainConfig = {
    chainType: 'multiversX';
    elasticSearchURL: string;
    gatewayURL: string;
    chainID: string;
} & IChainConfig;

type IEvmChainConfigAndEvmWallet = {
    evmChainConfig: IEvmChainConfig;
    evmWallet: IEvmWallet;
};
type IHederaChainConfigAndEvmWallet = {
    hederaChainConfig: IHederaChainConfig;
    evmWallet: IEvmWallet;
};

type ITonChainConfigAndTonWallet = {
    tonChainConfig: ITonChainConfig;
    tonWallet: ITonWallet;
};

type ISecretChainConfigAndSecretWallet = {
    secretChainConfig: ISecretChainConfig;
    secretWallet: ISecretWallet;
};

type ITezosChainConfigAndTezosWallet = {
    tezosChainConfig: ITezosChainConfig;
    tezosWallet: ITezosWallet;
};

type IMultiversXChainConfigAndMultiversXWallet = {
    multiversXChainConfig: IMultiversXChainConfig;
    multiversXWallet: IMultiversXWallet;
};

type IStakingConfig = {
    coinSymbol: string;
    coinAddress: string;
    lastBlock: number;
} & IEvmChainConfig;

type IStakingChainConfigAndEvmWallet = {
    stakingChainConfig: IStakingConfig;
    evmWallet: IEvmWallet;
};
type IStakingChainConfigAndWallets = {
    stakingChainConfig: IStakingConfig;
    wallets: IGeneratedWallets;
};
type ITonContractConfig = {
    contractAddress: string;
    rpcURL: string;
};
type IEvmContractConfig = {
    contractAddress: string;
    rpcURL: string;
};
type IHederaContractConfig = {
    contractAddress: string;
    rpcURL: string;
    royaltyInfoProxyAddress: string;
};

type IMultiversXContractConfig = {
    contractAddress: string;
    gatewayURL: string;
};
type ITezosContractConfig = {
    contractAddress: string;
    rpcURL: string;
};

type ISecretContractConfig = {
    contractAddress: string;
    rpcURL: string;
    chainId: string;
};

type IEvmContractConfigAndEvmWallet = {
    contractConfig: IEvmContractConfig;
    evmWallet: IEvmWallet;
};

type IMultiversXContractConfigAndMultiversXWallet = {
    contractConfig: IMultiversXContractConfig;
    multiversXWallet: IMultiversXWallet;
};

type TChain =
    | IMultiversXChainConfig
    | IEvmChainConfig
    | ITonChainConfig
    | ISecretChainConfig
    | ITezosChainConfig
    | IHederaChainConfig;

type IBridgeConfig = {
    bridgeChains: TChain[];
    storageConfig: IEvmChainConfig;
    stakingConfig: IStakingConfig;
};

type IBridge<TLockArgs extends unknown[], TClaimData, TSig> = {
    validators: (address: string) => Promise<{ added: boolean }>;
    validatorsCount: () => Promise<bigint>;
    addValidator: (
        validatorAddress: string,
        signatures: {
            signerAddress: string;
            signature: string;
        }[],
    ) => Promise<{ hash: string; wait: () => Promise<unknown> }>;
    lock721: (
        ...lockArgs: TLockArgs
    ) => Promise<{ hash: string; wait: () => Promise<unknown> }>;
    lock1155?: (
        sourceNftContractAddress: string,
        tokenId: string,
        destinationChain: SupportedChains,
        address: string,
        amt: bigint,
    ) => Promise<{ hash: string; wait: () => Promise<unknown> }>;
    claimNFT721: (
        nftTransferData: TClaimData,
        sigs: TSig[],
    ) => Promise<{ hash: string; wait: () => Promise<unknown> }>;
    claimNFT1155?: (
        nftTransferData: TClaimData,
        sigs: TSig[],
    ) => Promise<{ hash: string; wait: () => Promise<unknown> }>;
};

type INftContract = {
    name: (tokenId?: bigint) => Promise<string>;
    symbol: (tokenId?: bigint) => Promise<string>;
    royaltyInfo: (tokenId?: bigint) => Promise<string>;
    tokenURI: (tokenId: bigint) => Promise<string>;
    approve: (tokenId: bigint, to: string) => Promise<string>;
};

export {
    TChain,
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
    ITonContractConfig,
    ISecretWallet,
    ISecretChainConfig,
    ISecretChainConfigAndSecretWallet,
    ISecretContractConfig,
    ITezosWallet,
    ITezosChainConfig,
    ITezosChainConfigAndTezosWallet,
    IHederaChainConfig,
    IHederaChainConfigAndEvmWallet,
    IHederaContractConfig,
    IHederaWallet,
    ITezosContractConfig,
};
