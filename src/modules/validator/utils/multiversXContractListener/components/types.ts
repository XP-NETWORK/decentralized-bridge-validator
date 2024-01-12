import { type IConfigAndWallets, type IMultiversXChainConfig } from '@src/types'
import { type IMultiverseXLogEvent } from '../utils/types'
import { type EntityManager } from 'typeorm'

interface IPoolTxHashes {
  elasticSearchURL: string
  contractAddress: string
  lastBlock_: number
}

interface IPoolTxStatus {
  elasticSearchURL: string
}

type IHandleLog = ({
  log,
  transactionalEntityManager
}: {
  log: IMultiverseXLogEvent & { transactionHash: string }
  transactionalEntityManager: EntityManager
}) => Promise<void>

interface IProcessLogs extends IConfigAndWallets {
  gatewayURL: string
  eventIdentifier: string[]
  multiversXChainConfig: IMultiversXChainConfig
}

export type { IPoolTxHashes, IPoolTxStatus, IProcessLogs, IHandleLog }
