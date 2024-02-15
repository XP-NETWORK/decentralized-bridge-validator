export type CodeInfo = {
    code_id: number;
    code_hash: string;
};

export type BridgeInstantiateType = {
    validators: Array<[string, string]>;
    chain_type: string;
    storage_label: string;
    collection_label: string;
    collection721_code_info: CodeInfo;
    storage721_code_info: CodeInfo;
    collection1155_code_info: CodeInfo;
    storage1155_code_info: CodeInfo;
    collection_deployer_code_info: CodeInfo;
    storage_deployer_code_info: CodeInfo;
};

export type SignerAndSignatureType = {
    signer_address: string;
    signature: string;
};

export type AddValidatorType = {
    add_validator: {
        data: {
            validator: [string, string];
            signatures: Array<SignerAndSignatureType>;
        };
    };
};

export type ClaimValidatorRewardsType = {
    claim_validator_rewards: {
        data: {
            validator: [string, string];
            signatures: Array<SignerAndSignatureType>;
        };
    };
};

export type Lock721 = {
    lock721: {
        data: {
            destination_chain: string;
            destination_user_address: string;
            source_nft_contract_address: string;
            collection_code_info: CodeInfo;
            token_id: string;
        };
    };
};

export type Lock1155 = {
    lock1155: {
        data: {
            destination_chain: string;
            destination_user_address: string;
            source_nft_contract_address: string;
            collection_code_info: CodeInfo;
            token_id: string;
            token_amount: string;
        };
    };
};

export type ClaimData = {
    token_id: string;
    source_chain: string;
    destination_chain: string;
    destination_user_address: string;
    source_nft_contract_address: string;
    code_hash: string;
    name: string;
    symbol: string;
    royalty: number;
    royalty_receiver: string;
    metadata: string;
    transaction_hash: string;
    token_amount: string;
    nft_type: string;
    fee: string;
};

export type ClaimMsg = {
    data: ClaimData;
    signatures: Array<SignerAndSignatureType>;
};

export type Claim721 = {
    claim721: {
        data: ClaimMsg;
    };
};

export type Claim1155 = {
    claim1155: {
        data: ClaimMsg;
    };
};
