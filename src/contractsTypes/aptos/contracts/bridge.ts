type TAptosMapObj<K, V> = {
  key: K;
  value: V;
};

type TCollectionNFTObj = {
  collection_address: string;
  token_id: string;
};

type TValidatorsObj = {
  key: string;
  value: {
    pending_reward: string;
  };
};

export type TBridgeData = {
  collection_objects: {
    handle: string;
  };
  duplicate_to_original_mapping: {
    handle: string;
  };
  nft_collection_tokens: {
    handle: TAptosMapObj<TCollectionNFTObj, string>[];
  };
  nft_collections_counter: {
    data: TAptosMapObj<string, string>[];
  };
  nfts_counter: string;
  original_to_duplicate_mapping: {
    handle: string;
  };
  self_chain: string;
  validators: {
    data: TValidatorsObj[];
  };
  signer_cap: {
    account: string;
  };
};
