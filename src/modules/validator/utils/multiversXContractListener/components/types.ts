import { IConfigAndWallets, IMultiversXChainConfig } from "@src/types";
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

interface IProcessLogs extends IConfigAndWallets {
    elasticSearchURL: string;
    eventIdentifier: string[];
    multiversXChainConfig: IMultiversXChainConfig
}


export { IPoolTxHashes, IPoolTxStatus, IProcessLogs, IHandleLog }