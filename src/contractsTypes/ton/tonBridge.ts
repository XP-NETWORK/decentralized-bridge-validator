import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue,
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
};

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
};

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounced = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef();
    return {
        $$type: 'Context' as const,
        bounced: _bounced,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _bounce = sc_0.loadBit();
    const _to = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return {
        $$type: 'SendParameters' as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
};

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return {
        $$type: 'FactoryDeploy' as const,
        queryId: _queryId,
        cashback: _cashback,
    };
}

export type DeployNFT721Storage = {
    $$type: 'DeployNFT721Storage';
    collectionAddress: Address;
    isOriginal: boolean;
    key: bigint;
    tokenId: bigint;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddressLock: Cell;
    sourceChain: string;
};

export function storeDeployNFT721Storage(src: DeployNFT721Storage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1900501884, 32);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeBit(src.isOriginal);
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeStringRefTail(src.destinationUserAddress);
        b_0.storeRef(src.sourceNftContractAddressLock);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.sourceChain);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployNFT721Storage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1900501884) {
        throw Error('Invalid prefix');
    }
    const _collectionAddress = sc_0.loadAddress();
    const _isOriginal = sc_0.loadBit();
    const _key = sc_0.loadIntBig(257);
    const _tokenId = sc_0.loadIntBig(257);
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadStringRefTail();
    const _sourceNftContractAddressLock = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _sourceChain = sc_1.loadStringRefTail();
    return {
        $$type: 'DeployNFT721Storage' as const,
        collectionAddress: _collectionAddress,
        isOriginal: _isOriginal,
        key: _key,
        tokenId: _tokenId,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        sourceNftContractAddressLock: _sourceNftContractAddressLock,
        sourceChain: _sourceChain,
    };
}

export type DeployNFT721Collection = {
    $$type: 'DeployNFT721Collection';
    collection_content: Cell;
    royalty_params: RoyaltyParams;
    destination_user_address: Address;
    source_chain: string;
    transaction_hash: string;
};

export function storeDeployNFT721Collection(src: DeployNFT721Collection) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4012005997, 32);
        b_0.storeRef(src.collection_content);
        b_0.store(storeRoyaltyParams(src.royalty_params));
        const b_1 = new Builder();
        b_1.storeAddress(src.destination_user_address);
        b_1.storeStringRefTail(src.source_chain);
        b_1.storeStringRefTail(src.transaction_hash);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployNFT721Collection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4012005997) {
        throw Error('Invalid prefix');
    }
    const _collection_content = sc_0.loadRef();
    const _royalty_params = loadRoyaltyParams(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _destination_user_address = sc_1.loadAddress();
    const _source_chain = sc_1.loadStringRefTail();
    const _transaction_hash = sc_1.loadStringRefTail();
    return {
        $$type: 'DeployNFT721Collection' as const,
        collection_content: _collection_content,
        royalty_params: _royalty_params,
        destination_user_address: _destination_user_address,
        source_chain: _source_chain,
        transaction_hash: _transaction_hash,
    };
}

export type CreatedCollection = {
    $$type: 'CreatedCollection';
    collectionAddress: Address;
};

export function storeCreatedCollection(src: CreatedCollection) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(41705028, 32);
        b_0.storeAddress(src.collectionAddress);
    };
}

export function loadCreatedCollection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 41705028) {
        throw Error('Invalid prefix');
    }
    const _collectionAddress = sc_0.loadAddress();
    return {
        $$type: 'CreatedCollection' as const,
        collectionAddress: _collectionAddress,
    };
}

export type UnlockToken = {
    $$type: 'UnlockToken';
    to: Address;
};

export function storeUnlockToken(src: UnlockToken) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(411326794, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadUnlockToken(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 411326794) {
        throw Error('Invalid prefix');
    }
    const _to = sc_0.loadAddress();
    return { $$type: 'UnlockToken' as const, to: _to };
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
};

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
};

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _numerator = sc_0.loadUintBig(16);
    const _denominator = sc_0.loadUintBig(16);
    const _destination = sc_0.loadAddress();
    return {
        $$type: 'ReportRoyaltyParams' as const,
        query_id: _query_id,
        numerator: _numerator,
        denominator: _denominator,
        destination: _destination,
    };
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    const sc_0 = slice;
    const _next_item_index = sc_0.loadIntBig(257);
    const _collection_content = sc_0.loadRef();
    const _owner_address = sc_0.loadAddress();
    return {
        $$type: 'CollectionData' as const,
        next_item_index: _next_item_index,
        collection_content: _collection_content,
        owner_address: _owner_address,
    };
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
};

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    const _numerator = sc_0.loadIntBig(257);
    const _denominator = sc_0.loadIntBig(257);
    const _destination = sc_0.loadAddress();
    return {
        $$type: 'RoyaltyParams' as const,
        numerator: _numerator,
        denominator: _denominator,
        destination: _destination,
    };
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
};

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _new_owner = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    const _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forward_amount = sc_0.loadCoins();
    const _forward_payload = sc_0.asCell();
    return {
        $$type: 'Transfer' as const,
        query_id: _query_id,
        new_owner: _new_owner,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_amount: _forward_amount,
        forward_payload: _forward_payload,
    };
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
};

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _prev_owner = sc_0.loadAddress();
    const _forward_payload = sc_0.asCell();
    return {
        $$type: 'OwnershipAssigned' as const,
        query_id: _query_id,
        prev_owner: _prev_owner,
        forward_payload: _forward_payload,
    };
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
};

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
};

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
};

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _index_id = sc_0.loadIntBig(257);
    const _collection = sc_0.loadAddress();
    return {
        $$type: 'ReportStaticData' as const,
        query_id: _query_id,
        index_id: _index_id,
        collection: _collection,
    };
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
};

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    const sc_0 = slice;
    const _is_initialized = sc_0.loadBit();
    const _index = sc_0.loadIntBig(257);
    const _collection_address = sc_0.loadAddress();
    const _owner_address = sc_0.loadAddress();
    const _individual_content = sc_0.loadRef();
    return {
        $$type: 'GetNftData' as const,
        is_initialized: _is_initialized,
        index: _index,
        collection_address: _collection_address,
        owner_address: _owner_address,
        individual_content: _individual_content,
    };
}

export type HiFromDeployNFT721Storage = {
    $$type: 'HiFromDeployNFT721Storage';
    sourceNftContractAddress: Address;
    storageAddress: Address;
    isOriginal: boolean;
    key: bigint;
    tokenId: bigint;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddressLock: Cell;
    sourceChain: string;
};

export function storeHiFromDeployNFT721Storage(src: HiFromDeployNFT721Storage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1515353638, 32);
        b_0.storeAddress(src.sourceNftContractAddress);
        b_0.storeAddress(src.storageAddress);
        b_0.storeBit(src.isOriginal);
        b_0.storeInt(src.key, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.tokenId, 257);
        b_1.storeStringRefTail(src.destinationChain);
        b_1.storeStringRefTail(src.destinationUserAddress);
        b_1.storeRef(src.sourceNftContractAddressLock);
        const b_2 = new Builder();
        b_2.storeStringRefTail(src.sourceChain);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadHiFromDeployNFT721Storage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1515353638) {
        throw Error('Invalid prefix');
    }
    const _sourceNftContractAddress = sc_0.loadAddress();
    const _storageAddress = sc_0.loadAddress();
    const _isOriginal = sc_0.loadBit();
    const _key = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _tokenId = sc_1.loadIntBig(257);
    const _destinationChain = sc_1.loadStringRefTail();
    const _destinationUserAddress = sc_1.loadStringRefTail();
    const _sourceNftContractAddressLock = sc_1.loadRef();
    const sc_2 = sc_1.loadRef().beginParse();
    const _sourceChain = sc_2.loadStringRefTail();
    return {
        $$type: 'HiFromDeployNFT721Storage' as const,
        sourceNftContractAddress: _sourceNftContractAddress,
        storageAddress: _storageAddress,
        isOriginal: _isOriginal,
        key: _key,
        tokenId: _tokenId,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        sourceNftContractAddressLock: _sourceNftContractAddressLock,
        sourceChain: _sourceChain,
    };
}

