import {
  type ContractAbstractionFromContractType,
  type WalletContractAbstractionFromContractType
} from './type-utils'
import { type address, type BigMap, type bytes, type nat } from './type-aliases'

export interface Storage {
  chain_epoch: BigMap<string, nat>
  royalty_epoch: BigMap<string, nat>
  validator_epoch: BigMap<address, nat>
  staking_signatures: BigMap<
  string,
  Array<{
    signer: string
    signature: bytes
  }>
  >
  validators: BigMap<address, boolean>
  validator_status_change_votes: BigMap<
  {
    0: address
    1: boolean
    2: nat
  },
  nat
  >
  validator_voted: BigMap<
  {
    0: address
    1: address
    2: nat
  },
  boolean
  >
  chain_fee_votes: BigMap<
  {
    0: string
    1: nat
    2: nat
  },
  nat
  >
  chain_fee_voted: BigMap<
  {
    0: string
    1: nat
    2: address
    3: nat
  },
  boolean
  >
  chain_royalty_voted: BigMap<
  {
    0: string
    1: string
    2: address
    3: nat
  },
  boolean
  >
  chain_royalty_votes: BigMap<
  {
    0: string
    1: string
    2: nat
  },
  nat
  >
  validators_count: nat
  lock_signatures: BigMap<
  {
    0: string
    1: string
  },
  Array<{
    signer: string
    signature: bytes
  }>
  >
  used_signatures: BigMap<bytes, boolean>
  chain_fee: BigMap<string, nat>
  chain_royalty: BigMap<string, string>
}

interface Methods {
  approve_stake: (
    staker: address,
    validator_address_with_signer_and_sig: Array<{
      validator_address: string
      signer_and_signature: {
        signer: string
        signature: bytes
      }
    }>,
  ) => Promise<void>
  change_validator_status: (
    validator: address,
    status: boolean,
  ) => Promise<void>
  change_chain_royalty_receiver: (
    chain: string,
    royalty_receiver: string,
  ) => Promise<void>
  change_chain_fee: (chain: string, fee: nat) => Promise<void>
}

interface MethodsObject {
  approve_stake: (params: {
    staker: address
    validator_address_with_signer_and_sig: Array<{
      validator_address: string
      signer_and_signature: {
        signer: string
        signature: bytes
      }
    }>
  }) => Promise<void>
  change_validator_status: (params: {
    validator: address
    status: boolean
  }) => Promise<void>
  change_chain_royalty_receiver: (params: {
    chain: string
    royalty_receiver: string
  }) => Promise<void>
  change_chain_fee: (params: { chain: string, fee: nat }) => Promise<void>
}

interface contractTypes {
  methods: Methods
  methodsObject: MethodsObject
  storage: Storage
  code: { __type: 'BridgeStorageCode', protocol: string, code: object[] }
}
export type BridgeStorageContractType =
    ContractAbstractionFromContractType<contractTypes>
export type BridgeStorageWalletType =
    WalletContractAbstractionFromContractType<contractTypes>
