import axios from 'axios';
import { IMultiverseXTxStatus } from './types';

const getTxHashes = async ({ elasticSearchURL, contractAddress, from }) => {
    const data = {
        from,
        _source: ['status'],
        size: 100,

        query: {
            term: {
                receivers: contractAddress,
            },
        },
        sort: [
            {
                timestamp: {
                    order: 'asc',
                },
            },
        ],
    };

    const resultantLogs: { txHash: string; status: string }[] = [];

    try {
        const logs: IMultiverseXTxStatus = (
            await axios.get(`${elasticSearchURL}/transactions/_search`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            })
        ).data;

        logs.hits.hits.forEach((log) => {
            resultantLogs.push({ ...log._source, txHash: log._id });
        });
    } catch (error) {
        console.log(error);
        console.info('No transactions found');
    }

    return resultantLogs;
};

export default getTxHashes;
