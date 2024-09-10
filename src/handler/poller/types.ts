export interface LockEventRes {
  id: number;
  token_amount: number;
  token_id: number;
  destination_user_address: string;
  destination_chain: string;
  source_nft_contract_address: string;
  nft_type: string;
  source_chain: string;
  transaction_hash: string;
  listener_chain: string;
  metaDataUri: string;
}
