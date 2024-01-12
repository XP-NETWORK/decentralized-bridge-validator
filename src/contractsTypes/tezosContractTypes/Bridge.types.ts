import {
  type ContractAbstractionFromContractType,
  type WalletContractAbstractionFromContractType
} from './type-utils'
import {
  type address,
  type BigMap,
  type bytes,
  type key,
  type mutez,
  type nat,
  type signature
} from './type-aliases'

export interface Storage {
  validators: BigMap<address, mutez>
  unique_identifiers: BigMap<bytes, boolean>
  collection_deployer: address
  storage_deployer: address
  original_to_duplicate_mapping: BigMap<
  {
    0: address
    1: string
  },
  {
    chain: string
    contract: bytes
  }
  >
  duplicate_to_original_mapping: BigMap<
  {
    0: address
    1: string
  },
  {
    chain: string
    contract: bytes
  }
  >
  original_storage_mapping_nft: BigMap<
  {
    0: address
    1: string
  },
  address
  >
  original_storage_mapping_sft: BigMap<
  {
    0: address
    1: string
  },
  address
  >
  duplicate_storage_mapping_nft: BigMap<
  {
    0: address
    1: string
  },
  address
  >
  duplicate_storage_mapping_sft: BigMap<
  {
    0: address
    1: string
  },
  address
  >
  validators_count: nat
}

interface Methods {
  claim_nft: (
    token_id: nat,
    source_chain: string,
    dest_chain: string,
    dest_address: address,
    source_nft_contract_address: bytes,
    name: string,
    symbol: string,
    royalty: nat,
    royalty_receiver: address,
    metadata: string,
    transaction_hash: string,
    token_amount: nat,
    nft_type: string,
    fee: mutez,
    sigs: Array<{
      signer: key
      sig: signature
      addr: address
    }>,
  ) => Promise<void>
  internal_ns_nd_part: (
    token_id: nat,
    dest_chain: string,
    dest_address: address,
    collection: address,
    token_amount: nat,
    source_chain: string,
    md: string,
    transaction_hash: string,
  ) => Promise<void>
  lock_sft: (
    token_id: nat,
    dest_chain: string,
    dest_address: string,
    source_nft_address: address,
    token_amount: nat,
  ) => Promise<void>
  lock_internal: (
    to: string,
    token_id: nat,
    collection: address,
    original: boolean,
    amt: nat,
    new_deploy: boolean,
  ) => Promise<void>
  lock_nft: (
    token_id: nat,
    dest_chain: string,
    dest_address: string,
    source_nft_address: address,
  ) => Promise<void>
  claim_validator_rewards: (
    validator: address,
    sigs: Array<{
      signer: key
      sig: signature
      addr: address
    }>,
  ) => Promise<void>
  add_validator: (
    validator: address,
    sigs: Array<{
      signer: key
      sig: signature
      addr: address
    }>,
  ) => Promise<void>
}

interface MethodsObject {
  claim_nft: (params: {
    token_id: nat
    source_chain: string
    dest_chain: string
    dest_address: address
    source_nft_contract_address: bytes
    name: string
    symbol: string
    royalty: nat
    royalty_receiver: address
    metadata: string
    transaction_hash: string
    token_amount: nat
    nft_type: string
    fee: mutez
    sigs: Array<{
      signer: key
      sig: signature
      addr: address
    }>
  }) => Promise<void>
  internal_ns_nd_part: (params: {
    token_id: nat
    dest_chain: string
    dest_address: address
    collection: address
    token_amount: nat
    source_chain: string
    md: string
    transaction_hash: string
  }) => Promise<void>
  lock_sft: (params: {
    token_id: nat
    dest_chain: string
    dest_address: string
    source_nft_address: address
    token_amount: nat
  }) => Promise<void>
  lock_internal: (params: {
    to: string
    token_id: nat
    collection: address
    original: boolean
    amt: nat
    new_deploy: boolean
  }) => Promise<void>
  lock_nft: (params: {
    token_id: nat
    dest_chain: string
    dest_address: string
    source_nft_address: address
  }) => Promise<void>
  claim_validator_rewards: (params: {
    validator: address
    sigs: Array<{
      signer: key
      sig: signature
      addr: address
    }>
  }) => Promise<void>
  add_validator: (params: {
    validator: address
    sigs: Array<{
      signer: key
      sig: signature
      addr: address
    }>
  }) => Promise<void>
}

interface contractTypes {
  methods: Methods
  methodsObject: MethodsObject
  storage: Storage
  code: { __type: 'BridgeCode', protocol: string, code: object[] }
}
export type BridgeContractType =
    ContractAbstractionFromContractType<contractTypes>
export type BridgeWalletType =
    WalletContractAbstractionFromContractType<contractTypes>
