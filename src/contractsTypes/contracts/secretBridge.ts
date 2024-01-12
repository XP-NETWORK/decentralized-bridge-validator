import type BigNumber from 'bignumber.js'

export interface CodeInfo {
  code_id: number
  code_hash: string
}

export interface BridgeInstantiateType {
  validators: Array<[string, string]>
  chain_type: string
  storage_label: string
  collection_label: string
  collection721_code_info: CodeInfo
  storage721_code_info: CodeInfo
  collection1155_code_info: CodeInfo
  storage1155_code_info: CodeInfo
  collection_deployer_code_info: CodeInfo
  storage_deployer_code_info: CodeInfo
}

export interface SignerAndSignatureType {
  signer_address: string
  signature: string
}

export interface AddValidatorType {
  add_validator: {
    data: {
      validator: [string, string]
      signatures: SignerAndSignatureType[]
    }
  }
}

export interface ClaimValidatorRewardsType {
  claim_validator_rewards: {
    data: {
      validator: [string, string]
      signatures: SignerAndSignatureType[]
    }
  }
}

export interface Lock721 {
  lock721: {
    data: {
      destination_chain: string
      destination_user_address: string
      source_nft_contract_address: string
      collection_code_info: CodeInfo
      token_id: BigNumber
    }
  }
}

export interface Lock1155 {
  lock1155: {
    data: {
      destination_chain: string
      destination_user_address: string
      source_nft_contract_address: string
      collection_code_info: CodeInfo
      token_id: BigNumber
      token_amount: BigNumber
    }
  }
}

export interface ClaimData {
  token_id: BigNumber
  source_chain: string
  destination_chain: string
  destination_user_address: string
  source_nft_contract_address: string
  code_hash: string
  name: string
  symbol: string
  royalty: number
  royalty_receiver: string
  metadata: string
  transaction_hash: string
  token_amount: BigNumber
  nft_type: string
  fee: BigNumber
}

export interface ClaimMsg {
  data: ClaimData
  signatures: SignerAndSignatureType[]
}

export interface Claim721 {
  claim721: {
    data: ClaimMsg
  }
}

export interface Claim1155 {
  claim1155: {
    data: ClaimMsg
  }
}
