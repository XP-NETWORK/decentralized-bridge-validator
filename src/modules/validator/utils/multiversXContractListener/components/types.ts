import { IConfigAndWallets, IMultiversXChainConfig } from "@src/types";
import { IMultiverseXLogEvent } from "../utils/types";
import { EntityManager } from "typeorm";


interface IPoolTxHashes {
    elasticSearchURL: string;
    contractAddress: string;
    lastBlock_: number
}

interface IPoolTxStatus {
    elasticSearchURL: string;
}

interface IHandleLog {
    ({ log, transactionalEntityManager }: { log: IMultiverseXLogEvent & { transactionHash: string }, transactionalEntityManager: EntityManager }): Promise<void>;
}

interface IProcessLogs extends IConfigAndWallets {
    gatewayURL: string;
    eventIdentifier: string[];
    multiversXChainConfig: IMultiversXChainConfig
}


export { IPoolTxHashes, IPoolTxStatus, IProcessLogs, IHandleLog }