export type HiFromDeployNFT721Collection = {
    $$type: 'HiFromDeployNFT721Collection';
    sourceChain: string;
    transactionHash: string;
};

export function storeHiFromDeployNFT721Collection(
    src: HiFromDeployNFT721Collection,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1062806393, 32);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.transactionHash);
    };
}

export function loadHiFromDeployNFT721Collection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1062806393) {
        throw Error('Invalid prefix');
    }
    const _sourceChain = sc_0.loadStringRefTail();
    const _transactionHash = sc_0.loadStringRefTail();
    return {
        $$type: 'HiFromDeployNFT721Collection' as const,
        sourceChain: _sourceChain,
        transactionHash: _transactionHash,
    };
}

export type CollectionDeploy = {
    $$type: 'CollectionDeploy';
    newOwner: Address;
};

export function storeCollectionDeploy(src: CollectionDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2783573850, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadCollectionDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2783573850) {
        throw Error('Invalid prefix');
    }
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'CollectionDeploy' as const, newOwner: _newOwner };
}

export type StorageDeploy = {
    $$type: 'StorageDeploy';
    sourceNftContractAddress: Address;
    isOriginal: boolean;
    key: bigint;
    tokenId: bigint;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddressLock: Cell;
    sourceChain: string;
};

export function storeStorageDeploy(src: StorageDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2356437903, 32);
        b_0.storeAddress(src.sourceNftContractAddress);
        b_0.storeBit(src.isOriginal);
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeStringRefTail(src.destinationUserAddress);
        b_0.storeRef(src.sourceNftContractAddressLock);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.sourceChain);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStorageDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2356437903) {
        throw Error('Invalid prefix');
    }
    const _sourceNftContractAddress = sc_0.loadAddress();
    const _isOriginal = sc_0.loadBit();
    const _key = sc_0.loadIntBig(257);
    const _tokenId = sc_0.loadIntBig(257);
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadStringRefTail();
    const _sourceNftContractAddressLock = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _sourceChain = sc_1.loadStringRefTail();
    return {
        $$type: 'StorageDeploy' as const,
        sourceNftContractAddress: _sourceNftContractAddress,
        isOriginal: _isOriginal,
        key: _key,
        tokenId: _tokenId,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        sourceNftContractAddressLock: _sourceNftContractAddressLock,
        sourceChain: _sourceChain,
    };
}

export type Validator = {
    $$type: 'Validator';
    address: Address;
    added: boolean;
    pendingRewards: bigint;
};

export function storeValidator(src: Validator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeBit(src.added);
        b_0.storeCoins(src.pendingRewards);
    };
}

export function loadValidator(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadAddress();
    const _added = sc_0.loadBit();
    const _pendingRewards = sc_0.loadCoins();
    return {
        $$type: 'Validator' as const,
        address: _address,
        added: _added,
        pendingRewards: _pendingRewards,
    };
}

function loadTupleValidator(source: TupleReader) {
    const _address = source.readAddress();
    const _added = source.readBoolean();
    const _pendingRewards = source.readBigNumber();
    return {
        $$type: 'Validator' as const,
        address: _address,
        added: _added,
        pendingRewards: _pendingRewards,
    };
}

export type SignerAndSignature = {
    $$type: 'SignerAndSignature';
    signature: Cell;
    key: bigint;
};

export function storeSignerAndSignature(src: SignerAndSignature) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.signature);
        b_0.storeUint(src.key, 256);
    };
}

export function loadSignerAndSignature(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadRef();
    const _key = sc_0.loadUintBig(256);
    return {
        $$type: 'SignerAndSignature' as const,
        signature: _signature,
        key: _key,
    };
}

function dictValueParserSignerAndSignature(): DictionaryValue<SignerAndSignature> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(
                beginCell().store(storeSignerAndSignature(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSignerAndSignature(src.loadRef().beginParse());
        },
    };
}

export type NewValidator = {
    $$type: 'NewValidator';
    key: bigint;
};

export function storeNewValidator(src: NewValidator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.key, 256);
    };
}

export function loadNewValidator(slice: Slice) {
    const sc_0 = slice;
    const _key = sc_0.loadUintBig(256);
    return { $$type: 'NewValidator' as const, key: _key };
}

export type ValidatorsToRewards = {
    $$type: 'ValidatorsToRewards';
    addresses: Dictionary<bigint, Address>;
    publicKeys: Dictionary<bigint, bigint>;
    len: bigint;
};

export function storeValidatorsToRewards(src: ValidatorsToRewards) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(
            src.addresses,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Address(),
        );
        b_0.storeDict(
            src.publicKeys,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257),
        );
        b_0.storeInt(src.len, 257);
    };
}

export function loadValidatorsToRewards(slice: Slice) {
    const sc_0 = slice;
    const _addresses = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Address(),
        sc_0,
    );
    const _publicKeys = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        sc_0,
    );
    const _len = sc_0.loadIntBig(257);
    return {
        $$type: 'ValidatorsToRewards' as const,
        addresses: _addresses,
        publicKeys: _publicKeys,
        len: _len,
    };
}

export type DuplicateToOriginalContractInfo = {
    $$type: 'DuplicateToOriginalContractInfo';
    keyChain: string;
    chain: string;
    contractAddress: Cell;
    lastIndex: bigint;
    collectionContent: Cell;
};

export function storeDuplicateToOriginalContractInfo(
    src: DuplicateToOriginalContractInfo,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.keyChain);
        b_0.storeStringRefTail(src.chain);
        b_0.storeRef(src.contractAddress);
        b_0.storeInt(src.lastIndex, 257);
        const b_1 = new Builder();
        b_1.storeRef(src.collectionContent);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDuplicateToOriginalContractInfo(slice: Slice) {
    const sc_0 = slice;
    const _keyChain = sc_0.loadStringRefTail();
    const _chain = sc_0.loadStringRefTail();
    const _contractAddress = sc_0.loadRef();
    const _lastIndex = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _collectionContent = sc_1.loadRef();
    return {
        $$type: 'DuplicateToOriginalContractInfo' as const,
        keyChain: _keyChain,
        chain: _chain,
        contractAddress: _contractAddress,
        lastIndex: _lastIndex,
        collectionContent: _collectionContent,
    };
}

function loadTupleDuplicateToOriginalContractInfo(source: TupleReader) {
    const _keyChain = source.readString();
    const _chain = source.readString();
    const _contractAddress = source.readCell();
    const _lastIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    return {
        $$type: 'DuplicateToOriginalContractInfo' as const,
        keyChain: _keyChain,
        chain: _chain,
        contractAddress: _contractAddress,
        lastIndex: _lastIndex,
        collectionContent: _collectionContent,
    };
}

export type OriginalToDuplicateContractInfo = {
    $$type: 'OriginalToDuplicateContractInfo';
    keyChain: string;
    chain: string;
    contractAddress: Address;
    lastIndex: bigint;
    collectionContent: Cell;
};

export function storeOriginalToDuplicateContractInfo(
    src: OriginalToDuplicateContractInfo,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.keyChain);
        b_0.storeStringRefTail(src.chain);
        b_0.storeAddress(src.contractAddress);
        b_0.storeInt(src.lastIndex, 257);
        b_0.storeRef(src.collectionContent);
    };
}

