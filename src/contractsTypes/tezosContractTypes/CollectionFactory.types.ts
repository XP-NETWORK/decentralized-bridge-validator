import {
    ContractAbstractionFromContractType,
    WalletContractAbstractionFromContractType,
} from './type-utils';
import { address, MMap } from './type-aliases';

export type Storage = {
    owner: { Some: address } | null;
    collection_to_store: MMap<{ addr: address } | { str: string }, address>;
};

type Methods = {
    addr: (param: address) => Promise<void>;
    str: (param: string) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type MethodsObject = {
    addr: (param: address) => Promise<void>;
    str: (param: string) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: 'CollectionFactoryCode'; protocol: string; code: object[] };
};
export type CollectionFactoryContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type CollectionFactoryWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
