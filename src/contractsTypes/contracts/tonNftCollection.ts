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

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
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

export type HiFromParent = {
    $$type: 'HiFromParent';
    greeting: string;
};

export function storeHiFromParent(src: HiFromParent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3517475402, 32);
        b_0.storeStringRefTail(src.greeting);
    };
}

export function loadHiFromParent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3517475402) {
        throw Error('Invalid prefix');
    }
    const _greeting = sc_0.loadStringRefTail();
    return { $$type: 'HiFromParent' as const, greeting: _greeting };
}

export type HiFromChild = {
    $$type: 'HiFromChild';
    fromSeqno: bigint;
    greeting: string;
};

export function storeHiFromChild(src: HiFromChild) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1237539370, 32);
        b_0.storeUint(src.fromSeqno, 64);
        b_0.storeStringRefTail(src.greeting);
    };
}

export function loadHiFromChild(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1237539370) {
        throw Error('Invalid prefix');
    }
    const _fromSeqno = sc_0.loadUintBig(64);
    const _greeting = sc_0.loadStringRefTail();
    return {
        $$type: 'HiFromChild' as const,
        fromSeqno: _fromSeqno,
        greeting: _greeting,
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

export type DeployNFT721Storage = {
    $$type: 'DeployNFT721Storage';
    collectionAddress: Address;
};

export function storeDeployNFT721Storage(src: DeployNFT721Storage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3440771816, 32);
        b_0.storeAddress(src.collectionAddress);
    };
}

export function loadDeployNFT721Storage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3440771816) {
        throw Error('Invalid prefix');
    }
    const _collectionAddress = sc_0.loadAddress();
    return {
        $$type: 'DeployNFT721Storage' as const,
        collectionAddress: _collectionAddress,
    };
}

export type DeployNFT721Collection = {
    $$type: 'DeployNFT721Collection';
    owner_address: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;
};

export function storeDeployNFT721Collection(src: DeployNFT721Collection) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4287560620, 32);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.collection_content);
        const b_1 = new Builder();
        b_1.store(storeRoyaltyParams(src.royalty_params));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployNFT721Collection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4287560620) {
        throw Error('Invalid prefix');
    }
    const _owner_address = sc_0.loadAddress();
    const _collection_content = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _royalty_params = loadRoyaltyParams(sc_1);
    return {
        $$type: 'DeployNFT721Collection' as const,
        owner_address: _owner_address,
        collection_content: _collection_content,
        royalty_params: _royalty_params,
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

function loadTupleCollectionData(source: TupleReader) {
    const _next_item_index = source.readBigNumber();
    const _collection_content = source.readCell();
    const _owner_address = source.readAddress();
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

function loadTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
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
    storageAddress: Address;
};

export function storeHiFromDeployNFT721Storage(src: HiFromDeployNFT721Storage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3538995402, 32);
        b_0.storeAddress(src.storageAddress);
    };
}

export function loadHiFromDeployNFT721Storage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3538995402) {
        throw Error('Invalid prefix');
    }
    const _storageAddress = sc_0.loadAddress();
    return {
        $$type: 'HiFromDeployNFT721Storage' as const,
        storageAddress: _storageAddress,
    };
}

export type HiFromDeployNFT721Collection = {
    $$type: 'HiFromDeployNFT721Collection';
    collectionAddress: Address;
};

export function storeHiFromDeployNFT721Collection(
    src: HiFromDeployNFT721Collection,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1567973189, 32);
        b_0.storeAddress(src.collectionAddress);
    };
}

export function loadHiFromDeployNFT721Collection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1567973189) {
        throw Error('Invalid prefix');
    }
    const _collectionAddress = sc_0.loadAddress();
    return {
        $$type: 'HiFromDeployNFT721Collection' as const,
        collectionAddress: _collectionAddress,
    };
}

export type Validator = {
    $$type: 'Validator';
    added: boolean;
    pendingRewards: bigint;
};

export function storeValidator(src: Validator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.added);
        b_0.storeCoins(src.pendingRewards);
    };
}

