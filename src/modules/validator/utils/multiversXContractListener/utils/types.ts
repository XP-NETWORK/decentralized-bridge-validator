import { EntityManager } from "typeorm";

interface IGetMultiverseXLogs {
    gatewayURL: string;
    eventIdentifier: string[];
    transactionalEntityManager: EntityManager;
    txHashes: string[];
}

interface IMultiverseXLogEvent {
    identifier: string;
    topics: string[];
}



interface IMultiverseXTxHashes {
    hits: {
        hits: {
            _id: string;
        }[]
    };
}


interface IMultiverseXLogs {
    events: IMultiverseXLogEvent[];
}

interface IMultiverseXTxStatus {
    hits: {
        hits: {
            _id: string;
            _source: {
                status: string
            }
        }[];
    }
}



export { IGetMultiverseXLogs, IMultiverseXLogs, IMultiverseXLogEvent, IMultiverseXTxHashes, IMultiverseXTxStatus }