export function loadOriginalToDuplicateContractInfo(slice: Slice) {
    const sc_0 = slice;
    const _keyChain = sc_0.loadStringRefTail();
    const _chain = sc_0.loadStringRefTail();
    const _contractAddress = sc_0.loadAddress();
    const _lastIndex = sc_0.loadIntBig(257);
    const _collectionContent = sc_0.loadRef();
    return {
        $$type: 'OriginalToDuplicateContractInfo' as const,
        keyChain: _keyChain,
        chain: _chain,
        contractAddress: _contractAddress,
        lastIndex: _lastIndex,
        collectionContent: _collectionContent,
    };
}

function loadTupleOriginalToDuplicateContractInfo(source: TupleReader) {
    const _keyChain = source.readString();
    const _chain = source.readString();
    const _contractAddress = source.readAddress();
    const _lastIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    return {
        $$type: 'OriginalToDuplicateContractInfo' as const,
        keyChain: _keyChain,
        chain: _chain,
        contractAddress: _contractAddress,
        lastIndex: _lastIndex,
        collectionContent: _collectionContent,
    };
}

export type ClaimData1 = {
    $$type: 'ClaimData1';
    tokenId: bigint;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: Address;
    tokenAmount: bigint;
};

export function storeClaimData1(src: ClaimData1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.tokenId, 64);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeAddress(src.destinationUserAddress);
        b_0.storeUint(src.tokenAmount, 64);
    };
}

export function loadClaimData1(slice: Slice) {
    const sc_0 = slice;
    const _tokenId = sc_0.loadUintBig(64);
    const _sourceChain = sc_0.loadStringRefTail();
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadAddress();
    const _tokenAmount = sc_0.loadUintBig(64);
    return {
        $$type: 'ClaimData1' as const,
        tokenId: _tokenId,
        sourceChain: _sourceChain,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        tokenAmount: _tokenAmount,
    };
}

export type ClaimData2 = {
    $$type: 'ClaimData2';
    name: string;
    symbol: string;
    nftType: string;
};

export function storeClaimData2(src: ClaimData2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.symbol);
        b_0.storeStringRefTail(src.nftType);
    };
}

export function loadClaimData2(slice: Slice) {
    const sc_0 = slice;
    const _name = sc_0.loadStringRefTail();
    const _symbol = sc_0.loadStringRefTail();
    const _nftType = sc_0.loadStringRefTail();
    return {
        $$type: 'ClaimData2' as const,
        name: _name,
        symbol: _symbol,
        nftType: _nftType,
    };
}

export type ClaimData3 = {
    $$type: 'ClaimData3';
    fee: bigint;
    sourceNftContractAddress: Cell;
    royaltyReceiver: Address;
    metadata: string;
};

export function storeClaimData3(src: ClaimData3) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.fee, 64);
        b_0.storeRef(src.sourceNftContractAddress);
        b_0.storeAddress(src.royaltyReceiver);
        b_0.storeStringRefTail(src.metadata);
    };
}

export function loadClaimData3(slice: Slice) {
    const sc_0 = slice;
    const _fee = sc_0.loadUintBig(64);
    const _sourceNftContractAddress = sc_0.loadRef();
    const _royaltyReceiver = sc_0.loadAddress();
    const _metadata = sc_0.loadStringRefTail();
    return {
        $$type: 'ClaimData3' as const,
        fee: _fee,
        sourceNftContractAddress: _sourceNftContractAddress,
        royaltyReceiver: _royaltyReceiver,
        metadata: _metadata,
    };
}

export type ClaimData4 = {
    $$type: 'ClaimData4';
    newContent: Cell;
    transactionHash: string;
    royalty: RoyaltyParams;
};

export function storeClaimData4(src: ClaimData4) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.newContent);
        b_0.storeStringRefTail(src.transactionHash);
        b_0.store(storeRoyaltyParams(src.royalty));
    };
}

export function loadClaimData4(slice: Slice) {
    const sc_0 = slice;
    const _newContent = sc_0.loadRef();
    const _transactionHash = sc_0.loadStringRefTail();
    const _royalty = loadRoyaltyParams(sc_0);
    return {
        $$type: 'ClaimData4' as const,
        newContent: _newContent,
        transactionHash: _transactionHash,
        royalty: _royalty,
    };
}

export type ClaimData = {
    $$type: 'ClaimData';
    data1: ClaimData1;
    data2: ClaimData2;
    data3: ClaimData3;
    data4: ClaimData4;
};

export function storeClaimData(src: ClaimData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeClaimData1(src.data1));
        const b_1 = new Builder();
        b_1.store(storeClaimData2(src.data2));
        const b_2 = new Builder();
        b_2.store(storeClaimData3(src.data3));
        const b_3 = new Builder();
        b_3.store(storeClaimData4(src.data4));
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadClaimData(slice: Slice) {
    const sc_0 = slice;
    const _data1 = loadClaimData1(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _data2 = loadClaimData2(sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _data3 = loadClaimData3(sc_2);
    const sc_3 = sc_2.loadRef().beginParse();
    const _data4 = loadClaimData4(sc_3);
    return {
        $$type: 'ClaimData' as const,
        data1: _data1,
        data2: _data2,
        data3: _data3,
        data4: _data4,
    };
}

export type Token = {
    $$type: 'Token';
    tokenId: bigint;
    chain: string;
    contractAddress: Cell;
};

export function storeToken(src: Token) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.tokenId, 257);
        b_0.storeStringRefTail(src.chain);
        b_0.storeRef(src.contractAddress);
    };
}

export function loadToken(slice: Slice) {
    const sc_0 = slice;
    const _tokenId = sc_0.loadIntBig(257);
    const _chain = sc_0.loadStringRefTail();
    const _contractAddress = sc_0.loadRef();
    return {
        $$type: 'Token' as const,
        tokenId: _tokenId,
        chain: _chain,
        contractAddress: _contractAddress,
    };
}

function loadTupleToken(source: TupleReader) {
    const _tokenId = source.readBigNumber();
    const _chain = source.readString();
    const _contractAddress = source.readCell();
    return {
        $$type: 'Token' as const,
        tokenId: _tokenId,
        chain: _chain,
        contractAddress: _contractAddress,
    };
}

export type AddValidator = {
    $$type: 'AddValidator';
    newValidatorPublicKey: NewValidator;
    newValidatorAddress: Address;
    sigs: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
};

export function storeAddValidator(src: AddValidator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3868963206, 32);
        b_0.store(storeNewValidator(src.newValidatorPublicKey));
        b_0.storeAddress(src.newValidatorAddress);
        b_0.storeDict(
            src.sigs,
            Dictionary.Keys.BigInt(257),
            dictValueParserSignerAndSignature(),
        );
        b_0.storeUint(src.len, 256);
    };
}

export function loadAddValidator(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3868963206) {
        throw Error('Invalid prefix');
    }
    const _newValidatorPublicKey = loadNewValidator(sc_0);
    const _newValidatorAddress = sc_0.loadAddress();
    const _sigs = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        dictValueParserSignerAndSignature(),
        sc_0,
    );
    const _len = sc_0.loadUintBig(256);
    return {
        $$type: 'AddValidator' as const,
        newValidatorPublicKey: _newValidatorPublicKey,
        newValidatorAddress: _newValidatorAddress,
        sigs: _sigs,
        len: _len,
    };
}

export type RewardValidator = {
    $$type: 'RewardValidator';
    validator: NewValidator;
    sigs: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
};

export function storeRewardValidator(src: RewardValidator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3816415473, 32);
        b_0.store(storeNewValidator(src.validator));
        b_0.storeDict(
            src.sigs,
            Dictionary.Keys.BigInt(257),
            dictValueParserSignerAndSignature(),
        );
        b_0.storeUint(src.len, 256);
    };
}

export function loadRewardValidator(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3816415473) {
        throw Error('Invalid prefix');
    }
    const _validator = loadNewValidator(sc_0);
    const _sigs = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        dictValueParserSignerAndSignature(),
        sc_0,
    );
    const _len = sc_0.loadUintBig(256);
    return {
        $$type: 'RewardValidator' as const,
        validator: _validator,
        sigs: _sigs,
        len: _len,
    };
}

