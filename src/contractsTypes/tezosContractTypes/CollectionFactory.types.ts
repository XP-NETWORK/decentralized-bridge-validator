
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, MMap } from './type-aliases';

export type Storage = {
    owner: {Some: address} | null;
    collection_to_store: MMap<address, address>;
};

type Methods = {
    deploy_sft: (param: address) => Promise<void>;
    deploy_nft: (param: address) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type MethodsObject = {
    deploy_sft: (param: address) => Promise<void>;
    deploy_nft: (param: address) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'CollectionFactoryCode', protocol: string, code: object[] } };
export type CollectionFactoryContractType = ContractAbstractionFromContractType<contractTypes>;
export type CollectionFactoryWalletType = WalletContractAbstractionFromContractType<contractTypes>;
