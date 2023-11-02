import axios from "axios";
import { IMultiverseXTxStatus } from "./types";

const getTxHashes = async ({ gatewayURL, contractAddress, from }) => {
    const logs: IMultiverseXTxStatus = (await axios.get(`${gatewayURL}/transactions/_search`, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            from,
            _source: ["status"],
            size: 5,
            query: {
                bool: {
                    should: [
                        {
                            match: {
                                receiver: contractAddress
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    timestamp: {
                        order: "asc"
                    }
                }
            ]
        }
    })).data


    const resultantLogs: { txHash: string, status }[] = []

    logs.hits.hits.forEach((log) => {
        resultantLogs.push({ ...log._source, txHash: log._id })
    });

    return resultantLogs
}

export default getTxHashes