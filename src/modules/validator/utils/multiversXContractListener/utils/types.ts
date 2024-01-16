import { EntityManager } from 'typeorm';

type IGetMultiverseXLogs = {
    gatewayURL: string;
    eventIdentifier: string[];
    transactionalEntityManager: EntityManager;
    txHashes: string[];
};

type IMultiverseXLogEvent = {
    identifier: string;
    topics: string[];
};

type IMultiverseXTxHashes = {
    hits: {
        hits: {
            _id: string;
        }[];
    };
};

type IMultiverseXLogs = {
    events: IMultiverseXLogEvent[];
};

type IMultiverseXTxStatus = {
    hits: {
        hits: {
            _id: string;
            _source: {
                status: string;
            };
        }[];
    };
};

type IMultiverseGetTxHashesParam = {
    elasticSearchURL: string;
    contractAddress: string;
    from: number;
};

type IMultiverseGetTxStatusParam = {
    elasticSearchURL: string;
    txHashes: string[];
};
export {
    IGetMultiverseXLogs,
    IMultiverseXLogs,
    IMultiverseXLogEvent,
    IMultiverseXTxHashes,
    IMultiverseXTxStatus,
    IMultiverseGetTxHashesParam,
    IMultiverseGetTxStatusParam,
};
