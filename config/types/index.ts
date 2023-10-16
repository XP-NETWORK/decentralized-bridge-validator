interface IChain {
    chain: string;
    rpc: string;
    nativeCoinSymbol: string;
    intialFund: bigint
}

interface IStakingConfig {
    chain: string;
    rpc: string;
    coinSymbol: string;
    coinAddress: string;
    contractAddress: string;
    intialFund: bigint
}

interface IChainSpecs {
    bridgeChains: IChain[];
    optimismChain: IChain;
    stakingConfig: IStakingConfig;
}

export { IChain, IChainSpecs , IStakingConfig}