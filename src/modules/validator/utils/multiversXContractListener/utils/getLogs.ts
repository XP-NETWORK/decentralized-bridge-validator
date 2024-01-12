import axios from 'axios'
import {
  type IGetMultiverseXLogs,
  type IMultiverseXLogEvent,
  type IMultiverseXLogs
} from './types'
import { MultiversXTransactions } from '@src/db/entity/MultiversXTransactions'

const getLogs = async ({
  gatewayURL,
  txHashes,
  eventIdentifier,
  transactionalEntityManager
}: IGetMultiverseXLogs) => {
  const resultantLogs: Array<IMultiverseXLogEvent & { txHash: string }> = []
  const incompleteTx: Record<string, boolean> = {}

  const getResultantLogs = (logs: IMultiverseXLogs, txHash: string) => {
    const eventLog = logs.events.find((_event) => {
      return eventIdentifier.includes(_event.identifier)
    })
    const isCompletedTx = logs.events.find(
      (_event) => _event.identifier === 'completedTxEvent'
    )
    if (eventLog && isCompletedTx) {
      resultantLogs.push({ ...eventLog, txHash })
    } else if (eventLog && !isCompletedTx) {
      incompleteTx[txHash] = true
    }
  }

  try {
    for (const txHash of txHashes) {
      const response = (
        await axios.get(
                    `${gatewayURL.replace(
                        'gateway',
                        'api'
                    )}/transactions/${txHash}`
        )
      ).data

      if (response?.logs) getResultantLogs(response.logs, txHash)
      if (response?.results?.logs) { getResultantLogs(response.results.log, txHash) }
      if (response?.results.length > 0) {
        for (const i of response.results) {
          if (i?.logs) {
            getResultantLogs(i.logs, txHash)
          }
        }
      }

      try {
        const successTransactions =
                    await transactionalEntityManager.find(
                      MultiversXTransactions,
                      {
                        where: {
                          status: 'success'
                        }
                      }
                    )
        const modifiedTxObjects: MultiversXTransactions[] = []
        successTransactions.forEach((txObject) => {
          if (incompleteTx[txObject.transactionHash]) {
            txObject.status = 'pending'
            modifiedTxObjects.push(txObject)
          }
        })
        if (modifiedTxObjects.length > 0) {
          await transactionalEntityManager.save(
            MultiversXTransactions,
            modifiedTxObjects
          )
        }
      } catch (e) {
        console.log(e)
        throw Error('Error while saving in database')
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error while getting logs')
  }

  return { resultantLogs }
}

export default getLogs
