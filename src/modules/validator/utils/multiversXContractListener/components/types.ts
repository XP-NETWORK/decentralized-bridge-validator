import { IConfigAndWallets, IMultiversXChainConfig } from '@src/types';
import { IMultiverseXLogEvent } from '../utils/types';
import { EntityManager } from 'typeorm';

type IPoolTxHashes = {
    elasticSearchURL: string;
    contractAddress: string;
    lastBlock_: number;
};

type IPoolTxStatus = {
    elasticSearchURL: string;
};

type IHandleLog = {
    ({
        log,
        transactionalEntityManager,
    }: {
        log: IMultiverseXLogEvent & { transactionHash: string };
        transactionalEntityManager: EntityManager;
    }): Promise<void>;
};

type IProcessLogs = {
    gatewayURL: string;
    eventIdentifier: string[];
    multiversXChainConfig: IMultiversXChainConfig;
} & IConfigAndWallets;

export { IPoolTxHashes, IPoolTxStatus, IProcessLogs, IHandleLog };
