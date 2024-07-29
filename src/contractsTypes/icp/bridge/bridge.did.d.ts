import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ClaimData {
  'fee' : bigint,
  'source_chain' : string,
  'lock_tx_chain' : string,
  'transaction_hash' : string,
  'token_amount' : bigint,
  'destination_chain' : string,
  'token_id' : bigint,
  'source_nft_contract_address' : string,
  'metadata' : string,
  'name' : string,
  'nft_type' : string,
  'royalty' : bigint,
  'royalty_receiver' : Principal,
  'destination_user_address' : Principal,
  'symbol' : string,
}
export interface ClaimedEvent {
  'source_chain' : string,
  'lock_tx_chain' : string,
  'transaction_hash' : string,
  'token_id' : bigint,
  'nft_contract' : Principal,
}
export interface LockedEvent {
  'source_chain' : string,
  'token_amount' : bigint,
  'destination_chain' : string,
  'token_id' : bigint,
  'source_nft_contract_address' : Principal,
  'nft_type' : string,
  'destination_user_address' : string,
}
export interface SignerAndSignature { 'signature' : string, 'signer' : string }
export interface Validator { 'address' : Principal, 'pending_rewards' : bigint }
export interface XPBridge {
  'acceptCycles' : ActorMethod<[], undefined>,
  'add_validator' : ActorMethod<
    [[string, Principal], Array<SignerAndSignature>],
    undefined
  >,
  'availableCycles' : ActorMethod<[], bigint>,
  'claim_nft' : ActorMethod<[ClaimData, Array<SignerAndSignature>], string>,
  'claim_validator_rewards' : ActorMethod<
    [string, Array<SignerAndSignature>],
    undefined
  >,
  'get_claimed_data' : ActorMethod<[string], [] | [ClaimedEvent]>,
  'get_hash_from_nonce' : ActorMethod<[bigint], [] | [string]>,
  'get_locked_data' : ActorMethod<[string], [] | [LockedEvent]>,
  'get_nonce' : ActorMethod<[], bigint>,
  'get_validator' : ActorMethod<[string], [] | [Validator]>,
  'get_validator_count' : ActorMethod<[], bigint>,
  'init' : ActorMethod<[], undefined>,
  'lock_nft' : ActorMethod<[Principal, bigint, string, string], string>,
}
export interface _SERVICE extends XPBridge {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
