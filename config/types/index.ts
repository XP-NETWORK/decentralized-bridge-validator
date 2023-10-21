interface IChain {
    chain: string;
    rpc: string;
    nativeCoinSymbol: string;
    intialFund: string;
    contractAddress: string;
    lastBlock: number;
    chainType: 'evm'
}

interface IStakingConfig extends IChain {
    coinSymbol: string;
    coinAddress: string;
    lastBlock: number;
}

interface IChainSpecs {
    bridgeChains: IChain[];
    optimismChain: IChain;
    stakingConfig: IStakingConfig;
}

export { IChain, IChainSpecs , IStakingConfig}