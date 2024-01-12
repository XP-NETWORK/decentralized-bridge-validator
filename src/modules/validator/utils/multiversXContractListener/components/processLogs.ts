import { AppDataSource } from '@src/db/data-source'
import { MultiversXTransactions } from '@src/db/entity/MultiversXTransactions'
import { getLogs } from '../utils'
import { type IProcessLogs } from './types'
import { getMultiversXLockListenerHandler } from '@src/modules/validator/components/nftLockListener/components/multiversXLockListener/utils'

const processLogs = async ({
  gatewayURL,
  eventIdentifier,
  config,
  wallets,
  multiversXChainConfig
}: IProcessLogs) => {
  const handleLog = getMultiversXLockListenerHandler({
    config,
    wallets,
    multiversXChainConfig
  })
  try {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const successTransactions = await transactionalEntityManager.find(
        MultiversXTransactions,
        {
          where: {
            status: 'success'
          }
        }
      )

      if (successTransactions.length === 0) {
        return
      }

      const { resultantLogs } = await getLogs({
        gatewayURL,
        txHashes: successTransactions.map((tx) => tx.transactionHash),
        eventIdentifier,
        transactionalEntityManager
      })
      const handleLogPromises: Array<Promise<void>> = []
      for (const log of resultantLogs) {
        handleLogPromises.push(
          handleLog({
            log: { ...log, transactionHash: log.txHash },
            transactionalEntityManager
          })
        )
      }
      await Promise.all(handleLogPromises)
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error while processing transaction logs')
  }
}
export default processLogs
