interface chain {
    chain: string;
    rpc: string;
    nativeCoinSymbol: string;
    intialFund: bigint
}

interface stakingConfig {
    chain: string;
    rpc: string;
    coinSymbol: string;
    coinAddress: string;
    contractAddress: string;
    intialFund: bigint
}

interface chainSpecs {
    bridgeChains: chain[];
    optimismChain: chain;
    stakingConfig: stakingConfig;
}

export { chain, chainSpecs , stakingConfig}