export type Lock721 = {
    $$type: 'Lock721';
    tokenId: bigint;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddress: Address;
};

export function storeLock721(src: Lock721) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1748230570, 32);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeStringRefTail(src.destinationUserAddress);
        b_0.storeAddress(src.sourceNftContractAddress);
    };
}

export function loadLock721(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1748230570) {
        throw Error('Invalid prefix');
    }
    const _tokenId = sc_0.loadUintBig(256);
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadStringRefTail();
    const _sourceNftContractAddress = sc_0.loadAddress();
    return {
        $$type: 'Lock721' as const,
        tokenId: _tokenId,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        sourceNftContractAddress: _sourceNftContractAddress,
    };
}

export type ClaimNFT721 = {
    $$type: 'ClaimNFT721';
    data: ClaimData;
    signatures: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
};

export function storeClaimNFT721(src: ClaimNFT721) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1653459629, 32);
        b_0.store(storeClaimData(src.data));
        b_0.storeDict(
            src.signatures,
            Dictionary.Keys.BigInt(257),
            dictValueParserSignerAndSignature(),
        );
        b_0.storeUint(src.len, 256);
    };
}

export function loadClaimNFT721(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1653459629) {
        throw Error('Invalid prefix');
    }
    const _data = loadClaimData(sc_0);
    const _signatures = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        dictValueParserSignerAndSignature(),
        sc_0,
    );
    const _len = sc_0.loadUintBig(256);
    return {
        $$type: 'ClaimNFT721' as const,
        data: _data,
        signatures: _signatures,
        len: _len,
    };
}

export type StakeEvent = {
    $$type: 'StakeEvent';
    amount: bigint;
    asd: string;
};

export function storeStakeEvent(src: StakeEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1284335502, 32);
        b_0.storeCoins(src.amount);
        b_0.storeStringRefTail(src.asd);
    };
}

export function loadStakeEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1284335502) {
        throw Error('Invalid prefix');
    }
    const _amount = sc_0.loadCoins();
    const _asd = sc_0.loadStringRefTail();
    return { $$type: 'StakeEvent' as const, amount: _amount, asd: _asd };
}

export type AddNewValidatorEvent = {
    $$type: 'AddNewValidatorEvent';
    validator: bigint;
};

export function storeAddNewValidatorEvent(src: AddNewValidatorEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3100755976, 32);
        b_0.storeUint(src.validator, 256);
    };
}

export function loadAddNewValidatorEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3100755976) {
        throw Error('Invalid prefix');
    }
    const _validator = sc_0.loadUintBig(256);
    return { $$type: 'AddNewValidatorEvent' as const, validator: _validator };
}

export type RewardValidatorEvent = {
    $$type: 'RewardValidatorEvent';
    validator: bigint;
};

export function storeRewardValidatorEvent(src: RewardValidatorEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2049240067, 32);
        b_0.storeUint(src.validator, 256);
    };
}

export function loadRewardValidatorEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2049240067) {
        throw Error('Invalid prefix');
    }
    const _validator = sc_0.loadUintBig(256);
    return { $$type: 'RewardValidatorEvent' as const, validator: _validator };
}

export type LockedEvent = {
    $$type: 'LockedEvent';
    tokenId: bigint;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddress: Cell;
    tokenAmount: bigint;
    nftType: string;
    sourceChain: string;
};

export function storeLockedEvent(src: LockedEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3571773646, 32);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeStringRefTail(src.destinationUserAddress);
        b_0.storeRef(src.sourceNftContractAddress);
        b_0.storeUint(src.tokenAmount, 256);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.nftType);
        b_1.storeStringRefTail(src.sourceChain);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLockedEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3571773646) {
        throw Error('Invalid prefix');
    }
    const _tokenId = sc_0.loadUintBig(256);
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadStringRefTail();
    const _sourceNftContractAddress = sc_0.loadRef();
    const _tokenAmount = sc_0.loadUintBig(256);
    const sc_1 = sc_0.loadRef().beginParse();
    const _nftType = sc_1.loadStringRefTail();
    const _sourceChain = sc_1.loadStringRefTail();
    return {
        $$type: 'LockedEvent' as const,
        tokenId: _tokenId,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        sourceNftContractAddress: _sourceNftContractAddress,
        tokenAmount: _tokenAmount,
        nftType: _nftType,
        sourceChain: _sourceChain,
    };
}

export type UnLock721Event = {
    $$type: 'UnLock721Event';
    to: Address;
    tokenId: bigint;
    contractAddress: Address;
};

export function storeUnLock721Event(src: UnLock721Event) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2428616504, 32);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeAddress(src.contractAddress);
    };
}

export function loadUnLock721Event(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2428616504) {
        throw Error('Invalid prefix');
    }
    const _to = sc_0.loadAddress();
    const _tokenId = sc_0.loadUintBig(256);
    const _contractAddress = sc_0.loadAddress();
    return {
        $$type: 'UnLock721Event' as const,
        to: _to,
        tokenId: _tokenId,
        contractAddress: _contractAddress,
    };
}

export type ClaimedEvent = {
    $$type: 'ClaimedEvent';
    sourceChain: string;
    transactionHash: string;
};

export function storeClaimedEvent(src: ClaimedEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1639470925, 32);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.transactionHash);
    };
}

export function loadClaimedEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1639470925) {
        throw Error('Invalid prefix');
    }
    const _sourceChain = sc_0.loadStringRefTail();
    const _transactionHash = sc_0.loadStringRefTail();
    return {
        $$type: 'ClaimedEvent' as const,
        sourceChain: _sourceChain,
        transactionHash: _transactionHash,
    };
}

type Bridge_init_args = {
    $$type: 'Bridge_init_args';
    validatorPublicKey: bigint;
    validatorAddress: Address;
    chainType: string;
};

function initBridge_init_args(src: Bridge_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.validatorPublicKey, 257);
        b_0.storeAddress(src.validatorAddress);
        b_0.storeStringRefTail(src.chainType);
    };
}

