import { type IConfigAndWallets, type IMultiversXChainConfig } from '@src/types'

interface IMultiversXLockListener extends IConfigAndWallets {
  multiversXChainConfig: IMultiversXChainConfig
}

export type { IMultiversXLockListener }
