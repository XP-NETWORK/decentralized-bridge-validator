import {
  type ContractAbstractionFromContractType,
  type WalletContractAbstractionFromContractType
} from './type-utils'
import { type address, type MMap } from './type-aliases'

export interface Storage {
  owner: { Some: address } | null
  collection_to_store: MMap<address, address>
}

interface Methods {
  deploy_sft_storage: (param: address) => Promise<void>
  deploy_nft_storage: (param: address) => Promise<void>
  set_owner: (param: address) => Promise<void>
}

interface MethodsObject {
  deploy_sft_storage: (param: address) => Promise<void>
  deploy_nft_storage: (param: address) => Promise<void>
  set_owner: (param: address) => Promise<void>
}

interface contractTypes {
  methods: Methods
  methodsObject: MethodsObject
  storage: Storage
  code: { __type: 'StorageFactoryCode', protocol: string, code: object[] }
}
export type StorageFactoryContractType =
    ContractAbstractionFromContractType<contractTypes>
export type StorageFactoryWalletType =
    WalletContractAbstractionFromContractType<contractTypes>
