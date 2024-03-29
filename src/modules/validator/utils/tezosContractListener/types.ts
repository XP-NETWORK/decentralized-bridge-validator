type ILog = {
    nft_type: string;
    token_id: string;
    dest_chain: string;
    dest_address: string;
    source_chain: string;
    token_amount: string;
    source_nft_address: { addr: string } | { str: string };
};

type ITezosContractListener = {
    contractAddress: string;
    restApiURL: string;
    rpcURL: string;
    lastBlock_: number;
    chain: string;
    eventId: string;
    handleLog: (log: ILog & { transaction_hash: string }) => Promise<void>;
};

type ITransactions = {
    tag: string;
    payload: ILog;
    transactionId: number;
};

export { ITezosContractListener, ITransactions, ILog };
