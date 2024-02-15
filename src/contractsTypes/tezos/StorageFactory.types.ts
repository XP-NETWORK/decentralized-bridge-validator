import {
    ContractAbstractionFromContractType,
    WalletContractAbstractionFromContractType,
} from './type-utils';
import { address, MMap } from './type-aliases';

export type Storage = {
    owner: { Some: address } | null;
    collection_to_store: MMap<address, address>;
};

type Methods = {
    deploy_sft_storage: (param: address) => Promise<void>;
    deploy_nft_storage: (param: address) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type MethodsObject = {
    deploy_sft_storage: (param: address) => Promise<void>;
    deploy_nft_storage: (param: address) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type contractTypes = {
    methods: Methods;
    methodsObject: MethodsObject;
    storage: Storage;
    code: { __type: 'StorageFactoryCode'; protocol: string; code: object[] };
};
export type StorageFactoryContractType =
    ContractAbstractionFromContractType<contractTypes>;
export type StorageFactoryWalletType =
    WalletContractAbstractionFromContractType<contractTypes>;
