import { getTxStatus } from '../utils'
import { type Repository } from 'typeorm'
import { AppDataSource } from '@src/db/data-source'
import { MultiversXTransactions } from '@src/db/entity/MultiversXTransactions'
import { type IPoolTxStatus } from './types'

const poolTxStatus = async ({ elasticSearchURL }: IPoolTxStatus) => {
  try {
    const txRepository: Repository<MultiversXTransactions> =
            AppDataSource.getRepository(MultiversXTransactions)

    const pendingTransactions = await txRepository.find({
      where: {
        status: 'pending'
      }
    })

    if (pendingTransactions.length === 0) {
      return
    }

    const pooledStatus = await getTxStatus({
      elasticSearchURL,
      txHashes: pendingTransactions.map((tx) => tx.transactionHash)
    })

    // Filter and map transactions to update their status
    const modifiedTxObjects = pooledStatus
      .filter((tx) => tx.status !== 'pending') // Exclude transactions still pending
      .map((pooledTx) => {
        const txObject = pendingTransactions.find(
          (pendingTx) =>
            pendingTx.transactionHash === pooledTx.txHash
        )
        if (txObject) {
          txObject.status = pooledTx.status
          return txObject
        }
      })
      .filter(Boolean) // Remove undefined entries

    // Perform a bulk update within a transaction
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(
        MultiversXTransactions,
        modifiedTxObjects
      )
    })
  } catch (error) {
    throw new Error('Error while pooling transaction status')
  }
}

export default poolTxStatus
