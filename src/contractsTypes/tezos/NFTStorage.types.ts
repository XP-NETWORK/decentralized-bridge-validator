import {
    ContractAbstractionFromContractType,
    WalletContractAbstractionFromContractType,
} from './type-utils';
import { address, nat } from './type-aliases';

export type Storage = {
    owner: address;
    collection: address;
    locked: Array<nat>;
};

type Methods = {
    unlock_token: (token_id: nat, to: address) => Promise<void>;
    add_deposited_token: (param: nat) => Promise<void>;
};

type MethodsObject = {
    unlock_token: (params: { token_id: nat; to: address }) => Promise<void>;
    add_deposited_token: (param: nat) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: 'NFTStorageCode'; protocol: string; code: object[] };
};
export type NFTStorageContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type NFTStorageWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
