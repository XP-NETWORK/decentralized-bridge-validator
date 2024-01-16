import axios from 'axios';
import { IMultiverseGetTxStatusParam, IMultiverseXTxStatus } from './types';

const getTxStatus = async ({
    elasticSearchURL,
    txHashes,
}: IMultiverseGetTxStatusParam) => {
    const data = {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            _source: ['status'],
            query: {
                ids: {
                    values: txHashes,
                },
            },
        },
    };

    const resultantLogs: { txHash: string; status: string }[] = [];

    try {
        const logs: IMultiverseXTxStatus = (
            await axios.get(`${elasticSearchURL}/transactions/_search`, data)
        ).data;

        logs.hits.hits.forEach((log) => {
            resultantLogs.push({ ...log._source, txHash: log._id });
        });
    } catch (error) {
        throw new Error('Error while getting status');
    }

    return resultantLogs;
};

export default getTxStatus;
