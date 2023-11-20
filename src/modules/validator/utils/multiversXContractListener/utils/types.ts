interface IGetMultiverseXLogs {
    elasticSearchURL: string;
    eventIdentifier: string;
    txHashes: string[];
}

interface IMultiverseXLogEvent {
    identifier: string;
    address: string;
    data: null | string;
    topics: string[];
    order: number;
}



interface IMultiverseXTxHashes {
    hits: {
        hits: {
            _id: string;
        }[]
    };
}


interface IMultiverseXLogs {
    hits: {
        hits: {
            _id: string;
            _source: {
                events: IMultiverseXLogEvent[];
            }
        }[]
    };
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