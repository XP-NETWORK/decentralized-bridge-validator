
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, MMap } from './type-aliases';

export type Storage = {
    owner: {Some: address} | null;
    collection_to_store: MMap<(
        { addr: address }
        | { str: string }
    ), address>;
};

type Methods = {
    deploy_nft: (
        collection: (
            { addr: address }
            | { str: string }
        ),
        name: string,
        symbol: string,
    ) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type MethodsObject = {
    deploy_nft: (params: {
        collection: (
            { addr: address }
            | { str: string }
        ),
        name: string,
        symbol: string,
    }) => Promise<void>;
    set_owner: (param: address) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'NFTCollectionFactoryCode', protocol: string, code: object[] } };
export type NFTCollectionFactoryContractType = ContractAbstractionFromContractType<contractTypes>;
export type NFTCollectionFactoryWalletType = WalletContractAbstractionFromContractType<contractTypes>;
