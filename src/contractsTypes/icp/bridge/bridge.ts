//@ts-nocheck generated code cope
export const idlFactory = ({ IDL }) => {
  const AddValidator = IDL.Record({
    'principal' : IDL.Principal,
    'public_key' : IDL.Text,
  });
  const SignerAndSignature = IDL.Record({
    'signature' : IDL.Text,
    'signer' : IDL.Text,
  });
  const BlacklistValidator = IDL.Record({
    'principal' : IDL.Principal,
    'public_key' : IDL.Text,
  });
  const ClaimData = IDL.Record({
    'fee' : IDL.Nat64,
    'source_chain' : IDL.Text,
    'lock_tx_chain' : IDL.Text,
    'transaction_hash' : IDL.Text,
    'token_amount' : IDL.Nat,
    'destination_chain' : IDL.Text,
    'token_id' : IDL.Nat,
    'source_nft_contract_address' : IDL.Text,
    'metadata' : IDL.Text,
    'name' : IDL.Text,
    'nft_type' : IDL.Text,
    'royalty' : IDL.Nat,
    'royalty_receiver' : IDL.Principal,
    'destination_user_address' : IDL.Principal,
    'symbol' : IDL.Text,
  });
  const ClaimedEvent = IDL.Record({
    'source_chain' : IDL.Text,
    'lock_tx_chain' : IDL.Text,
    'transaction_hash' : IDL.Text,
    'token_id' : IDL.Nat,
    'nft_contract' : IDL.Principal,
  });
  const LockedEvent = IDL.Record({
    'source_chain' : IDL.Text,
    'token_amount' : IDL.Nat,
    'destination_chain' : IDL.Text,
    'token_id' : IDL.Nat,
    'source_nft_contract_address' : IDL.Principal,
    'sender_address' : IDL.Text,
    'metadata_uri' : IDL.Text,
    'nft_type' : IDL.Text,
    'destination_user_address' : IDL.Text,
  });
  const Validator = IDL.Record({
    'address' : IDL.Principal,
    'pending_rewards' : IDL.Nat64,
  });
  const XPBridge = IDL.Service({
    'acceptCycles' : IDL.Func([], [], []),
    'add_validator' : IDL.Func(
        [AddValidator, IDL.Vec(SignerAndSignature)],
        [],
        [],
      ),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'blacklist_validator' : IDL.Func(
        [BlacklistValidator, IDL.Vec(SignerAndSignature)],
        [],
        [],
      ),
    'claim_nft' : IDL.Func(
        [ClaimData, IDL.Vec(SignerAndSignature)],
        [IDL.Text],
        [],
      ),
    'claim_validator_rewards' : IDL.Func(
        [IDL.Text],
        [IDL.Nat64, IDL.Nat64],
        [],
      ),
    'encode_add_validator' : IDL.Func(
        [AddValidator],
        [IDL.Vec(IDL.Nat8)],
        ['query'],
      ),
    'encode_blacklist_validator' : IDL.Func(
        [BlacklistValidator],
        [IDL.Vec(IDL.Nat8)],
        ['query'],
      ),
    'encode_claim_data' : IDL.Func([ClaimData], [IDL.Vec(IDL.Nat8)], ['query']),
    'get_blacklisted_validators' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Bool)],
        ['query'],
      ),
    'get_claim_nonce' : IDL.Func([], [IDL.Nat], ['query']),
    'get_claimed_data' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ClaimedEvent)],
        ['query'],
      ),
    'get_hash_from_claim_nonce' : IDL.Func(
        [IDL.Nat],
        [IDL.Opt(IDL.Text)],
        ['query'],
      ),
    'get_hash_from_nonce' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Text)], ['query']),
    'get_locked_data' : IDL.Func([IDL.Text], [IDL.Opt(LockedEvent)], ['query']),
    'get_nonce' : IDL.Func([], [IDL.Nat], ['query']),
    'get_validator' : IDL.Func([IDL.Text], [IDL.Opt(Validator)], ['query']),
    'get_validator_count' : IDL.Func([], [IDL.Nat], ['query']),
    'init' : IDL.Func([], [], []),
    'lock_nft' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
  });
  return XPBridge;
};
export const init = ({ IDL }) => {
  return [
    IDL.Record({
      'storage_deployer' : IDL.Principal,
      'collection_deployer' : IDL.Principal,
      'chain_type' : IDL.Text,
      'validators' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal)),
    }),
  ];
};
