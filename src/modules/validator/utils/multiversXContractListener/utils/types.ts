import { type EntityManager } from 'typeorm'

interface IGetMultiverseXLogs {
  gatewayURL: string
  eventIdentifier: string[]
  transactionalEntityManager: EntityManager
  txHashes: string[]
}

interface IMultiverseXLogEvent {
  identifier: string
  topics: string[]
}

interface IMultiverseXTxHashes {
  hits: {
    hits: Array<{
      _id: string
    }>
  }
}

interface IMultiverseXLogs {
  events: IMultiverseXLogEvent[]
}

interface IMultiverseXTxStatus {
  hits: {
    hits: Array<{
      _id: string
      _source: {
        status: string
      }
    }>
  }
}

export type {
  IGetMultiverseXLogs,
  IMultiverseXLogs,
  IMultiverseXLogEvent,
  IMultiverseXTxHashes,
  IMultiverseXTxStatus
}
