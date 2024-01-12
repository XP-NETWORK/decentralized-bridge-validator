import { type BridgeStorage } from '@src/contractsTypes'
import { type IGeneratedWallets } from '@src/types'

interface IApproveStake {
  wallets: IGeneratedWallets
  validatorAddressAndChainType: Array<{
    validatorAddress: string
    chainType: string
  }>
  storageContract: BridgeStorage
}

export type { IApproveStake }