export function loadValidator(slice: Slice) {
    const sc_0 = slice;
    const _added = sc_0.loadBit();
    const _pendingRewards = sc_0.loadCoins();
    return {
        $$type: 'Validator' as const,
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

export type DuplicateToOriginalContractInfo = {
    $$type: 'DuplicateToOriginalContractInfo';
    keyChain: string;
    chain: string;
    contractAddress: string;
};

export function storeDuplicateToOriginalContractInfo(
    src: DuplicateToOriginalContractInfo,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.keyChain);
        b_0.storeStringRefTail(src.chain);
        b_0.storeStringRefTail(src.contractAddress);
    };
}

export function loadDuplicateToOriginalContractInfo(slice: Slice) {
    const sc_0 = slice;
    const _keyChain = sc_0.loadStringRefTail();
    const _chain = sc_0.loadStringRefTail();
    const _contractAddress = sc_0.loadStringRefTail();
    return {
        $$type: 'DuplicateToOriginalContractInfo' as const,
        keyChain: _keyChain,
        chain: _chain,
        contractAddress: _contractAddress,
    };
}

export type OriginalToDuplicateContractInfo = {
    $$type: 'OriginalToDuplicateContractInfo';
    keyChain: string;
    chain: string;
    contractAddress: Address;
};

export function storeOriginalToDuplicateContractInfo(
    src: OriginalToDuplicateContractInfo,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.keyChain);
        b_0.storeStringRefTail(src.chain);
        b_0.storeAddress(src.contractAddress);
    };
}

export function loadOriginalToDuplicateContractInfo(slice: Slice) {
    const sc_0 = slice;
    const _keyChain = sc_0.loadStringRefTail();
    const _chain = sc_0.loadStringRefTail();
    const _contractAddress = sc_0.loadAddress();
    return {
        $$type: 'OriginalToDuplicateContractInfo' as const,
        keyChain: _keyChain,
        chain: _chain,
        contractAddress: _contractAddress,
    };
}

export type ClaimData = {
    $$type: 'ClaimData';
    tokenId: bigint;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: Address;
    sourceNftContractAddress: string;
    name: string;
    symbol: string;
    royalty: bigint;
    royaltyReceiver: Address;
    metadata: string;
    transactionHash: string;
    tokenAmount: bigint;
    nftType: string;
    fee: bigint;
};

export function storeClaimData(src: ClaimData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.tokenId, 256);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeAddress(src.destinationUserAddress);
        b_0.storeStringRefTail(src.sourceNftContractAddress);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.name);
        b_1.storeStringRefTail(src.symbol);
        b_1.storeUint(src.royalty, 256);
        b_1.storeAddress(src.royaltyReceiver);
        b_1.storeStringRefTail(src.metadata);
        const b_2 = new Builder();
        b_2.storeStringRefTail(src.transactionHash);
        b_2.storeUint(src.tokenAmount, 256);
        b_2.storeStringRefTail(src.nftType);
        b_2.storeUint(src.fee, 256);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadClaimData(slice: Slice) {
    const sc_0 = slice;
    const _tokenId = sc_0.loadUintBig(256);
    const _sourceChain = sc_0.loadStringRefTail();
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadAddress();
    const _sourceNftContractAddress = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _name = sc_1.loadStringRefTail();
    const _symbol = sc_1.loadStringRefTail();
    const _royalty = sc_1.loadUintBig(256);
    const _royaltyReceiver = sc_1.loadAddress();
    const _metadata = sc_1.loadStringRefTail();
    const sc_2 = sc_1.loadRef().beginParse();
    const _transactionHash = sc_2.loadStringRefTail();
    const _tokenAmount = sc_2.loadUintBig(256);
    const _nftType = sc_2.loadStringRefTail();
    const _fee = sc_2.loadUintBig(256);
    return {
        $$type: 'ClaimData' as const,
        tokenId: _tokenId,
        sourceChain: _sourceChain,
        destinationChain: _destinationChain,
        destinationUserAddress: _destinationUserAddress,
        sourceNftContractAddress: _sourceNftContractAddress,
        name: _name,
        symbol: _symbol,
        royalty: _royalty,
        royaltyReceiver: _royaltyReceiver,
        metadata: _metadata,
        transactionHash: _transactionHash,
        tokenAmount: _tokenAmount,
        nftType: _nftType,
        fee: _fee,
    };
}

