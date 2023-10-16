interface chain {
    chain: string;
    rpc: string;
    nativeCoinSymbol: string;
    intialFund: bigint
}

interface stakingCoin {
    chain: string;
    rpc: string;
    coinSymbol: string;
    coinAddress: string;
    intialFund: bigint
}

interface chainSpecs {
    bridgeChains: chain[];
    optimismChain: chain;
    stakingConfig: stakingCoin;
}

export { chain, chainSpecs , stakingCoin}