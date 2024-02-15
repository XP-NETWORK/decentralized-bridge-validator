import {
    ContractAbstractionFromContractType,
    WalletContractAbstractionFromContractType,
} from './type-utils';
import { address, BigMap, bytes, contract, MMap, nat } from './type-aliases';

export type Storage = {
    ledger: BigMap<
        {
            0: address;
            1: nat;
        },
        nat
    >;
    operators: BigMap<
        {
            0: address;
            1: address;
        },
        Array<nat>
    >;
    token_metadata: BigMap<
        nat,
        {
            token_id: nat;
            token_info: MMap<string, bytes>;
        }
    >;
    metadata: BigMap<string, bytes>;
    admin: address;
};

type Methods = {
    mint: (
        token_id: nat,
        token_uri: string,
        to: address,
        amt: nat,
    ) => Promise<void>;
    add_operator: (
        owner: address,
        operator: address,
        token_id: nat,
    ) => Promise<void>;
    remove_operator: (
        owner: address,
        operator: address,
        token_id: nat,
    ) => Promise<void>;
    balance_of: (
        requests: Array<{
            owner: address;
            token_id: nat;
        }>,
        callback: contract,
    ) => Promise<void>;
    transfer: (
        param: Array<{
            from_: address;
            txs: Array<{
                to_: address;
                token_id: nat;
                amount: nat;
            }>;
        }>,
    ) => Promise<void>;
};

type MethodsObject = {
    mint: (params: {
        token_id: nat;
        token_uri: string;
        to: address;
        amt: nat;
    }) => Promise<void>;
    add_operator: (params: {
        owner: address;
        operator: address;
        token_id: nat;
    }) => Promise<void>;
    remove_operator: (params: {
        owner: address;
        operator: address;
        token_id: nat;
    }) => Promise<void>;
    balance_of: (params: {
        requests: Array<{
            owner: address;
            token_id: nat;
        }>;
        callback: contract;
    }) => Promise<void>;
    transfer: (
        param: Array<{
            from_: address;
            txs: Array<{
                to_: address;
                token_id: nat;
                amount: nat;
            }>;
        }>,
    ) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: 'MultiAssetCode'; protocol: string; code: object[] };
};
export type MultiAssetContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type MultiAssetWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
