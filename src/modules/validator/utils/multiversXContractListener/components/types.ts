import { IMultiverseXLogEvent } from "../utils/types";

interface IPoolTxHashes {
    gatewayURL: string;
    contractAddress: string;
    lastBlock_: number
}

interface IPoolTxStatus {
    gatewayURL: string;
}

interface IHandleLog {
    ({ log }: { log: IMultiverseXLogEvent & { txHash: string } }): Promise<void>;
}

interface IProcessLogs {
    gatewayURL: string;
    eventIdentifier: string;
    handleLog: IHandleLog
}


export { IPoolTxHashes, IPoolTxStatus, IProcessLogs, IHandleLog }