export type AddValidator = {
    $$type: 'AddValidator';
    newValidatorPublicKey: NewValidator;
    sigs: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
};

export function storeAddValidator(src: AddValidator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3417513985, 32);
        b_0.store(storeNewValidator(src.newValidatorPublicKey));
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
    if (sc_0.loadUint(32) !== 3417513985) {
        throw Error('Invalid prefix');
    }
    const _newValidatorPublicKey = loadNewValidator(sc_0);
    const _sigs = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        dictValueParserSignerAndSignature(),
        sc_0,
    );
    const _len = sc_0.loadUintBig(256);
    return {
        $$type: 'AddValidator' as const,
        newValidatorPublicKey: _newValidatorPublicKey,
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
    sourceNftContractAddress: string;
    tokenAmount: bigint;
    nftType: string;
    sourceChain: string;
};

export function storeLockedEvent(src: LockedEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2534710387, 32);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeStringRefTail(src.destinationUserAddress);
        b_0.storeStringRefTail(src.sourceNftContractAddress);
        b_0.storeUint(src.tokenAmount, 256);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.nftType);
        b_1.storeStringRefTail(src.sourceChain);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLockedEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2534710387) {
        throw Error('Invalid prefix');
    }
    const _tokenId = sc_0.loadUintBig(256);
    const _destinationChain = sc_0.loadStringRefTail();
    const _destinationUserAddress = sc_0.loadStringRefTail();
    const _sourceNftContractAddress = sc_0.loadStringRefTail();
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
    contractAddr: Address;
};

export function storeUnLock721Event(src: UnLock721Event) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3340679482, 32);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeAddress(src.contractAddr);
    };
}

export function loadUnLock721Event(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3340679482) {
        throw Error('Invalid prefix');
    }
    const _to = sc_0.loadAddress();
    const _tokenId = sc_0.loadUintBig(256);
    const _contractAddr = sc_0.loadAddress();
    return {
        $$type: 'UnLock721Event' as const,
        to: _to,
        tokenId: _tokenId,
        contractAddr: _contractAddr,
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

type NftCollection_init_args = {
    $$type: 'NftCollection_init_args';
    owner_address: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;
};

function initNftCollection_init_args(src: NftCollection_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.collection_content);
        const b_1 = new Builder();
        b_1.store(storeRoyaltyParams(src.royalty_params));
        b_0.storeRef(b_1.endCell());
    };
}

