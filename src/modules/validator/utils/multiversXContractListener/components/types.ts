import { IMultiverseXLogEvent } from "../utils/types";

interface IPoolTxHashes {
    elasticSearchURL: string;
    contractAddress: string;
    lastBlock_: number
}

interface IPoolTxStatus {
    elasticSearchURL: string;
}

interface IHandleLog {
    ({ log }: { log: IMultiverseXLogEvent & { transactionHash: string } }): Promise<void>;
}

interface IProcessLogs {
    elasticSearchURL: string;
    eventIdentifier: string;
    handleLog: IHandleLog
}


export { IPoolTxHashes, IPoolTxStatus, IProcessLogs, IHandleLog }