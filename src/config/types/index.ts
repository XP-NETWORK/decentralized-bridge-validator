interface IChainConfig {
    chain: string;
    rpc: string;
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

interface IBridgeConfig {
    bridgeChains: IChainConfig[];
    optimismChain: IChainConfig;
    stakingConfig: IStakingConfig;
}

export { IChainConfig, IBridgeConfig, IStakingConfig }