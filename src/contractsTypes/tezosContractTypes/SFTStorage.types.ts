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
  unlock_token: (token_id: nat, to: address, amt: nat) => Promise<void>
  deposit_token: (token_id: nat, amt: nat) => Promise<void>
}

interface MethodsObject {
  unlock_token: (params: {
    token_id: nat
    to: address
    amt: nat
  }) => Promise<void>
  deposit_token: (params: { token_id: nat, amt: nat }) => Promise<void>
}

interface contractTypes {
  methods: Methods
  methodsObject: MethodsObject
  storage: Storage
  code: { __type: 'SFTStorageCode', protocol: string, code: object[] }
}
export type SFTStorageContractType =
    ContractAbstractionFromContractType<contractTypes>
export type SFTStorageWalletType =
    WalletContractAbstractionFromContractType<contractTypes>