async function Bridge_init(
    validatorPublicKey: bigint,
    validatorAddress: Address,
    chainType: string,
) {
    const __code = Cell.fromBase64(
        'te6ccgECfgEAICoAART/APSkE/S88sgLAQIBYgIDA6bQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwOERAOEN9VHNs88uCCyPhDAcx/AcoAVeDbPMntVHgGBwIBIAQFAgFYVlcCASBjZATy7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghDmm7GGuuMCIIIQ43ng8bqOnTDTHwGCEON54PG68uCB0/8BAfQE0/9VIGwT2zx/4CCCEFpSdia64wIgghA/WSN5uggJCgsB9FDv9AAc9AAKyPQAGcv/F/QAFfQAA8j0ABL0APQAAsj0AMhQBM8WyVADzBPMyMhQBs8WyVAFzFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJWMzJJAF6MNMfAYIQ5puxhrry4IHT/wEB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BNP/VTBsFNs8fwwE9oIA9DkhwgDy9A4REQ4NERANEM8LERELChEQChCfCBERCAcREAcQbwUREQUEERAEED8CERECAREQAQ9WEds8IG7y0IBvI4IAjnwi8vRwIBEUiuRXE1cTggDL2S6qAHOpBKQBERMBvgEREgHy9FXgVhLbPCBu8tCAbyNsIW8QbxECgjDbPGwZBo4YAREQAYEBAVQQVyBulTBZ9FowlEEz9BTijhcfgQEBVBBXIG6VMFn0WjCUQTP0FOIOD+JPH1A02zx/Ey0D1I5MMNMfAYIQP1kjebry4IHUAdAB1AHQEmwSyFmCEGG4V01QA8sfyFjPFskBzMhYzxbJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAf+AgghBoM+GquuMCIIIQYo3KrbrjAsAAkTDjDXAUFRYC6IIA9DkhwgDy9HBSAorkbCGCAMvZL6oAc6kEpBK+8vSBAQEBf3DIVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEsoAAfoCyQIREQJWEQEgbpUwWfRaMJRBM/QV4gykD8gBghC40cgIWMsfy//JDQ4C/CKBAQEjWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyImyAEBy//J+QBUECL5EA8RFQ8OERQODRETDQwREgwLERELChEQCgkRFQkIERQIBxETBwYREgYFEREFBBEQBAMRFQMCERQCERMB2zwgbvLQgG8jMDERE28PADTIgljAAAAAAAAAAAAAAAABActnzMlw+wAQvgBkk3BXE98REpUREqQREt4RE6QNERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIBwYC/lYUgQEBVhVZ9A1voZIwbd8gbpIwbZzQ1AHQAdP/WWwSbwLiIG7y0IBvIlYXyAEBy//J+QBUECL5EA8RFA8OERMODRESDQwREQwLERALChEUCgkREwkIERIIBxERBwYREAYFERQFBBETBAMREgMCERECERAB2zwgbvLQgG8jMDFvEgDoAREQARERgQEBERPIVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEsoAAfoCyRA+AhERAgEREgEgbpUwWfRaMJRBM/QV4vgnbxD4QW8kE18DoYIImJaAoR62CIIA1VcBwgDy9BDOEJ0QjBB7VTYARBEQk3BXEN8Pkw+kD94RE6QREw0REg0MEREMCxEQCxCvVUkA7NMfAYIQWlJ2Jrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gCBAQHXANQB0IEBAdcA1AHQAdQB0AHUAdAB1DDQ1DDQEFkQWBBXEFYBfjDTHwGCEGgz4aq68uCB0//UAdAB1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgUQzBsFNs8fyUCYDDTHwGCEGKNyq268uCB2zwREfQE0/8RE1lXExERERIREREQEREREA8REA9VDts8fxcYAVr5AYLwhdKIOEwAQ0WLAoA8siBZ9ogDxVPDZWNENGRo2slh8ka6joXbPH/bMeAcAebTP9QB0AHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTP1VABdQB0NQB0AHUAdAB1AHQQzAD1DDQ0z/UAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAUQzAE1DDQGQT2KQ4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERRWEds8EN4QzhC+EK4QnhCOEH4QbiIQbxBfEE8QP1mCANRDERDbPFXgViLbPAEREAEB+QAB+QC6AREQAfL0VhMHGigoGwCK1NQB0AGBAQHXAIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwEDUQNDUMEREMEKsQmhB4EGcQVlUDAaKBJMYlDxERD149DBEQDAsREQsKERAKCRERCQgREAgHEREHBhEQBgUREQUEERAEAxERAwIREAIBEREBERDbPAEREAEB+QAB+QC6AREQAfL0VRwoAvxWEwcGERMGVhIGBRESBQQRJQQDESQDAhEjAlYiAlYiAgERIgERIVYgViBWIFYgViDIEREREFXg2zzJ+QCCAKoyJYEBASNxQTP0DG+hlAHXADCSW23ibvL0BIEBASV/cSFulVtZ9FowmMgBzwBBM/RC4gYREQYFERAFDxA+TcAvMATEW/hD+CjbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIIQBCwdgHJ/iCYQRVJiEDYQNFnbPPhD+CgdHlMfAPYB0PQEMG0hgS3GAYAQ9A9vofLghwGBLcYiAoAQ9BciggCiJQGAEPQPb6Hy4IeCAKIlAQKAEPQXAoF56gGAEPQPb6Hy4IcSgXnqAQKAEPQXyAHI9ADJAcxwAcoAWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskALAAAAABDb2xsZWN0aW9uRGVwbG95ZXIEtNs8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIghAELB2Acn+IJhBFUmIQNhA0Wds8WiAhUyIAyAHQ9AQwbSGBar4BgBD0D2+h8uCHAYFqviICgBD0FwKCAMTgAYAQ9A9vofLghxKCAMTgAQKAEPQXyAHI9ADJAcxwAcoAWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskAJgAAAABTdG9yYWdlRGVwbG95ZXIBhHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIWSMAgnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIABJQA8zJAczJAcwC9iBwK4EBCyNZ9AtvoZIwbd8gbpIwbY4T0IEBAdcA1AHQAdQB0EMwbBNvA+IgbrOaNgUgbvLQgG8jW+MOL4EBCyNZ9AtvoZIwbd8gbpIwbY4f0NQB0AHUAdAB1AHQAYEBAdcA1AHQ1DAVFEMwbBVvBeKLCIsIyMnQcMjJWyYnALAwU1XIyj8szxYkzxbJ+QCBAQtUONXIVSBQI4EBAc8AyFjPFskBzMhYzxbJAczJToBSQCBulTBZ9FkwlEEz9BPiHYEBAVQQcyBulTBZ9FowlEEz9BTiDAULA8QjbrOaXwMgbvLQgG8lW5QzfzlY4iwPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcGERgGBREXBQQRFgQDERUDAhEUAgEREwERFds8AREVAQH5AAH5ALrjDygpKgE6yG8AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DF8AWBXEFcVCxEUCwoREwoJERIJCBERCAcREAcQbyUPEF4QTRA8S6AQOQgQN0VAQTB/2zwrArpXEVcRDo6oChETCRESCQgREQgHERAHEG8kEG9R6xBeEE0QPFCrEIkQeAVEQ3/bPI6rChETCRESCQgREQgHERAHEG8QXhBNcCRR7BBeEE0MEHsQmhCJBgcFQ0PbPOIrKwPQyCcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYtzxbJ+QAIgQEBKVn0DG+hkjBt3yBujyEwEEZHU4IQBCwdgAdyUCl/CMhVcNs8ySQDREREQG1t2zyOjDE3BiBu8tCABQbbPOIsUy0AsoIQcUdbfFAJyx9QByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXKABOBAQHPAIEBAc8AyFjPFskBzMhYzxbJAczIWM8WyQHMyMhQA88WyVjMyQHMA6CCEAQsHYBycHD4QW8kECNfA8jJIsjJ0BBFEE3IVVDbPMkQJBA5QYBEQG1t2zxANHFSgshVYNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFJTLgB2ghDU5PDOUAjLHxbL/8hQBc8WyVAEzMhQA88WyVjMyFjPFskBzMv/yMhQA88WyVjMyFADzxbJWMzJAcwBxAUREQUEERAEED9O3FBFyz/IUAPPFslYzMhYzxbJAcwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyz/IRxNQZchQA88WyVADzMhQA88WyVjMyFjPFskBzMhDFFBbMQPsCxEaCwoRFwoJERoJCBEWCAcRGgcGERwGBREbBQQRFgQDERoDAhEWAgERGwHbPBERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQDERkD2zzIVhXPFlYYzxbJ+QArgQEBIln0DW+hkjBt3zIzNAD0UDTLP8hYzxbJAcwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzMgFEEcQNkB2UEXMyFADzxbJWMxQI1AjgQEBzwCBAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJWMzJAczJAcwBNnAgbW0EiuQyMzOCAMvZL6oAc6kEpFIwvvL0ATUBQjJwggCoViTCAPL0+CdvECCBFgUGvhXy9FEyqQQCiuRfAzkE9CBukjBtjjXQ1AHQAdQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1FVAbBVvBeKLCIsI+ChwyMkzM3BwVhnIyj9WH88WVhzPFsn5AC6BAQEiWfQMb6GSMG3fJ26zkTfjDSLjDyBus5J/M94jOjs8PQT+JIEBASRZ9A1voZIwbd8gbpIwbZzQ1AHQAdP/WWwSbwLiIG7y0IBvIlRXIvkQDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/BhEWBgURFQUEERQEAxETAwIREgIBEREBERBWEds8IG7y0IBvIzAREpNwVxLfERHjDxESpG82NzgAjgEREgGBAQEBVhQBERIgbpUwWfRaMJRBM/QU4oEBASADERYDElYUAhETASFulVtZ9FowmMgBzwBBM/RC4hERpBERERMPERAPAAhXEFcQAEQMERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMEDtAGlCYAfyBAQFUUQBSUEEz9AxvoZQB1wAwkltt4iBu8tCADxESDw4REQ4NERANDBESDAsREQsKERAKCRESCQgREQgHERAHBhESBgUREQUEERAEAxESAwIREQIBERAB2zwwERGkDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkAVUENvACRsMzN/BCBu8tCAbyUzMxBWVSIAasgkINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WLc8WyfkAgQEBVhECWfQMb6GSMG3fAB5WEIEBASlZ9AxvoZIwbd8DQJEikXDijxcjkiKzkXDi4w8QThA9TBoIULcQNkU1FOMNPj9ABPwTXwM0NFcTVxNXE1cWVxZXF4IQBCwdgHJ/iFYXVSBEQG1t2zz4Qw+kED8CERQCAVYXUA/bPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIERMegQELERFPU1BBA/w0NDQgs5Ijs5Fw4o6jECRfBFcYghA1pOkAcn9WFQJWFAJWGwJWHwIBERsBVh8BERmOxjI0VxNXE1cTVxVXFVcWVxYMs5JwPd8Mjhk8PDw8PYIA09ny8BBOED1MukkYRxZFFEAz4w0eEJ0QXBArEHoJEEcQRgNFVQTiDRCcEFtCQ0QCiDhXF1tXFVcVVxhXGFcZERZus46uPj4+VxBXEFcREREgbvLQgAcREQcGERAGEF8QThA9TLAQehBpEEgQNxA2EDXbPOMOTE0C5shVIFAjgQEBzwDIWM8WyQHMyFjPFskBzMlN8FYSASBulTBZ9FkwlEEz9BPiHYEBAVALVhEgbpUwWfRaMJRBM/QU4oIQBCwdgHJwcPhBbyQQI18DyMkiyMnQEEUEERMEyFVQ2zzJECQDERIDQeBEQG1t2zxSUwH+yFVgghDvIlptUAjLHxbMVSFQI4EBAc8AgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUAPPFslYzMhQA88WyVjMyQHMyVQTBAMCERcCERQBREBtbUUD7BER+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEMbrOOpzsNIG7y0IAHEREHBhEQBhBfEE4QPUywEDoQORBYEDcQVhA1EDTbPI8lPDw8ghAExLQAcn+IEDQQPERAbW3bPBBOED1MuhB5CEUWRBRQM+JMT1MAChCKCQcGBMbbPPhD+ChQQ1YSAwIREQIBERcBERrbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI+ENw+ChBBBER2zxTRlBHAY4F0PQEMG0hggCiJQGAEPQPb6Hy4IcBggCiJSICgBD0FwKBeeoBgBD0D2+h8uCHEoF56gECgBD0F8gByPQAyQHMcAHKAFVABkgBnnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIgQEBcMjJVhYCVhFURQNJAKhQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLMyFBDUCOBAQHPAIEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzMkBtshVQMhQBc8WyVAFzMhQA88WyVjMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMzJEDhB4CBulTBZ9FowlEEz9BXigQELcMjJLwJWFgJWFFlKAejIVUDIUAXPFslQBczIUAPPFslYzMhYzxbJAcwSgQEBzwAByMzJAczJLRA3ASBulTBZ9FkwlEEz9BPiERIdgQELERDIVSBQI4EBAc8AyFjPFskBzMhYzxbJAczJROBSoCBulTBZ9FkwlEEz9BPiECqBAQFA+UsAHCBulTBZ9FowlEEz9BTiAnqCEATEtAByfyXIAYIQGIRZSljLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJJFUgREBtbds8U04E4FcXghAELB2Acn+IVhJVIERAbW3bPPhDERSkAxEUA08AVhcBERHbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIERMegQELERFPU1BRAMzIVSCCEJDBvzhQBMsfWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsv/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAAEAAAAABNaW50AOYE0PQEMG0BgXnqAYAQ9A9vofLghwGBeeoiAoAQ9BfIAcj0AMkBzHABygBVMAVQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFszJA/zIVSBQI4EBAc8AyFjPFskBzMhYzxbJAczJTfBWEgEgbpUwWfRZMJRBM/QT4h2BAQFQCVYRIG6VMFn0WjCUQTP0FOKCEAQsHYBycHD4QW8kECNfA8jJIsjJ0BBFBBETBMhVUNs8yRAkAxESA0HgREBtbds8EE4QPUwaCFC3EDZSU1QAwoIQX8w9FFAHyx8Vyz9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAVQAEUEIAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASBYWQIBIFxdAhWxFjbPFUO2zxs8YHhaAhGxRLbPNs8bPGB4WwAcgQEBLwJZ9AxvoZIwbd8AAiACAnZeXwJNsgd2zwOERAOEN9VHNs8bPEgbpIwbZkgbvLQgG8lbwXiIG6SMG3egeGICS6H8g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zxVDts8bPGeGACD6MnbPNs8bPGeGEAaMgBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WJc8WyfkAgQEBKQJZ9AxvoZIwbd8AAisAqshYzxYBzxbJ+QCBAQEsAln0DW+hkjBt3yBukjBtjjXQ1AHQAdQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1FVAbBVvBeICASBlZgIBSHR1AgEgZ2gAlbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkAIBSGlqAgEgbW4CKKvo2zwOEREODREQDRDPVSvbPGzxeGsCVqjJASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPA4REA5VHds8bPF4bAA4AsjKPwHPFiHPFjHJ+QCBAQEoAln0DG+hkjBt3wBoyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJ+QCBAQEqAln0DG+hkjBt3wJBrn1tniqHbZ42eJA3SRg2zJA3eWhAN5G3gfEQN0kYNu9AeG8CASBwcQCEgQEBVhACWfQNb6GSMG3fIG6SMG2OK9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gBVIGwTbwPiAnirEyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUO2zxs8SBukjBtmSBu8tCAbyVvBeIgbpIwbd54cgIQqEHbPNs8bPF4cwBqgQELKwJZ9AtvoZIwbd8gbpIwbY4f0NQB0AHUAdAB1AHQAYEBAdcA1AHQ1DAVFEMwbBVvBeIAAiEAEbCvu1E0NIAAYAIBIHZ3Anmv1xBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqHbZ42eJA3SRg2zJA3eWhAN5G3gfEQN0kYNu9AeHkAdazdxoatLgzOZ0Xl6i2sri5Krm4vDulmhyyuSW0qbucppszubS3GSIaMRuorKQoMZu7qDQzOzuyuBxBAAfbtRNDUAfhj0gABjm/0BPQE1AHQ9ATT//QE9ATUMND0BPQE9ATUMND0BNQB0AHU1DDQ1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQ3xDebB96AFKBAQsnAln0C2+hkjBt3yBukjBtjhPQgQEB1wDUAdAB1AHQQzBsE28D4gF24Pgo1wsKgwm68uCJgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0EMwA9FY2zx7AvRtbW1tbW1tbW2LhzaW5ndWxhcogQEBDH9wyFUgWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLKAAH6AskQOkzQIG6VMFn0WjCUQTP0FeJxKchvAAFvjG1vjFAL2zxvIgHJkyFus5YBbyJZzMnoMfgo+CgQTnx9ALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMALBCtEJwQOxCKEHkQaBBXEDYQNRA0ECM=',
    );
    const __system = Cell.fromBase64(
        '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',
    );
    const builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBridge_init_args({
        $$type: 'Bridge_init_args',
        validatorPublicKey,
        validatorAddress,
        chainType,
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Bridge_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2361: { message: `data.fee LESS THAN sent amount!` },
    5637: { message: `No rewards available` },
    9414: { message: `Invalid destination chain!` },
    16053: { message: `Only owner can call` },
    35976: { message: `Only the owner can call this function` },
    36476: { message: `Validator does not exist!` },
    43094: { message: `Invalid fees` },
    43570: { message: `Data already processed!` },
    49280: { message: `not owner` },
    52185: { message: `Threshold not reached!` },
    54233: { message: `Invalid bridge state` },
    54339: { message: `Invalid NFT type!` },
    54615: { message: `Insufficient balance` },
    62521: { message: `Must have signatures!` },
    62742: { message: `non-sequential NFTs` },
};

const Bridge_types: ABIType[] = [
    {
        name: 'StateInit',
        header: null,
        fields: [
            {
                name: 'code',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
            {
                name: 'data',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
        ],
    },
    {
        name: 'Context',
        header: null,
        fields: [
            {
                name: 'bounced',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'sender',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'value',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'raw',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
        ],
    },
    {
        name: 'SendParameters',
        header: null,
        fields: [
            {
                name: 'bounce',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'to',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'value',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'mode',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'body',
                type: { kind: 'simple', type: 'cell', optional: true },
            },
            {
                name: 'code',
                type: { kind: 'simple', type: 'cell', optional: true },
            },
            {
                name: 'data',
                type: { kind: 'simple', type: 'cell', optional: true },
            },
        ],
    },
    {
        name: 'Deploy',
        header: 2490013878,
        fields: [
            {
                name: 'queryId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: 'DeployOk',
        header: 2952335191,
        fields: [
            {
                name: 'queryId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: 'FactoryDeploy',
        header: 1829761339,
        fields: [
            {
                name: 'queryId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'cashback',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'DeployNFT721Storage',
        header: 1900501884,
        fields: [
            {
                name: 'collectionAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'isOriginal',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'destinationChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationUserAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceNftContractAddressLock',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'DeployNFT721Collection',
        header: 4012005997,
        fields: [
            {
                name: 'collection_content',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
            {
                name: 'royalty_params',
                type: {
                    kind: 'simple',
                    type: 'RoyaltyParams',
                    optional: false,
                },
            },
            {
                name: 'destination_user_address',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'source_chain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'transaction_hash',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'CreatedCollection',
        header: 41705028,
        fields: [
            {
                name: 'collectionAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'UnlockToken',
        header: 411326794,
        fields: [
            {
                name: 'to',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'GetRoyaltyParams',
        header: 1765620048,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: 'ReportRoyaltyParams',
        header: 2831876269,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'numerator',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 16,
                },
            },
            {
                name: 'denominator',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 16,
                },
            },
            {
                name: 'destination',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'CollectionData',
        header: null,
        fields: [
            {
                name: 'next_item_index',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'collection_content',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
            {
                name: 'owner_address',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'RoyaltyParams',
        header: null,
        fields: [
            {
                name: 'numerator',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'denominator',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'destination',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'Transfer',
        header: 1607220500,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'new_owner',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'response_destination',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'custom_payload',
                type: { kind: 'simple', type: 'cell', optional: true },
            },
            {
                name: 'forward_amount',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 'coins',
                },
            },
            {
                name: 'forward_payload',
                type: {
                    kind: 'simple',
                    type: 'slice',
                    optional: false,
                    format: 'remainder',
                },
            },
        ],
    },
    {
        name: 'OwnershipAssigned',
        header: 85167505,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'prev_owner',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'forward_payload',
                type: {
                    kind: 'simple',
                    type: 'slice',
                    optional: false,
                    format: 'remainder',
                },
            },
        ],
    },
    {
        name: 'Excesses',
        header: 3576854235,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: 'GetStaticData',
        header: 801842850,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: 'ReportStaticData',
        header: 2339837749,
        fields: [
            {
                name: 'query_id',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'index_id',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'collection',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'GetNftData',
        header: null,
        fields: [
            {
                name: 'is_initialized',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'index',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'collection_address',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'owner_address',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'individual_content',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
        ],
    },
    {
        name: 'HiFromDeployNFT721Storage',
        header: 1515353638,
        fields: [
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'storageAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'isOriginal',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'destinationChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationUserAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceNftContractAddressLock',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'HiFromDeployNFT721Collection',
        header: 1062806393,
        fields: [
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'transactionHash',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'CollectionDeploy',
        header: 2783573850,
        fields: [
            {
                name: 'newOwner',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'StorageDeploy',
        header: 2356437903,
        fields: [
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'isOriginal',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'destinationChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationUserAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceNftContractAddressLock',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'Validator',
        header: null,
        fields: [
            {
                name: 'address',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'added',
                type: { kind: 'simple', type: 'bool', optional: false },
            },
            {
                name: 'pendingRewards',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 'coins',
                },
            },
        ],
    },
    {
        name: 'SignerAndSignature',
        header: null,
        fields: [
            {
                name: 'signature',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'NewValidator',
        header: null,
        fields: [
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'ValidatorsToRewards',
        header: null,
        fields: [
            {
                name: 'addresses',
                type: { kind: 'dict', key: 'int', value: 'address' },
            },
            {
                name: 'publicKeys',
                type: { kind: 'dict', key: 'int', value: 'int' },
            },
            {
                name: 'len',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
        ],
    },
    {
        name: 'DuplicateToOriginalContractInfo',
        header: null,
        fields: [
            {
                name: 'keyChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'chain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'contractAddress',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'lastIndex',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'collectionContent',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
        ],
    },
    {
        name: 'OriginalToDuplicateContractInfo',
        header: null,
        fields: [
            {
                name: 'keyChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'chain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'contractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'lastIndex',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'collectionContent',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
        ],
    },
    {
        name: 'ClaimData1',
        header: null,
        fields: [
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationUserAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'tokenAmount',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: 'ClaimData2',
        header: null,
        fields: [
            {
                name: 'name',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'symbol',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'nftType',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'ClaimData3',
        header: null,
        fields: [
            {
                name: 'fee',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'royaltyReceiver',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'metadata',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'ClaimData4',
        header: null,
        fields: [
            {
                name: 'newContent',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
            {
                name: 'transactionHash',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'royalty',
                type: {
                    kind: 'simple',
                    type: 'RoyaltyParams',
                    optional: false,
                },
            },
        ],
    },
    {
        name: 'ClaimData',
        header: null,
        fields: [
            {
                name: 'data1',
                type: { kind: 'simple', type: 'ClaimData1', optional: false },
            },
            {
                name: 'data2',
                type: { kind: 'simple', type: 'ClaimData2', optional: false },
            },
            {
                name: 'data3',
                type: { kind: 'simple', type: 'ClaimData3', optional: false },
            },
            {
                name: 'data4',
                type: { kind: 'simple', type: 'ClaimData4', optional: false },
            },
        ],
    },
    {
        name: 'Token',
        header: null,
        fields: [
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'chain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'contractAddress',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
        ],
    },
    {
        name: 'AddValidator',
        header: 3868963206,
        fields: [
            {
                name: 'newValidatorPublicKey',
                type: { kind: 'simple', type: 'NewValidator', optional: false },
            },
            {
                name: 'newValidatorAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'sigs',
                type: {
                    kind: 'dict',
                    key: 'int',
                    value: 'SignerAndSignature',
                    valueFormat: 'ref',
                },
            },
            {
                name: 'len',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'RewardValidator',
        header: 3816415473,
        fields: [
            {
                name: 'validator',
                type: { kind: 'simple', type: 'NewValidator', optional: false },
            },
            {
                name: 'sigs',
                type: {
                    kind: 'dict',
                    key: 'int',
                    value: 'SignerAndSignature',
                    valueFormat: 'ref',
                },
            },
            {
                name: 'len',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'Lock721',
        header: 1748230570,
        fields: [
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
            {
                name: 'destinationChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationUserAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'ClaimNFT721',
        header: 1653459629,
        fields: [
            {
                name: 'data',
                type: { kind: 'simple', type: 'ClaimData', optional: false },
            },
            {
                name: 'signatures',
                type: {
                    kind: 'dict',
                    key: 'int',
                    value: 'SignerAndSignature',
                    valueFormat: 'ref',
                },
            },
            {
                name: 'len',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'StakeEvent',
        header: 1284335502,
        fields: [
            {
                name: 'amount',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 'coins',
                },
            },
            {
                name: 'asd',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'AddNewValidatorEvent',
        header: 3100755976,
        fields: [
            {
                name: 'validator',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'RewardValidatorEvent',
        header: 2049240067,
        fields: [
            {
                name: 'validator',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: 'LockedEvent',
        header: 3571773646,
        fields: [
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
            {
                name: 'destinationChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'destinationUserAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
            {
                name: 'tokenAmount',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
            {
                name: 'nftType',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'UnLock721Event',
        header: 2428616504,
        fields: [
            {
                name: 'to',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
            {
                name: 'contractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'ClaimedEvent',
        header: 1639470925,
        fields: [
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'transactionHash',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
];

const Bridge_getters: ABIGetter[] = [
    {
        name: 'Original721Mapping',
        arguments: [
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
    {
        name: 'Duplicate721Mapping',
        arguments: [
            {
                name: 'contractAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
    {
        name: 'OriginalToDuplicate',
        arguments: [
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
        returnType: {
            kind: 'simple',
            type: 'OriginalToDuplicateContractInfo',
            optional: true,
        },
    },
    {
        name: 'DuplicateToOriginal',
        arguments: [
            {
                name: 'key',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
        returnType: {
            kind: 'simple',
            type: 'DuplicateToOriginalContractInfo',
            optional: true,
        },
    },
    {
        name: 'TokenInfo',
        arguments: [
            {
                name: 'key',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
        returnType: { kind: 'simple', type: 'Token', optional: true },
    },
    {
        name: 'TokenInfoSelf',
        arguments: [
            {
                name: 'tokenId',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
            {
                name: 'sourceChain',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'slice', optional: false },
            },
        ],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
    {
        name: 'Validator',
        arguments: [
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: 'simple', type: 'Validator', optional: true },
    },
    {
        name: 'ValidatorsCount',
        arguments: [],
        returnType: {
            kind: 'simple',
            type: 'int',
            optional: true,
            format: 257,
        },
    },
    {
        name: 'CollectionDeployer',
        arguments: [],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
    {
        name: 'StorageDeployer',
        arguments: [],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
    {
        name: 'Collections',
        arguments: [
            {
                name: 'key',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: 'simple', type: 'address', optional: true },
    },
];

const Bridge_receivers: ABIReceiver[] = [
    { receiver: 'internal', message: { kind: 'typed', type: 'Excesses' } },
    { receiver: 'internal', message: { kind: 'text', text: 'Deploy' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'AddValidator' } },
    {
        receiver: 'internal',
        message: { kind: 'typed', type: 'RewardValidator' },
    },
    {
        receiver: 'internal',
        message: { kind: 'typed', type: 'HiFromDeployNFT721Storage' },
    },
    {
        receiver: 'internal',
        message: { kind: 'typed', type: 'HiFromDeployNFT721Collection' },
    },
    { receiver: 'internal', message: { kind: 'typed', type: 'Lock721' } },
    { receiver: 'internal', message: { kind: 'typed', type: 'ClaimNFT721' } },
];

export class Bridge implements Contract {
    static async init(
        validatorPublicKey: bigint,
        validatorAddress: Address,
        chainType: string,
    ) {
        return await Bridge_init(
            validatorPublicKey,
            validatorAddress,
            chainType,
        );
    }

    static async fromInit(
        validatorPublicKey: bigint,
        validatorAddress: Address,
        chainType: string,
    ) {
        const init = await Bridge_init(
            validatorPublicKey,
            validatorAddress,
            chainType,
        );
        const address = contractAddress(0, init);
        return new Bridge(address, init);
    }

    static fromAddress(address: Address) {
        return new Bridge(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: Bridge_types,
        getters: Bridge_getters,
        receivers: Bridge_receivers,
        errors: Bridge_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message:
            | Excesses
            | 'Deploy'
            | AddValidator
            | RewardValidator
            | HiFromDeployNFT721Storage
            | HiFromDeployNFT721Collection
            | Lock721
            | ClaimNFT721,
    ) {
        let body: Cell | null = null;
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'Excesses'
        ) {
            body = beginCell().store(storeExcesses(message)).endCell();
        }
        if (message === 'Deploy') {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'AddValidator'
        ) {
            body = beginCell().store(storeAddValidator(message)).endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'RewardValidator'
        ) {
            body = beginCell().store(storeRewardValidator(message)).endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'HiFromDeployNFT721Storage'
        ) {
            body = beginCell()
                .store(storeHiFromDeployNFT721Storage(message))
                .endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'HiFromDeployNFT721Collection'
        ) {
            body = beginCell()
                .store(storeHiFromDeployNFT721Collection(message))
                .endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'Lock721'
        ) {
            body = beginCell().store(storeLock721(message)).endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'ClaimNFT721'
        ) {
            body = beginCell().store(storeClaimNFT721(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getOriginal721Mapping(
        provider: ContractProvider,
        sourceNftContractAddress: Address,
        sourceChain: string,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(sourceNftContractAddress);
        builder.writeString(sourceChain);
        const source = (
            await provider.get('Original721Mapping', builder.build())
        ).stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getDuplicate721Mapping(
        provider: ContractProvider,
        contractAddress: Address,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(contractAddress);
        const source = (
            await provider.get('Duplicate721Mapping', builder.build())
        ).stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getOriginalToDuplicate(
        provider: ContractProvider,
        sourceNftContractAddress: string,
        sourceChain: string,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(sourceNftContractAddress);
        builder.writeString(sourceChain);
        const source = (
            await provider.get('OriginalToDuplicate', builder.build())
        ).stack;
        const result_p = source.readTupleOpt();
        const result = result_p
            ? loadTupleOriginalToDuplicateContractInfo(result_p)
            : null;
        return result;
    }

    async getDuplicateToOriginal(provider: ContractProvider, key: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(key);
        const source = (
            await provider.get('DuplicateToOriginal', builder.build())
        ).stack;
        const result_p = source.readTupleOpt();
        const result = result_p
            ? loadTupleDuplicateToOriginalContractInfo(result_p)
            : null;
        return result;
    }

    async getTokenInfo(provider: ContractProvider, key: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(key);
        const source = (await provider.get('TokenInfo', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleToken(result_p) : null;
        return result;
    }

    async getTokenInfoSelf(
        provider: ContractProvider,
        tokenId: bigint,
        sourceChain: string,
        sourceNftContractAddress: Cell,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        builder.writeString(sourceChain);
        builder.writeSlice(sourceNftContractAddress);
        const source = (await provider.get('TokenInfoSelf', builder.build()))
            .stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getValidator(provider: ContractProvider, key: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(key);
        const source = (await provider.get('Validator', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleValidator(result_p) : null;
        return result;
    }

    async getValidatorsCount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('ValidatorsCount', builder.build()))
            .stack;
        const result = source.readBigNumberOpt();
        return result;
    }

    async getCollectionDeployer(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (
            await provider.get('CollectionDeployer', builder.build())
        ).stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getStorageDeployer(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('StorageDeployer', builder.build()))
            .stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getCollections(provider: ContractProvider, key: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(key);
        const source = (await provider.get('Collections', builder.build()))
            .stack;
        const result = source.readAddressOpt();
        return result;
    }
}
