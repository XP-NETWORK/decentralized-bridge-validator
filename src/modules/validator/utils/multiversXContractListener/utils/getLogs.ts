import axios from "axios"
import { IGetMultiverseXLogs, IMultiverseXLogEvent, IMultiverseXLogs } from "./types"
import { MultiversXTransactions } from "@src/db/entity/MultiversXTransactions"

const getLogs = async ({ elasticSearchURL, txHashes, eventIdentifier, transactionalEntityManager }: IGetMultiverseXLogs) => {

    const data = {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            _source: ["events"],
            query: {
                bool: {
                    should: [
                        {
                            terms: {
                                "originalTxHash": txHashes
                            }
                        }
                    ]
                }
            }
        }
    }

    const resultantLogs: (IMultiverseXLogEvent & { txHash: string })[] = []
    const incompleteTx: { [txHash: string]: boolean } = {};

    try {
        const logs: IMultiverseXLogs = (await axios.get(`${elasticSearchURL}/logs/_search`, data)).data
        for (const [index, log] of logs.hits.hits.entries()) {
            const eventLog = log._source.events.find(_event => {
                return eventIdentifier.includes(_event.identifier)
            })

            const isCompletedTx = log._source.events.find(_event => _event.identifier === "completedTxEvent");
            if (eventLog && isCompletedTx) {
                resultantLogs.push({ ...eventLog, txHash: txHashes[index] })
            } else if (eventLog && !isCompletedTx) {
                incompleteTx[log._id] = true
            }

            try {
                const successTransactions = await transactionalEntityManager.find(MultiversXTransactions, {
                    where: {
                        status: 'success'
                    }
                });
                const modifiedTxObjects: MultiversXTransactions[] = [];
                successTransactions
                    .forEach(txObject => {
                        if (incompleteTx[txObject.transactionHash]) {
                            txObject.status = "pending";
                            modifiedTxObjects.push(txObject)
                        }
                    })
                if (modifiedTxObjects.length)
                    await transactionalEntityManager.save(MultiversXTransactions, modifiedTxObjects);
            } catch (e) {
                console.log(e)
                throw Error("Error while saving in database")
            }
        }
    } catch (error) {
        throw new Error("Error while getting logs")
    }

    return { resultantLogs }
}

export default getLogs