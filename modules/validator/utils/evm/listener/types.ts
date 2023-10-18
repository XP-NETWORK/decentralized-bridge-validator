interface LogObject {
    readonly id?: string;
    readonly removed?: boolean;
    readonly logIndex?: bigint;
    readonly transactionIndex?: bigint;
    readonly transactionHash?: string;
    readonly blockHash?: string;
    readonly blockNumber?: bigint;
    readonly address?: string;
    readonly data?: string;
    readonly topics?: string[];
}

type LogEntry = string | LogObject;

interface IListener {
    contractAddress: string,
    rpcUrl: string,
    lastBlock_: number,
    chain: string,
    handleLog: ({ log }: { log: LogEntry }) => Promise<void>
}


export { LogEntry, IListener }