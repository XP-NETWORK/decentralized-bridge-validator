import axios from "axios";
import { IMultiverseXTxStatus } from "./types";

const getTxStatus = async ({ gatewayURL, txHashes }) => {
    const logs: IMultiverseXTxStatus = (await axios.get(`${gatewayURL}/transactions/_search`, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            _source: ["status"],
            query: {
                ids: {
                    values: txHashes
                }
            }
        }
    })).data

    const resultantLogs: { txHash: string, status: string }[] = []

    logs.hits.hits.forEach((log) => {
        resultantLogs.push({ ...log._source, txHash: log._id })
    });

    return resultantLogs
}

export default getTxStatus