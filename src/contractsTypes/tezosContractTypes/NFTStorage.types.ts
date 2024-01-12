import {
  type ContractAbstractionFromContractType,
  type WalletContractAbstractionFromContractType
} from './type-utils'
import { type address, type nat } from './type-aliases'

export interface Storage {
  owner: address
  collection: address
}

interface Methods {
  unlock_token: (token_id: nat, to: address) => Promise<void>
  deposit_token: (param: nat) => Promise<void>
}

interface MethodsObject {
  unlock_token: (params: { token_id: nat, to: address }) => Promise<void>
  deposit_token: (param: nat) => Promise<void>
}

interface contractTypes {
  methods: Methods
  methodsObject: MethodsObject
  storage: Storage
  code: { __type: 'NFTStorageCode', protocol: string, code: object[] }
}
export type NFTStorageContractType =
    ContractAbstractionFromContractType<contractTypes>
export type NFTStorageWalletType =
    WalletContractAbstractionFromContractType<contractTypes>
