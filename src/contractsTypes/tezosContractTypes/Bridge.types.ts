import {
    ContractAbstractionFromContractType,
    WalletContractAbstractionFromContractType,
} from './type-utils';
import {
    address,
    BigMap,
    bytes,
    key,
    mutez,
    nat,
    signature,
} from './type-aliases';

export type Storage = {
    validators: BigMap<address, mutez>;
    unique_identifiers: BigMap<bytes, boolean>;
    collection_deployer: address;
    storage_deployer: address;
    original_to_duplicate_mapping: BigMap<
        {
            0: { addr: address } | { str: string };
            1: string;
        },
        {
            chain: string;
            contract: { addr: address } | { str: string };
        }
    >;
    duplicate_to_original_mapping: BigMap<
        {
            0: { addr: address } | { str: string };
            1: string;
        },
        {
            chain: string;
            contract: { addr: address } | { str: string };
        }
    >;
    original_storage_mapping_nft: BigMap<
        {
            0: { addr: address } | { str: string };
            1: string;
        },
        address
    >;
    original_storage_mapping_sft: BigMap<
        {
            0: { addr: address } | { str: string };
            1: string;
        },
        address
    >;
    duplicate_storage_mapping_nft: BigMap<
        {
            0: { addr: address } | { str: string };
            1: string;
        },
        address
    >;
    duplicate_storage_mapping_sft: BigMap<
        {
            0: { addr: address } | { str: string };
            1: string;
        },
        address
    >;
    validators_count: nat;
};

type Methods = {
    claim_nft: (
        token_id: nat,
        source_chain: string,
        dest_chain: string,
        dest_address: address,
        source_nft_contract_address: { addr: address } | { str: string },
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
            signer: key;
            sig: signature;
            addr: address;
        }>,
    ) => Promise<void>;
    internal_ns_nd_part: (
        token_id: nat,
        dest_chain: string,
        dest_address: address,
        collection: { addr: address } | { str: string },
        token_amount: nat,
        source_chain: string,
        md: string,
        transaction_hash: string,
    ) => Promise<void>;
    lock_sft: (
        token_id: nat,
        dest_chain: string,
        dest_address: string,
        source_nft_address: { addr: address } | { str: string },
        token_amount: nat,
    ) => Promise<void>;
    lock_internal: (
        to: string,
        token_id: nat,
        collection: { addr: address } | { str: string },
        original: boolean,
        amt: nat,
        new_deploy: boolean,
        dest_chain: string,
    ) => Promise<void>;
    lock_nft: (
        token_id: nat,
        dest_chain: string,
        dest_address: string,
        source_nft_address: { addr: address } | { str: string },
    ) => Promise<void>;
    claim_validator_rewards: (
        validator: address,
        sigs: Array<{
            signer: key;
            sig: signature;
            addr: address;
        }>,
    ) => Promise<void>;
    add_validator: (
        validator: address,
        sigs: Array<{
            signer: key;
            sig: signature;
            addr: address;
        }>,
    ) => Promise<void>;
};

type MethodsObject = {
    claim_nft: (params: {
        token_id: nat;
        source_chain: string;
        dest_chain: string;
        dest_address: address;
        source_nft_contract_address: { addr: address } | { str: string };
        name: string;
        symbol: string;
        royalty: nat;
        royalty_receiver: address;
        metadata: string;
        transaction_hash: string;
        token_amount: nat;
        nft_type: string;
        fee: mutez;
        sigs: Array<{
            signer: key;
            sig: signature;
            addr: address;
        }>;
    }) => Promise<void>;
    internal_ns_nd_part: (params: {
        token_id: nat;
        dest_chain: string;
        dest_address: address;
        collection: { addr: address } | { str: string };
        token_amount: nat;
        source_chain: string;
        md: string;
        transaction_hash: string;
    }) => Promise<void>;
    lock_sft: (params: {
        token_id: nat;
        dest_chain: string;
        dest_address: string;
        source_nft_address: { addr: address } | { str: string };
        token_amount: nat;
    }) => Promise<void>;
    lock_internal: (params: {
        to: string;
        token_id: nat;
        collection: { addr: address } | { str: string };
        original: boolean;
        amt: nat;
        new_deploy: boolean;
        dest_chain: string;
    }) => Promise<void>;
    lock_nft: (params: {
        token_id: nat;
        dest_chain: string;
        dest_address: string;
        source_nft_address: { addr: address } | { str: string };
    }) => Promise<void>;
    claim_validator_rewards: (params: {
        validator: address;
        sigs: Array<{
            signer: key;
            sig: signature;
            addr: address;
        }>;
    }) => Promise<void>;
    add_validator: (params: {
        validator: address;
        sigs: Array<{
            signer: key;
            sig: signature;
            addr: address;
        }>;
    }) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: 'BridgeCode'; protocol: string; code: object[] };
};
export type BridgeContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type BridgeWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
