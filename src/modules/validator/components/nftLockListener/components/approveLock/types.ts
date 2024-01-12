import { type BridgeStorage } from '@src/contractsTypes'
import { type IGeneratedWallets, type TChain } from '@src/types'
import { type INftTransferDetailsObject } from '../types'

interface IApproveLock {
  nftTransferDetailsObject: INftTransferDetailsObject
  wallets: IGeneratedWallets
  storageContract: BridgeStorage
  destinationChainObject: TChain
  txChain: string
}

export type { IApproveLock }
