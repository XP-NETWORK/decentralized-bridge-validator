import axios from "axios";
import { IMultiverseXTxStatus } from "./types";

const getTxHashes = async ({ gatewayURL, contractAddress, from }) => {
    const data = {
        from,
        _source: ["status"],
        size: 5,
        query: {
            term: {
                receiver: contractAddress
            }
        },
        sort: [
            {
                timestamp: {
                    order: "asc"
                }
            }
        ]
    };

    const resultantLogs: { txHash: string, status: string }[] = [];

    try {
        const logs: IMultiverseXTxStatus = (await axios.get(`${gatewayURL}/transactions/_search`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })).data

        logs.hits.hits.forEach((log) => {
            resultantLogs.push({ ...log._source, txHash: log._id })
        });
    } catch (error) {
        console.info("No transactions found")
    }


    return resultantLogs
}

export default getTxHashes