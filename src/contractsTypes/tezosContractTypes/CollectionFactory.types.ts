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
  deploy_sft: (param: address) => Promise<void>
  deploy_nft: (param: address) => Promise<void>
  set_owner: (param: address) => Promise<void>
}

interface MethodsObject {
  deploy_sft: (param: address) => Promise<void>
  deploy_nft: (param: address) => Promise<void>
  set_owner: (param: address) => Promise<void>
}

interface contractTypes {
  methods: Methods
  methodsObject: MethodsObject
  storage: Storage
  code: { __type: 'CollectionFactoryCode', protocol: string, code: object[] }
}
export type CollectionFactoryContractType =
    ContractAbstractionFromContractType<contractTypes>
export type CollectionFactoryWalletType =
    WalletContractAbstractionFromContractType<contractTypes>
