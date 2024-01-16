type ISecretContractListener = {
    contractAddress: string;
    rpcURL: string;
    chainId: string;
    lastBlock_: number;
    eventId: string;
    chain: string;
    handleLog: ({ log }: { log: string; hash: string }) => Promise<void>;
};

export { ISecretContractListener };
