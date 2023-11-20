import axios from "axios"
import { IGetMultiverseXLogs, IMultiverseXLogEvent, IMultiverseXLogs } from "./types"

const getLogs = async ({ elasticSearchURL, txHashes, eventIdentifier }: IGetMultiverseXLogs) => {

    const data = {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            _source: ["events"],
            query: {
                ids: {
                    values: txHashes
                }
            }
        }
    }

    const resultantLogs: (IMultiverseXLogEvent & { txHash: string })[] = []
    const incompleteTx: { [txHash: string]: boolean } = {};

    try {
        const logs: IMultiverseXLogs = (await axios.get(`${elasticSearchURL}/logs/_search`, data)).data
        logs.hits.hits.forEach((log) => {
            const eventLog = log._source.events.find(_event => {
                return _event.identifier === eventIdentifier
            })
            const isCompletedTx = log._source.events.find(_event => _event.identifier === "completedTxEvent")
            if (eventLog && isCompletedTx) {
                resultantLogs.push({ ...eventLog, txHash: log._id })
            } else if (eventLog && !isCompletedTx) {
                incompleteTx[log._id] = true
            }
        });
    } catch (error) {
        throw new Error("Error while getting logs")
    }

    return { resultantLogs, incompleteTx }
}

export default getLogs