async function NftCollection_init(
    owner_address: Address,
    collection_content: Cell,
    royalty_params: RoyaltyParams,
) {
    const __code = Cell.fromBase64(
        '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',
    );
    const __system = Cell.fromBase64(
        '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',
    );
    const builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftCollection_init_args({
        $$type: 'NftCollection_init_args',
        owner_address,
        collection_content,
        royalty_params,
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
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
    9414: { message: `Invalid destination chain!` },
    16053: { message: `Only owner can call` },
    35976: { message: `Only the owner can call this function` },
    36476: { message: `Validator does not exist!` },
    49280: { message: `not owner` },
    52185: { message: `Threshold not reached!` },
    54615: { message: `Insufficient balance` },
    62521: { message: `Must have signatures!` },
    62742: { message: `non-sequential NFTs` },
};

const NftCollection_types: ABIType[] = [
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
        name: 'HiFromParent',
        header: 3517475402,
        fields: [
            {
                name: 'greeting',
                type: { kind: 'simple', type: 'string', optional: false },
            },
        ],
    },
    {
        name: 'HiFromChild',
        header: 1237539370,
        fields: [
            {
                name: 'fromSeqno',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 64,
                },
            },
            {
                name: 'greeting',
                type: { kind: 'simple', type: 'string', optional: false },
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
        name: 'DeployNFT721Storage',
        header: 3440771816,
        fields: [
            {
                name: 'collectionAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'DeployNFT721Collection',
        header: 4287560620,
        fields: [
            {
                name: 'owner_address',
                type: { kind: 'simple', type: 'address', optional: false },
            },
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
        header: 3538995402,
        fields: [
            {
                name: 'storageAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'HiFromDeployNFT721Collection',
        header: 1567973189,
        fields: [
            {
                name: 'collectionAddress',
                type: { kind: 'simple', type: 'address', optional: false },
            },
        ],
    },
    {
        name: 'Validator',
        header: null,
        fields: [
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
                type: { kind: 'simple', type: 'string', optional: false },
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
        ],
    },
    {
        name: 'ClaimData',
        header: null,
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
                name: 'sourceNftContractAddress',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'name',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'symbol',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'royalty',
                type: {
                    kind: 'simple',
                    type: 'uint',
                    optional: false,
                    format: 256,
                },
            },
            {
                name: 'royaltyReceiver',
                type: { kind: 'simple', type: 'address', optional: false },
            },
            {
                name: 'metadata',
                type: { kind: 'simple', type: 'string', optional: false },
            },
            {
                name: 'transactionHash',
                type: { kind: 'simple', type: 'string', optional: false },
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
                name: 'fee',
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
        name: 'AddValidator',
        header: 3417513985,
        fields: [
            {
                name: 'newValidatorPublicKey',
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
        header: 2534710387,
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
                type: { kind: 'simple', type: 'string', optional: false },
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
        header: 3340679482,
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
                name: 'contractAddr',
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

const NftCollection_getters: ABIGetter[] = [
    {
        name: 'get_collection_data',
        arguments: [],
        returnType: { kind: 'simple', type: 'CollectionData', optional: false },
    },
    {
        name: 'get_nft_address_by_index',
        arguments: [
            {
                name: 'item_index',
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
    {
        name: 'getNftItemInit',
        arguments: [
            {
                name: 'item_index',
                type: {
                    kind: 'simple',
                    type: 'int',
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: 'simple', type: 'StateInit', optional: false },
    },
    {
        name: 'get_nft_content',
        arguments: [
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
                name: 'individual_content',
                type: { kind: 'simple', type: 'cell', optional: false },
            },
        ],
        returnType: { kind: 'simple', type: 'cell', optional: false },
    },
    {
        name: 'royalty_params',
        arguments: [],
        returnType: { kind: 'simple', type: 'RoyaltyParams', optional: false },
    },
];

const NftCollection_receivers: ABIReceiver[] = [
    { receiver: 'internal', message: { kind: 'text', text: 'Mint' } },
    {
        receiver: 'internal',
        message: { kind: 'typed', type: 'GetRoyaltyParams' },
    },
];

export class NftCollection implements Contract {
    static async init(
        owner_address: Address,
        collection_content: Cell,
        royalty_params: RoyaltyParams,
    ) {
        return await NftCollection_init(
            owner_address,
            collection_content,
            royalty_params,
        );
    }

    static async fromInit(
        owner_address: Address,
        collection_content: Cell,
        royalty_params: RoyaltyParams,
    ) {
        const init = await NftCollection_init(
            owner_address,
            collection_content,
            royalty_params,
        );
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }

    static fromAddress(address: Address) {
        return new NftCollection(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: NftCollection_types,
        getters: NftCollection_getters,
        receivers: NftCollection_receivers,
        errors: NftCollection_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: 'Mint' | GetRoyaltyParams,
    ) {
        let body: Cell | null = null;
        if (message === 'Mint') {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (
            message &&
            typeof message === 'object' &&
            !(message instanceof Slice) &&
            message.$$type === 'GetRoyaltyParams'
        ) {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getGetCollectionData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (
            await provider.get('get_collection_data', builder.build())
        ).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }

    async getGetNftAddressByIndex(
        provider: ContractProvider,
        item_index: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(item_index);
        const source = (
            await provider.get('get_nft_address_by_index', builder.build())
        ).stack;
        const result = source.readAddressOpt();
        return result;
    }

    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(item_index);
        const source = (await provider.get('getNftItemInit', builder.build()))
            .stack;
        const result = loadTupleStateInit(source);
        return result;
    }

    async getGetNftContent(
        provider: ContractProvider,
        index: bigint,
        individual_content: Cell,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        const source = (await provider.get('get_nft_content', builder.build()))
            .stack;
        const result = source.readCell();
        return result;
    }

    async getRoyaltyParams(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('royalty_params', builder.build()))
            .stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }
}
