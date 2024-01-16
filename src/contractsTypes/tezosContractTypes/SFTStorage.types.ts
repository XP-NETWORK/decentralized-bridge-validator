import {
    ContractAbstractionFromContractType,
    WalletContractAbstractionFromContractType,
} from './type-utils';
import { address, nat } from './type-aliases';

export type Storage = {
    owner: address;
    collection: address;
};

type Methods = {
    unlock_token: (token_id: nat, to: address, amt: nat) => Promise<void>;
    deposit_token: (token_id: nat, amt: nat) => Promise<void>;
};

type MethodsObject = {
    unlock_token: (params: {
        token_id: nat;
        to: address;
        amt: nat;
    }) => Promise<void>;
    deposit_token: (params: { token_id: nat; amt: nat }) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: 'SFTStorageCode'; protocol: string; code: object[] };
};
export type SFTStorageContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type SFTStorageWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
