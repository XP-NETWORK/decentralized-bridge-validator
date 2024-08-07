//@ts-nocheck
import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
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
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
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
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    let _minter = sc_0.loadAddress();
    let _item_id = sc_0.loadIntBig(257);
    let _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeRef(src.forward_payload);
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadRef();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeRef(src.forward_payload);
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.loadRef();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type HiFromDeployNFT721Storage = {
    $$type: 'HiFromDeployNFT721Storage';
    sourceNftContractAddress: Address;
    storageAddress: Address;
    isOriginal: boolean;
    key: bigint;
    tokenId: bigint;
    destinationChain: Cell;
    destinationUserAddress: Cell;
    sourceNftContractAddressLock: Cell;
    sourceChain: string;
    nftItemAddress: Address;
    metaDataUri: Cell;
}

export function storeHiFromDeployNFT721Storage(src: HiFromDeployNFT721Storage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3149664349, 32);
        b_0.storeAddress(src.sourceNftContractAddress);
        b_0.storeAddress(src.storageAddress);
        b_0.storeBit(src.isOriginal);
        b_0.storeInt(src.key, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.tokenId, 257);
        b_1.storeRef(src.destinationChain);
        b_1.storeRef(src.destinationUserAddress);
        b_1.storeRef(src.sourceNftContractAddressLock);
        let b_2 = new Builder();
        b_2.storeStringRefTail(src.sourceChain);
        b_2.storeAddress(src.nftItemAddress);
        b_2.storeRef(src.metaDataUri);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadHiFromDeployNFT721Storage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3149664349) { throw Error('Invalid prefix'); }
    let _sourceNftContractAddress = sc_0.loadAddress();
    let _storageAddress = sc_0.loadAddress();
    let _isOriginal = sc_0.loadBit();
    let _key = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _tokenId = sc_1.loadIntBig(257);
    let _destinationChain = sc_1.loadRef();
    let _destinationUserAddress = sc_1.loadRef();
    let _sourceNftContractAddressLock = sc_1.loadRef();
    let sc_2 = sc_1.loadRef().beginParse();
    let _sourceChain = sc_2.loadStringRefTail();
    let _nftItemAddress = sc_2.loadAddress();
    let _metaDataUri = sc_2.loadRef();
    return { $$type: 'HiFromDeployNFT721Storage' as const, sourceNftContractAddress: _sourceNftContractAddress, storageAddress: _storageAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri };
}

function loadTupleHiFromDeployNFT721Storage(source: TupleReader) {
    let _sourceNftContractAddress = source.readAddress();
    let _storageAddress = source.readAddress();
    let _isOriginal = source.readBoolean();
    let _key = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _destinationChain = source.readCell();
    let _destinationUserAddress = source.readCell();
    let _sourceNftContractAddressLock = source.readCell();
    let _sourceChain = source.readString();
    let _nftItemAddress = source.readAddress();
    let _metaDataUri = source.readCell();
    return { $$type: 'HiFromDeployNFT721Storage' as const, sourceNftContractAddress: _sourceNftContractAddress, storageAddress: _storageAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri };
}

function storeTupleHiFromDeployNFT721Storage(source: HiFromDeployNFT721Storage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sourceNftContractAddress);
    builder.writeAddress(source.storageAddress);
    builder.writeBoolean(source.isOriginal);
    builder.writeNumber(source.key);
    builder.writeNumber(source.tokenId);
    builder.writeCell(source.destinationChain);
    builder.writeCell(source.destinationUserAddress);
    builder.writeSlice(source.sourceNftContractAddressLock);
    builder.writeString(source.sourceChain);
    builder.writeAddress(source.nftItemAddress);
    builder.writeCell(source.metaDataUri);
    return builder.build();
}

function dictValueParserHiFromDeployNFT721Storage(): DictionaryValue<HiFromDeployNFT721Storage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeHiFromDeployNFT721Storage(src)).endCell());
        },
        parse: (src) => {
            return loadHiFromDeployNFT721Storage(src.loadRef().beginParse());
        }
    }
}

export type HiFromDeployNFT721Collection = {
    $$type: 'HiFromDeployNFT721Collection';
    tokenId: bigint;
    newlyDeployCollection: Address;
    sourceChain: string;
    transactionHash: string;
    lockTxChain: string;
}

export function storeHiFromDeployNFT721Collection(src: HiFromDeployNFT721Collection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1037677720, 32);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeAddress(src.newlyDeployCollection);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.transactionHash);
        b_0.storeStringRefTail(src.lockTxChain);
    };
}

export function loadHiFromDeployNFT721Collection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1037677720) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(256);
    let _newlyDeployCollection = sc_0.loadAddress();
    let _sourceChain = sc_0.loadStringRefTail();
    let _transactionHash = sc_0.loadStringRefTail();
    let _lockTxChain = sc_0.loadStringRefTail();
    return { $$type: 'HiFromDeployNFT721Collection' as const, tokenId: _tokenId, newlyDeployCollection: _newlyDeployCollection, sourceChain: _sourceChain, transactionHash: _transactionHash, lockTxChain: _lockTxChain };
}

function loadTupleHiFromDeployNFT721Collection(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _newlyDeployCollection = source.readAddress();
    let _sourceChain = source.readString();
    let _transactionHash = source.readString();
    let _lockTxChain = source.readString();
    return { $$type: 'HiFromDeployNFT721Collection' as const, tokenId: _tokenId, newlyDeployCollection: _newlyDeployCollection, sourceChain: _sourceChain, transactionHash: _transactionHash, lockTxChain: _lockTxChain };
}

function storeTupleHiFromDeployNFT721Collection(source: HiFromDeployNFT721Collection) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.newlyDeployCollection);
    builder.writeString(source.sourceChain);
    builder.writeString(source.transactionHash);
    builder.writeString(source.lockTxChain);
    return builder.build();
}

function dictValueParserHiFromDeployNFT721Collection(): DictionaryValue<HiFromDeployNFT721Collection> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeHiFromDeployNFT721Collection(src)).endCell());
        },
        parse: (src) => {
            return loadHiFromDeployNFT721Collection(src.loadRef().beginParse());
        }
    }
}

export type CollectionDeploy = {
    $$type: 'CollectionDeploy';
    newOwner: Address;
    metadata: Cell;
    token_id: bigint;
    bridge: Address;
    fee: bigint;
}

export function storeCollectionDeploy(src: CollectionDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1027458158, 32);
        b_0.storeAddress(src.newOwner);
        b_0.storeRef(src.metadata);
        b_0.storeInt(src.token_id, 257);
        b_0.storeAddress(src.bridge);
        let b_1 = new Builder();
        b_1.storeInt(src.fee, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCollectionDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1027458158) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    let _metadata = sc_0.loadRef();
    let _token_id = sc_0.loadIntBig(257);
    let _bridge = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee = sc_1.loadIntBig(257);
    return { $$type: 'CollectionDeploy' as const, newOwner: _newOwner, metadata: _metadata, token_id: _token_id, bridge: _bridge, fee: _fee };
}

function loadTupleCollectionDeploy(source: TupleReader) {
    let _newOwner = source.readAddress();
    let _metadata = source.readCell();
    let _token_id = source.readBigNumber();
    let _bridge = source.readAddress();
    let _fee = source.readBigNumber();
    return { $$type: 'CollectionDeploy' as const, newOwner: _newOwner, metadata: _metadata, token_id: _token_id, bridge: _bridge, fee: _fee };
}

function storeTupleCollectionDeploy(source: CollectionDeploy) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    builder.writeCell(source.metadata);
    builder.writeNumber(source.token_id);
    builder.writeAddress(source.bridge);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserCollectionDeploy(): DictionaryValue<CollectionDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionDeploy(src.loadRef().beginParse());
        }
    }
}

export type StorageDeploy = {
    $$type: 'StorageDeploy';
    sourceNftContractAddress: Address;
    isOriginal: boolean;
    key: bigint;
    tokenId: bigint;
    destinationChain: Cell;
    destinationUserAddress: Cell;
    sourceNftContractAddressLock: Cell;
    sourceChain: string;
    nftItemAddress: Address;
    metaDataUri: Cell;
}

export function storeStorageDeploy(src: StorageDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3539326362, 32);
        b_0.storeAddress(src.sourceNftContractAddress);
        b_0.storeBit(src.isOriginal);
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeRef(src.destinationChain);
        b_0.storeRef(src.destinationUserAddress);
        b_0.storeRef(src.sourceNftContractAddressLock);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.sourceChain);
        b_1.storeAddress(src.nftItemAddress);
        b_1.storeRef(src.metaDataUri);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStorageDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3539326362) { throw Error('Invalid prefix'); }
    let _sourceNftContractAddress = sc_0.loadAddress();
    let _isOriginal = sc_0.loadBit();
    let _key = sc_0.loadIntBig(257);
    let _tokenId = sc_0.loadIntBig(257);
    let _destinationChain = sc_0.loadRef();
    let _destinationUserAddress = sc_0.loadRef();
    let _sourceNftContractAddressLock = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _sourceChain = sc_1.loadStringRefTail();
    let _nftItemAddress = sc_1.loadAddress();
    let _metaDataUri = sc_1.loadRef();
    return { $$type: 'StorageDeploy' as const, sourceNftContractAddress: _sourceNftContractAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri };
}

function loadTupleStorageDeploy(source: TupleReader) {
    let _sourceNftContractAddress = source.readAddress();
    let _isOriginal = source.readBoolean();
    let _key = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _destinationChain = source.readCell();
    let _destinationUserAddress = source.readCell();
    let _sourceNftContractAddressLock = source.readCell();
    let _sourceChain = source.readString();
    let _nftItemAddress = source.readAddress();
    let _metaDataUri = source.readCell();
    return { $$type: 'StorageDeploy' as const, sourceNftContractAddress: _sourceNftContractAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri };
}

function storeTupleStorageDeploy(source: StorageDeploy) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sourceNftContractAddress);
    builder.writeBoolean(source.isOriginal);
    builder.writeNumber(source.key);
    builder.writeNumber(source.tokenId);
    builder.writeCell(source.destinationChain);
    builder.writeCell(source.destinationUserAddress);
    builder.writeSlice(source.sourceNftContractAddressLock);
    builder.writeString(source.sourceChain);
    builder.writeAddress(source.nftItemAddress);
    builder.writeCell(source.metaDataUri);
    return builder.build();
}

function dictValueParserStorageDeploy(): DictionaryValue<StorageDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStorageDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadStorageDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployNFT721Storage = {
    $$type: 'DeployNFT721Storage';
    collectionAddress: Address;
    isOriginal: boolean;
    key: bigint;
    tokenId: bigint;
    destinationChain: Cell;
    destinationUserAddress: Cell;
    sourceNftContractAddressLock: Cell;
    sourceChain: string;
    nftItemAddress: Address;
    metaDataUri: Cell;
}

export function storeDeployNFT721Storage(src: DeployNFT721Storage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1019847713, 32);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeBit(src.isOriginal);
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeRef(src.destinationChain);
        b_0.storeRef(src.destinationUserAddress);
        b_0.storeRef(src.sourceNftContractAddressLock);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.sourceChain);
        b_1.storeAddress(src.nftItemAddress);
        b_1.storeRef(src.metaDataUri);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployNFT721Storage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1019847713) { throw Error('Invalid prefix'); }
    let _collectionAddress = sc_0.loadAddress();
    let _isOriginal = sc_0.loadBit();
    let _key = sc_0.loadIntBig(257);
    let _tokenId = sc_0.loadIntBig(257);
    let _destinationChain = sc_0.loadRef();
    let _destinationUserAddress = sc_0.loadRef();
    let _sourceNftContractAddressLock = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _sourceChain = sc_1.loadStringRefTail();
    let _nftItemAddress = sc_1.loadAddress();
    let _metaDataUri = sc_1.loadRef();
    return { $$type: 'DeployNFT721Storage' as const, collectionAddress: _collectionAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri };
}

function loadTupleDeployNFT721Storage(source: TupleReader) {
    let _collectionAddress = source.readAddress();
    let _isOriginal = source.readBoolean();
    let _key = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _destinationChain = source.readCell();
    let _destinationUserAddress = source.readCell();
    let _sourceNftContractAddressLock = source.readCell();
    let _sourceChain = source.readString();
    let _nftItemAddress = source.readAddress();
    let _metaDataUri = source.readCell();
    return { $$type: 'DeployNFT721Storage' as const, collectionAddress: _collectionAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri };
}

function storeTupleDeployNFT721Storage(source: DeployNFT721Storage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collectionAddress);
    builder.writeBoolean(source.isOriginal);
    builder.writeNumber(source.key);
    builder.writeNumber(source.tokenId);
    builder.writeCell(source.destinationChain);
    builder.writeCell(source.destinationUserAddress);
    builder.writeSlice(source.sourceNftContractAddressLock);
    builder.writeString(source.sourceChain);
    builder.writeAddress(source.nftItemAddress);
    builder.writeCell(source.metaDataUri);
    return builder.build();
}

function dictValueParserDeployNFT721Storage(): DictionaryValue<DeployNFT721Storage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployNFT721Storage(src)).endCell());
        },
        parse: (src) => {
            return loadDeployNFT721Storage(src.loadRef().beginParse());
        }
    }
}

export type DeployNFT721Collection = {
    $$type: 'DeployNFT721Collection';
    collection_content: Cell;
    royalty_params: RoyaltyParams;
    destination_user_address: Address;
    source_chain: string;
    transaction_hash: string;
    metadata: Cell;
    token_id: bigint;
    lockTxChain: string;
    fee: bigint;
}

export function storeDeployNFT721Collection(src: DeployNFT721Collection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2501624698, 32);
        b_0.storeRef(src.collection_content);
        b_0.store(storeRoyaltyParams(src.royalty_params));
        let b_1 = new Builder();
        b_1.storeAddress(src.destination_user_address);
        b_1.storeStringRefTail(src.source_chain);
        b_1.storeStringRefTail(src.transaction_hash);
        b_1.storeRef(src.metadata);
        b_1.storeInt(src.token_id, 257);
        let b_2 = new Builder();
        b_2.storeStringRefTail(src.lockTxChain);
        b_2.storeInt(src.fee, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployNFT721Collection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2501624698) { throw Error('Invalid prefix'); }
    let _collection_content = sc_0.loadRef();
    let _royalty_params = loadRoyaltyParams(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _destination_user_address = sc_1.loadAddress();
    let _source_chain = sc_1.loadStringRefTail();
    let _transaction_hash = sc_1.loadStringRefTail();
    let _metadata = sc_1.loadRef();
    let _token_id = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _lockTxChain = sc_2.loadStringRefTail();
    let _fee = sc_2.loadIntBig(257);
    return { $$type: 'DeployNFT721Collection' as const, collection_content: _collection_content, royalty_params: _royalty_params, destination_user_address: _destination_user_address, source_chain: _source_chain, transaction_hash: _transaction_hash, metadata: _metadata, token_id: _token_id, lockTxChain: _lockTxChain, fee: _fee };
}

function loadTupleDeployNFT721Collection(source: TupleReader) {
    let _collection_content = source.readCell();
    const _royalty_params = loadTupleRoyaltyParams(source.readTuple());
    let _destination_user_address = source.readAddress();
    let _source_chain = source.readString();
    let _transaction_hash = source.readString();
    let _metadata = source.readCell();
    let _token_id = source.readBigNumber();
    let _lockTxChain = source.readString();
    let _fee = source.readBigNumber();
    return { $$type: 'DeployNFT721Collection' as const, collection_content: _collection_content, royalty_params: _royalty_params, destination_user_address: _destination_user_address, source_chain: _source_chain, transaction_hash: _transaction_hash, metadata: _metadata, token_id: _token_id, lockTxChain: _lockTxChain, fee: _fee };
}

function storeTupleDeployNFT721Collection(source: DeployNFT721Collection) {
    let builder = new TupleBuilder();
    builder.writeCell(source.collection_content);
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty_params));
    builder.writeAddress(source.destination_user_address);
    builder.writeString(source.source_chain);
    builder.writeString(source.transaction_hash);
    builder.writeCell(source.metadata);
    builder.writeNumber(source.token_id);
    builder.writeString(source.lockTxChain);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserDeployNFT721Collection(): DictionaryValue<DeployNFT721Collection> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployNFT721Collection(src)).endCell());
        },
        parse: (src) => {
            return loadDeployNFT721Collection(src.loadRef().beginParse());
        }
    }
}

export type CreatedCollection = {
    $$type: 'CreatedCollection';
    collectionAddress: Address;
}

export function storeCreatedCollection(src: CreatedCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(41705028, 32);
        b_0.storeAddress(src.collectionAddress);
    };
}

export function loadCreatedCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 41705028) { throw Error('Invalid prefix'); }
    let _collectionAddress = sc_0.loadAddress();
    return { $$type: 'CreatedCollection' as const, collectionAddress: _collectionAddress };
}

function loadTupleCreatedCollection(source: TupleReader) {
    let _collectionAddress = source.readAddress();
    return { $$type: 'CreatedCollection' as const, collectionAddress: _collectionAddress };
}

function storeTupleCreatedCollection(source: CreatedCollection) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collectionAddress);
    return builder.build();
}

function dictValueParserCreatedCollection(): DictionaryValue<CreatedCollection> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreatedCollection(src)).endCell());
        },
        parse: (src) => {
            return loadCreatedCollection(src.loadRef().beginParse());
        }
    }
}

export type UnlockToken = {
    $$type: 'UnlockToken';
    to: Address;
    token_id: bigint;
}

export function storeUnlockToken(src: UnlockToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2585927731, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.token_id, 257);
    };
}

export function loadUnlockToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2585927731) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _token_id = sc_0.loadIntBig(257);
    return { $$type: 'UnlockToken' as const, to: _to, token_id: _token_id };
}

function loadTupleUnlockToken(source: TupleReader) {
    let _to = source.readAddress();
    let _token_id = source.readBigNumber();
    return { $$type: 'UnlockToken' as const, to: _to, token_id: _token_id };
}

function storeTupleUnlockToken(source: UnlockToken) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.token_id);
    return builder.build();
}

function dictValueParserUnlockToken(): DictionaryValue<UnlockToken> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUnlockToken(src)).endCell());
        },
        parse: (src) => {
            return loadUnlockToken(src.loadRef().beginParse());
        }
    }
}

export type MintOne = {
    $$type: 'MintOne';
    new_owner: Address;
    content: Cell;
    bridge: Address;
    fee: bigint;
}

export function storeMintOne(src: MintOne) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2904992044, 32);
        b_0.storeAddress(src.new_owner);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.bridge);
        b_0.storeInt(src.fee, 257);
    };
}

export function loadMintOne(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2904992044) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _bridge = sc_0.loadAddress();
    let _fee = sc_0.loadIntBig(257);
    return { $$type: 'MintOne' as const, new_owner: _new_owner, content: _content, bridge: _bridge, fee: _fee };
}

function loadTupleMintOne(source: TupleReader) {
    let _new_owner = source.readAddress();
    let _content = source.readCell();
    let _bridge = source.readAddress();
    let _fee = source.readBigNumber();
    return { $$type: 'MintOne' as const, new_owner: _new_owner, content: _content, bridge: _bridge, fee: _fee };
}

function storeTupleMintOne(source: MintOne) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    builder.writeCell(source.content);
    builder.writeAddress(source.bridge);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserMintOne(): DictionaryValue<MintOne> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintOne(src)).endCell());
        },
        parse: (src) => {
            return loadMintOne(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    token_id: bigint;
    owner: Address;
    content: Cell;
    fee: bigint;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1077380115, 32);
        b_0.storeInt(src.token_id, 257);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeInt(src.fee, 257);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1077380115) { throw Error('Invalid prefix'); }
    let _token_id = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _fee = sc_0.loadIntBig(257);
    return { $$type: 'Mint' as const, token_id: _token_id, owner: _owner, content: _content, fee: _fee };
}

function loadTupleMint(source: TupleReader) {
    let _token_id = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _fee = source.readBigNumber();
    return { $$type: 'Mint' as const, token_id: _token_id, owner: _owner, content: _content, fee: _fee };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.token_id);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type Validator = {
    $$type: 'Validator';
    address: Address;
    added: boolean;
    pendingRewards: bigint;
}

export function storeValidator(src: Validator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeBit(src.added);
        b_0.storeCoins(src.pendingRewards);
    };
}

export function loadValidator(slice: Slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _added = sc_0.loadBit();
    let _pendingRewards = sc_0.loadCoins();
    return { $$type: 'Validator' as const, address: _address, added: _added, pendingRewards: _pendingRewards };
}

function loadTupleValidator(source: TupleReader) {
    let _address = source.readAddress();
    let _added = source.readBoolean();
    let _pendingRewards = source.readBigNumber();
    return { $$type: 'Validator' as const, address: _address, added: _added, pendingRewards: _pendingRewards };
}

function storeTupleValidator(source: Validator) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeBoolean(source.added);
    builder.writeNumber(source.pendingRewards);
    return builder.build();
}

function dictValueParserValidator(): DictionaryValue<Validator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeValidator(src)).endCell());
        },
        parse: (src) => {
            return loadValidator(src.loadRef().beginParse());
        }
    }
}

export type SignerAndSignature = {
    $$type: 'SignerAndSignature';
    signature: Cell;
    key: bigint;
}

export function storeSignerAndSignature(src: SignerAndSignature) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.signature);
        b_0.storeUint(src.key, 256);
    };
}

export function loadSignerAndSignature(slice: Slice) {
    let sc_0 = slice;
    let _signature = sc_0.loadRef();
    let _key = sc_0.loadUintBig(256);
    return { $$type: 'SignerAndSignature' as const, signature: _signature, key: _key };
}

function loadTupleSignerAndSignature(source: TupleReader) {
    let _signature = source.readCell();
    let _key = source.readBigNumber();
    return { $$type: 'SignerAndSignature' as const, signature: _signature, key: _key };
}

function storeTupleSignerAndSignature(source: SignerAndSignature) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.signature);
    builder.writeNumber(source.key);
    return builder.build();
}

function dictValueParserSignerAndSignature(): DictionaryValue<SignerAndSignature> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSignerAndSignature(src)).endCell());
        },
        parse: (src) => {
            return loadSignerAndSignature(src.loadRef().beginParse());
        }
    }
}

export type NewValidator = {
    $$type: 'NewValidator';
    key: bigint;
}

export function storeNewValidator(src: NewValidator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.key, 256);
    };
}

export function loadNewValidator(slice: Slice) {
    let sc_0 = slice;
    let _key = sc_0.loadUintBig(256);
    return { $$type: 'NewValidator' as const, key: _key };
}

function loadTupleNewValidator(source: TupleReader) {
    let _key = source.readBigNumber();
    return { $$type: 'NewValidator' as const, key: _key };
}

function storeTupleNewValidator(source: NewValidator) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    return builder.build();
}

function dictValueParserNewValidator(): DictionaryValue<NewValidator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNewValidator(src)).endCell());
        },
        parse: (src) => {
            return loadNewValidator(src.loadRef().beginParse());
        }
    }
}

export type ValidatorsToRewards = {
    $$type: 'ValidatorsToRewards';
    addresses: Dictionary<bigint, Address>;
    publicKeys: Dictionary<bigint, bigint>;
    len: bigint;
}

export function storeValidatorsToRewards(src: ValidatorsToRewards) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.addresses, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.publicKeys, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.len, 257);
    };
}

export function loadValidatorsToRewards(slice: Slice) {
    let sc_0 = slice;
    let _addresses = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _publicKeys = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    let _len = sc_0.loadIntBig(257);
    return { $$type: 'ValidatorsToRewards' as const, addresses: _addresses, publicKeys: _publicKeys, len: _len };
}

function loadTupleValidatorsToRewards(source: TupleReader) {
    let _addresses = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _publicKeys = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _len = source.readBigNumber();
    return { $$type: 'ValidatorsToRewards' as const, addresses: _addresses, publicKeys: _publicKeys, len: _len };
}

function storeTupleValidatorsToRewards(source: ValidatorsToRewards) {
    let builder = new TupleBuilder();
    builder.writeCell(source.addresses.size > 0 ? beginCell().storeDictDirect(source.addresses, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.publicKeys.size > 0 ? beginCell().storeDictDirect(source.publicKeys, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.len);
    return builder.build();
}

function dictValueParserValidatorsToRewards(): DictionaryValue<ValidatorsToRewards> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeValidatorsToRewards(src)).endCell());
        },
        parse: (src) => {
            return loadValidatorsToRewards(src.loadRef().beginParse());
        }
    }
}

export type DuplicateToOriginalContractInfo = {
    $$type: 'DuplicateToOriginalContractInfo';
    keyChain: string;
    chain: string;
    contractAddress: Cell;
    lastIndex: bigint;
    collectionContent: Cell;
}

export function storeDuplicateToOriginalContractInfo(src: DuplicateToOriginalContractInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.keyChain);
        b_0.storeStringRefTail(src.chain);
        b_0.storeRef(src.contractAddress);
        b_0.storeInt(src.lastIndex, 257);
        let b_1 = new Builder();
        b_1.storeRef(src.collectionContent);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDuplicateToOriginalContractInfo(slice: Slice) {
    let sc_0 = slice;
    let _keyChain = sc_0.loadStringRefTail();
    let _chain = sc_0.loadStringRefTail();
    let _contractAddress = sc_0.loadRef();
    let _lastIndex = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _collectionContent = sc_1.loadRef();
    return { $$type: 'DuplicateToOriginalContractInfo' as const, keyChain: _keyChain, chain: _chain, contractAddress: _contractAddress, lastIndex: _lastIndex, collectionContent: _collectionContent };
}

function loadTupleDuplicateToOriginalContractInfo(source: TupleReader) {
    let _keyChain = source.readString();
    let _chain = source.readString();
    let _contractAddress = source.readCell();
    let _lastIndex = source.readBigNumber();
    let _collectionContent = source.readCell();
    return { $$type: 'DuplicateToOriginalContractInfo' as const, keyChain: _keyChain, chain: _chain, contractAddress: _contractAddress, lastIndex: _lastIndex, collectionContent: _collectionContent };
}

function storeTupleDuplicateToOriginalContractInfo(source: DuplicateToOriginalContractInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.keyChain);
    builder.writeString(source.chain);
    builder.writeSlice(source.contractAddress);
    builder.writeNumber(source.lastIndex);
    builder.writeCell(source.collectionContent);
    return builder.build();
}

function dictValueParserDuplicateToOriginalContractInfo(): DictionaryValue<DuplicateToOriginalContractInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDuplicateToOriginalContractInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDuplicateToOriginalContractInfo(src.loadRef().beginParse());
        }
    }
}

export type OriginalToDuplicateContractInfo = {
    $$type: 'OriginalToDuplicateContractInfo';
    keyChain: string;
    chain: string;
    contractAddress: Address;
    lastIndex: bigint;
    collectionContent: Cell;
}

export function storeOriginalToDuplicateContractInfo(src: OriginalToDuplicateContractInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.keyChain);
        b_0.storeStringRefTail(src.chain);
        b_0.storeAddress(src.contractAddress);
        b_0.storeInt(src.lastIndex, 257);
        b_0.storeRef(src.collectionContent);
    };
}

export function loadOriginalToDuplicateContractInfo(slice: Slice) {
    let sc_0 = slice;
    let _keyChain = sc_0.loadStringRefTail();
    let _chain = sc_0.loadStringRefTail();
    let _contractAddress = sc_0.loadAddress();
    let _lastIndex = sc_0.loadIntBig(257);
    let _collectionContent = sc_0.loadRef();
    return { $$type: 'OriginalToDuplicateContractInfo' as const, keyChain: _keyChain, chain: _chain, contractAddress: _contractAddress, lastIndex: _lastIndex, collectionContent: _collectionContent };
}

function loadTupleOriginalToDuplicateContractInfo(source: TupleReader) {
    let _keyChain = source.readString();
    let _chain = source.readString();
    let _contractAddress = source.readAddress();
    let _lastIndex = source.readBigNumber();
    let _collectionContent = source.readCell();
    return { $$type: 'OriginalToDuplicateContractInfo' as const, keyChain: _keyChain, chain: _chain, contractAddress: _contractAddress, lastIndex: _lastIndex, collectionContent: _collectionContent };
}

function storeTupleOriginalToDuplicateContractInfo(source: OriginalToDuplicateContractInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.keyChain);
    builder.writeString(source.chain);
    builder.writeAddress(source.contractAddress);
    builder.writeNumber(source.lastIndex);
    builder.writeCell(source.collectionContent);
    return builder.build();
}

function dictValueParserOriginalToDuplicateContractInfo(): DictionaryValue<OriginalToDuplicateContractInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOriginalToDuplicateContractInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOriginalToDuplicateContractInfo(src.loadRef().beginParse());
        }
    }
}

export type ClaimData1 = {
    $$type: 'ClaimData1';
    tokenId: bigint;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: Address;
    tokenAmount: bigint;
}

export function storeClaimData1(src: ClaimData1) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tokenId, 64);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.destinationChain);
        b_0.storeAddress(src.destinationUserAddress);
        b_0.storeUint(src.tokenAmount, 64);
    };
}

export function loadClaimData1(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadUintBig(64);
    let _sourceChain = sc_0.loadStringRefTail();
    let _destinationChain = sc_0.loadStringRefTail();
    let _destinationUserAddress = sc_0.loadAddress();
    let _tokenAmount = sc_0.loadUintBig(64);
    return { $$type: 'ClaimData1' as const, tokenId: _tokenId, sourceChain: _sourceChain, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, tokenAmount: _tokenAmount };
}

function loadTupleClaimData1(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _sourceChain = source.readString();
    let _destinationChain = source.readString();
    let _destinationUserAddress = source.readAddress();
    let _tokenAmount = source.readBigNumber();
    return { $$type: 'ClaimData1' as const, tokenId: _tokenId, sourceChain: _sourceChain, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, tokenAmount: _tokenAmount };
}

function storeTupleClaimData1(source: ClaimData1) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeString(source.sourceChain);
    builder.writeString(source.destinationChain);
    builder.writeAddress(source.destinationUserAddress);
    builder.writeNumber(source.tokenAmount);
    return builder.build();
}

function dictValueParserClaimData1(): DictionaryValue<ClaimData1> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimData1(src)).endCell());
        },
        parse: (src) => {
            return loadClaimData1(src.loadRef().beginParse());
        }
    }
}

export type ClaimData2 = {
    $$type: 'ClaimData2';
    name: string;
    symbol: string;
    nftType: string;
}

export function storeClaimData2(src: ClaimData2) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.symbol);
        b_0.storeStringRefTail(src.nftType);
    };
}

export function loadClaimData2(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _symbol = sc_0.loadStringRefTail();
    let _nftType = sc_0.loadStringRefTail();
    return { $$type: 'ClaimData2' as const, name: _name, symbol: _symbol, nftType: _nftType };
}

function loadTupleClaimData2(source: TupleReader) {
    let _name = source.readString();
    let _symbol = source.readString();
    let _nftType = source.readString();
    return { $$type: 'ClaimData2' as const, name: _name, symbol: _symbol, nftType: _nftType };
}

function storeTupleClaimData2(source: ClaimData2) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.symbol);
    builder.writeString(source.nftType);
    return builder.build();
}

function dictValueParserClaimData2(): DictionaryValue<ClaimData2> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimData2(src)).endCell());
        },
        parse: (src) => {
            return loadClaimData2(src.loadRef().beginParse());
        }
    }
}

export type ClaimData3 = {
    $$type: 'ClaimData3';
    fee: bigint;
    sourceNftContractAddress: Cell;
    royaltyReceiver: Address;
    metadata: Cell;
}

export function storeClaimData3(src: ClaimData3) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.fee, 64);
        b_0.storeRef(src.sourceNftContractAddress);
        b_0.storeAddress(src.royaltyReceiver);
        b_0.storeRef(src.metadata);
    };
}

export function loadClaimData3(slice: Slice) {
    let sc_0 = slice;
    let _fee = sc_0.loadUintBig(64);
    let _sourceNftContractAddress = sc_0.loadRef();
    let _royaltyReceiver = sc_0.loadAddress();
    let _metadata = sc_0.loadRef();
    return { $$type: 'ClaimData3' as const, fee: _fee, sourceNftContractAddress: _sourceNftContractAddress, royaltyReceiver: _royaltyReceiver, metadata: _metadata };
}

function loadTupleClaimData3(source: TupleReader) {
    let _fee = source.readBigNumber();
    let _sourceNftContractAddress = source.readCell();
    let _royaltyReceiver = source.readAddress();
    let _metadata = source.readCell();
    return { $$type: 'ClaimData3' as const, fee: _fee, sourceNftContractAddress: _sourceNftContractAddress, royaltyReceiver: _royaltyReceiver, metadata: _metadata };
}

function storeTupleClaimData3(source: ClaimData3) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fee);
    builder.writeSlice(source.sourceNftContractAddress);
    builder.writeAddress(source.royaltyReceiver);
    builder.writeCell(source.metadata);
    return builder.build();
}

function dictValueParserClaimData3(): DictionaryValue<ClaimData3> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimData3(src)).endCell());
        },
        parse: (src) => {
            return loadClaimData3(src.loadRef().beginParse());
        }
    }
}

export type ClaimData4 = {
    $$type: 'ClaimData4';
    newContent: Cell;
    transactionHash: string;
    royalty: RoyaltyParams;
    lockTxChain: string;
}

export function storeClaimData4(src: ClaimData4) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.newContent);
        b_0.storeStringRefTail(src.transactionHash);
        b_0.store(storeRoyaltyParams(src.royalty));
        b_0.storeStringRefTail(src.lockTxChain);
    };
}

export function loadClaimData4(slice: Slice) {
    let sc_0 = slice;
    let _newContent = sc_0.loadRef();
    let _transactionHash = sc_0.loadStringRefTail();
    let _royalty = loadRoyaltyParams(sc_0);
    let _lockTxChain = sc_0.loadStringRefTail();
    return { $$type: 'ClaimData4' as const, newContent: _newContent, transactionHash: _transactionHash, royalty: _royalty, lockTxChain: _lockTxChain };
}

function loadTupleClaimData4(source: TupleReader) {
    let _newContent = source.readCell();
    let _transactionHash = source.readString();
    const _royalty = loadTupleRoyaltyParams(source.readTuple());
    let _lockTxChain = source.readString();
    return { $$type: 'ClaimData4' as const, newContent: _newContent, transactionHash: _transactionHash, royalty: _royalty, lockTxChain: _lockTxChain };
}

function storeTupleClaimData4(source: ClaimData4) {
    let builder = new TupleBuilder();
    builder.writeCell(source.newContent);
    builder.writeString(source.transactionHash);
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    builder.writeString(source.lockTxChain);
    return builder.build();
}

function dictValueParserClaimData4(): DictionaryValue<ClaimData4> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimData4(src)).endCell());
        },
        parse: (src) => {
            return loadClaimData4(src.loadRef().beginParse());
        }
    }
}

export type ClaimData = {
    $$type: 'ClaimData';
    data1: ClaimData1;
    data2: ClaimData2;
    data3: ClaimData3;
    data4: ClaimData4;
}

export function storeClaimData(src: ClaimData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeClaimData1(src.data1));
        let b_1 = new Builder();
        b_1.store(storeClaimData2(src.data2));
        let b_2 = new Builder();
        b_2.store(storeClaimData3(src.data3));
        let b_3 = new Builder();
        b_3.store(storeClaimData4(src.data4));
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadClaimData(slice: Slice) {
    let sc_0 = slice;
    let _data1 = loadClaimData1(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _data2 = loadClaimData2(sc_1);
    let sc_2 = sc_1.loadRef().beginParse();
    let _data3 = loadClaimData3(sc_2);
    let sc_3 = sc_2.loadRef().beginParse();
    let _data4 = loadClaimData4(sc_3);
    return { $$type: 'ClaimData' as const, data1: _data1, data2: _data2, data3: _data3, data4: _data4 };
}

function loadTupleClaimData(source: TupleReader) {
    const _data1 = loadTupleClaimData1(source.readTuple());
    const _data2 = loadTupleClaimData2(source.readTuple());
    const _data3 = loadTupleClaimData3(source.readTuple());
    const _data4 = loadTupleClaimData4(source.readTuple());
    return { $$type: 'ClaimData' as const, data1: _data1, data2: _data2, data3: _data3, data4: _data4 };
}

function storeTupleClaimData(source: ClaimData) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleClaimData1(source.data1));
    builder.writeTuple(storeTupleClaimData2(source.data2));
    builder.writeTuple(storeTupleClaimData3(source.data3));
    builder.writeTuple(storeTupleClaimData4(source.data4));
    return builder.build();
}

function dictValueParserClaimData(): DictionaryValue<ClaimData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimData(src)).endCell());
        },
        parse: (src) => {
            return loadClaimData(src.loadRef().beginParse());
        }
    }
}

export type Token = {
    $$type: 'Token';
    tokenId: bigint;
    chain: string;
    contractAddress: Cell;
}

export function storeToken(src: Token) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.tokenId, 257);
        b_0.storeStringRefTail(src.chain);
        b_0.storeRef(src.contractAddress);
    };
}

export function loadToken(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadIntBig(257);
    let _chain = sc_0.loadStringRefTail();
    let _contractAddress = sc_0.loadRef();
    return { $$type: 'Token' as const, tokenId: _tokenId, chain: _chain, contractAddress: _contractAddress };
}

function loadTupleToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _chain = source.readString();
    let _contractAddress = source.readCell();
    return { $$type: 'Token' as const, tokenId: _tokenId, chain: _chain, contractAddress: _contractAddress };
}

function storeTupleToken(source: Token) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeString(source.chain);
    builder.writeSlice(source.contractAddress);
    return builder.build();
}

function dictValueParserToken(): DictionaryValue<Token> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeToken(src)).endCell());
        },
        parse: (src) => {
            return loadToken(src.loadRef().beginParse());
        }
    }
}

export type AddValidator = {
    $$type: 'AddValidator';
    newValidatorPublicKey: NewValidator;
    newValidatorAddress: Address;
    sigs: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
}

export function storeAddValidator(src: AddValidator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3868963206, 32);
        b_0.store(storeNewValidator(src.newValidatorPublicKey));
        b_0.storeAddress(src.newValidatorAddress);
        b_0.storeDict(src.sigs, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        b_0.storeUint(src.len, 256);
    };
}

export function loadAddValidator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3868963206) { throw Error('Invalid prefix'); }
    let _newValidatorPublicKey = loadNewValidator(sc_0);
    let _newValidatorAddress = sc_0.loadAddress();
    let _sigs = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_0);
    let _len = sc_0.loadUintBig(256);
    return { $$type: 'AddValidator' as const, newValidatorPublicKey: _newValidatorPublicKey, newValidatorAddress: _newValidatorAddress, sigs: _sigs, len: _len };
}

function loadTupleAddValidator(source: TupleReader) {
    const _newValidatorPublicKey = loadTupleNewValidator(source.readTuple());
    let _newValidatorAddress = source.readAddress();
    let _sigs = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), source.readCellOpt());
    let _len = source.readBigNumber();
    return { $$type: 'AddValidator' as const, newValidatorPublicKey: _newValidatorPublicKey, newValidatorAddress: _newValidatorAddress, sigs: _sigs, len: _len };
}

function storeTupleAddValidator(source: AddValidator) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleNewValidator(source.newValidatorPublicKey));
    builder.writeAddress(source.newValidatorAddress);
    builder.writeCell(source.sigs.size > 0 ? beginCell().storeDictDirect(source.sigs, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature()).endCell() : null);
    builder.writeNumber(source.len);
    return builder.build();
}

function dictValueParserAddValidator(): DictionaryValue<AddValidator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddValidator(src)).endCell());
        },
        parse: (src) => {
            return loadAddValidator(src.loadRef().beginParse());
        }
    }
}

export type RewardValidator = {
    $$type: 'RewardValidator';
    validator: NewValidator;
}

export function storeRewardValidator(src: RewardValidator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1316982074, 32);
        b_0.store(storeNewValidator(src.validator));
    };
}

export function loadRewardValidator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1316982074) { throw Error('Invalid prefix'); }
    let _validator = loadNewValidator(sc_0);
    return { $$type: 'RewardValidator' as const, validator: _validator };
}

function loadTupleRewardValidator(source: TupleReader) {
    const _validator = loadTupleNewValidator(source.readTuple());
    return { $$type: 'RewardValidator' as const, validator: _validator };
}

function storeTupleRewardValidator(source: RewardValidator) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleNewValidator(source.validator));
    return builder.build();
}

function dictValueParserRewardValidator(): DictionaryValue<RewardValidator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRewardValidator(src)).endCell());
        },
        parse: (src) => {
            return loadRewardValidator(src.loadRef().beginParse());
        }
    }
}

export type Lock721 = {
    $$type: 'Lock721';
    tokenId: bigint;
    destinationChain: Cell;
    destinationUserAddress: Cell;
    sourceNftContractAddress: Address;
    metaDataUri: Cell;
}

export function storeLock721(src: Lock721) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(62791907, 32);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeRef(src.destinationChain);
        b_0.storeRef(src.destinationUserAddress);
        b_0.storeAddress(src.sourceNftContractAddress);
        b_0.storeRef(src.metaDataUri);
    };
}

export function loadLock721(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 62791907) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(256);
    let _destinationChain = sc_0.loadRef();
    let _destinationUserAddress = sc_0.loadRef();
    let _sourceNftContractAddress = sc_0.loadAddress();
    let _metaDataUri = sc_0.loadRef();
    return { $$type: 'Lock721' as const, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddress: _sourceNftContractAddress, metaDataUri: _metaDataUri };
}

function loadTupleLock721(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _destinationChain = source.readCell();
    let _destinationUserAddress = source.readCell();
    let _sourceNftContractAddress = source.readAddress();
    let _metaDataUri = source.readCell();
    return { $$type: 'Lock721' as const, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddress: _sourceNftContractAddress, metaDataUri: _metaDataUri };
}

function storeTupleLock721(source: Lock721) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeCell(source.destinationChain);
    builder.writeCell(source.destinationUserAddress);
    builder.writeAddress(source.sourceNftContractAddress);
    builder.writeCell(source.metaDataUri);
    return builder.build();
}

function dictValueParserLock721(): DictionaryValue<Lock721> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLock721(src)).endCell());
        },
        parse: (src) => {
            return loadLock721(src.loadRef().beginParse());
        }
    }
}

export type ClaimNFT721 = {
    $$type: 'ClaimNFT721';
    data: ClaimData;
    signatures: Dictionary<bigint, SignerAndSignature>;
    len: bigint;
}

export function storeClaimNFT721(src: ClaimNFT721) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2933783886, 32);
        b_0.store(storeClaimData(src.data));
        b_0.storeDict(src.signatures, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
        b_0.storeUint(src.len, 256);
    };
}

export function loadClaimNFT721(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2933783886) { throw Error('Invalid prefix'); }
    let _data = loadClaimData(sc_0);
    let _signatures = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_0);
    let _len = sc_0.loadUintBig(256);
    return { $$type: 'ClaimNFT721' as const, data: _data, signatures: _signatures, len: _len };
}

function loadTupleClaimNFT721(source: TupleReader) {
    const _data = loadTupleClaimData(source.readTuple());
    let _signatures = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), source.readCellOpt());
    let _len = source.readBigNumber();
    return { $$type: 'ClaimNFT721' as const, data: _data, signatures: _signatures, len: _len };
}

function storeTupleClaimNFT721(source: ClaimNFT721) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleClaimData(source.data));
    builder.writeCell(source.signatures.size > 0 ? beginCell().storeDictDirect(source.signatures, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature()).endCell() : null);
    builder.writeNumber(source.len);
    return builder.build();
}

function dictValueParserClaimNFT721(): DictionaryValue<ClaimNFT721> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimNFT721(src)).endCell());
        },
        parse: (src) => {
            return loadClaimNFT721(src.loadRef().beginParse());
        }
    }
}

export type StakeEvent = {
    $$type: 'StakeEvent';
    amount: bigint;
    asd: string;
}

export function storeStakeEvent(src: StakeEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1284335502, 32);
        b_0.storeCoins(src.amount);
        b_0.storeStringRefTail(src.asd);
    };
}

export function loadStakeEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1284335502) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _asd = sc_0.loadStringRefTail();
    return { $$type: 'StakeEvent' as const, amount: _amount, asd: _asd };
}

function loadTupleStakeEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _asd = source.readString();
    return { $$type: 'StakeEvent' as const, amount: _amount, asd: _asd };
}

function storeTupleStakeEvent(source: StakeEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeString(source.asd);
    return builder.build();
}

function dictValueParserStakeEvent(): DictionaryValue<StakeEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStakeEvent(src)).endCell());
        },
        parse: (src) => {
            return loadStakeEvent(src.loadRef().beginParse());
        }
    }
}

export type AddNewValidatorEvent = {
    $$type: 'AddNewValidatorEvent';
    validator: bigint;
}

export function storeAddNewValidatorEvent(src: AddNewValidatorEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3100755976, 32);
        b_0.storeUint(src.validator, 256);
    };
}

export function loadAddNewValidatorEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3100755976) { throw Error('Invalid prefix'); }
    let _validator = sc_0.loadUintBig(256);
    return { $$type: 'AddNewValidatorEvent' as const, validator: _validator };
}

function loadTupleAddNewValidatorEvent(source: TupleReader) {
    let _validator = source.readBigNumber();
    return { $$type: 'AddNewValidatorEvent' as const, validator: _validator };
}

function storeTupleAddNewValidatorEvent(source: AddNewValidatorEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.validator);
    return builder.build();
}

function dictValueParserAddNewValidatorEvent(): DictionaryValue<AddNewValidatorEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddNewValidatorEvent(src)).endCell());
        },
        parse: (src) => {
            return loadAddNewValidatorEvent(src.loadRef().beginParse());
        }
    }
}

export type RewardValidatorEvent = {
    $$type: 'RewardValidatorEvent';
    validator: bigint;
}

export function storeRewardValidatorEvent(src: RewardValidatorEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2049240067, 32);
        b_0.storeUint(src.validator, 256);
    };
}

export function loadRewardValidatorEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2049240067) { throw Error('Invalid prefix'); }
    let _validator = sc_0.loadUintBig(256);
    return { $$type: 'RewardValidatorEvent' as const, validator: _validator };
}

function loadTupleRewardValidatorEvent(source: TupleReader) {
    let _validator = source.readBigNumber();
    return { $$type: 'RewardValidatorEvent' as const, validator: _validator };
}

function storeTupleRewardValidatorEvent(source: RewardValidatorEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.validator);
    return builder.build();
}

function dictValueParserRewardValidatorEvent(): DictionaryValue<RewardValidatorEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRewardValidatorEvent(src)).endCell());
        },
        parse: (src) => {
            return loadRewardValidatorEvent(src.loadRef().beginParse());
        }
    }
}

export type LockedEvent = {
    $$type: 'LockedEvent';
    tokenId: bigint;
    destinationChain: Cell;
    destinationUserAddress: Cell;
    sourceNftContractAddress: Cell;
    tokenAmount: bigint;
    nftType: string;
    sourceChain: string;
    metaDataUri: Cell;
}

export function storeLockedEvent(src: LockedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2105076052, 32);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeRef(src.destinationChain);
        b_0.storeRef(src.destinationUserAddress);
        b_0.storeRef(src.sourceNftContractAddress);
        b_0.storeUint(src.tokenAmount, 256);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.nftType);
        b_1.storeStringRefTail(src.sourceChain);
        b_1.storeRef(src.metaDataUri);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLockedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2105076052) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(256);
    let _destinationChain = sc_0.loadRef();
    let _destinationUserAddress = sc_0.loadRef();
    let _sourceNftContractAddress = sc_0.loadRef();
    let _tokenAmount = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _nftType = sc_1.loadStringRefTail();
    let _sourceChain = sc_1.loadStringRefTail();
    let _metaDataUri = sc_1.loadRef();
    return { $$type: 'LockedEvent' as const, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddress: _sourceNftContractAddress, tokenAmount: _tokenAmount, nftType: _nftType, sourceChain: _sourceChain, metaDataUri: _metaDataUri };
}

function loadTupleLockedEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _destinationChain = source.readCell();
    let _destinationUserAddress = source.readCell();
    let _sourceNftContractAddress = source.readCell();
    let _tokenAmount = source.readBigNumber();
    let _nftType = source.readString();
    let _sourceChain = source.readString();
    let _metaDataUri = source.readCell();
    return { $$type: 'LockedEvent' as const, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddress: _sourceNftContractAddress, tokenAmount: _tokenAmount, nftType: _nftType, sourceChain: _sourceChain, metaDataUri: _metaDataUri };
}

function storeTupleLockedEvent(source: LockedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeCell(source.destinationChain);
    builder.writeCell(source.destinationUserAddress);
    builder.writeSlice(source.sourceNftContractAddress);
    builder.writeNumber(source.tokenAmount);
    builder.writeString(source.nftType);
    builder.writeString(source.sourceChain);
    builder.writeCell(source.metaDataUri);
    return builder.build();
}

function dictValueParserLockedEvent(): DictionaryValue<LockedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLockedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLockedEvent(src.loadRef().beginParse());
        }
    }
}

export type UnLock721Event = {
    $$type: 'UnLock721Event';
    to: Address;
    tokenId: bigint;
    contractAddress: Address;
}

export function storeUnLock721Event(src: UnLock721Event) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2428616504, 32);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeAddress(src.contractAddress);
    };
}

export function loadUnLock721Event(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2428616504) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(256);
    let _contractAddress = sc_0.loadAddress();
    return { $$type: 'UnLock721Event' as const, to: _to, tokenId: _tokenId, contractAddress: _contractAddress };
}

function loadTupleUnLock721Event(source: TupleReader) {
    let _to = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _contractAddress = source.readAddress();
    return { $$type: 'UnLock721Event' as const, to: _to, tokenId: _tokenId, contractAddress: _contractAddress };
}

function storeTupleUnLock721Event(source: UnLock721Event) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.contractAddress);
    return builder.build();
}

function dictValueParserUnLock721Event(): DictionaryValue<UnLock721Event> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUnLock721Event(src)).endCell());
        },
        parse: (src) => {
            return loadUnLock721Event(src.loadRef().beginParse());
        }
    }
}

export type ClaimedEvent = {
    $$type: 'ClaimedEvent';
    lockTxChain: string;
    tokenId: bigint;
    newlyDeployCollection: Address;
    sourceChain: string;
    transactionHash: string;
}

export function storeClaimedEvent(src: ClaimedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2421062321, 32);
        b_0.storeStringRefTail(src.lockTxChain);
        b_0.storeUint(src.tokenId, 256);
        b_0.storeAddress(src.newlyDeployCollection);
        b_0.storeStringRefTail(src.sourceChain);
        b_0.storeStringRefTail(src.transactionHash);
    };
}

export function loadClaimedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2421062321) { throw Error('Invalid prefix'); }
    let _lockTxChain = sc_0.loadStringRefTail();
    let _tokenId = sc_0.loadUintBig(256);
    let _newlyDeployCollection = sc_0.loadAddress();
    let _sourceChain = sc_0.loadStringRefTail();
    let _transactionHash = sc_0.loadStringRefTail();
    return { $$type: 'ClaimedEvent' as const, lockTxChain: _lockTxChain, tokenId: _tokenId, newlyDeployCollection: _newlyDeployCollection, sourceChain: _sourceChain, transactionHash: _transactionHash };
}

function loadTupleClaimedEvent(source: TupleReader) {
    let _lockTxChain = source.readString();
    let _tokenId = source.readBigNumber();
    let _newlyDeployCollection = source.readAddress();
    let _sourceChain = source.readString();
    let _transactionHash = source.readString();
    return { $$type: 'ClaimedEvent' as const, lockTxChain: _lockTxChain, tokenId: _tokenId, newlyDeployCollection: _newlyDeployCollection, sourceChain: _sourceChain, transactionHash: _transactionHash };
}

function storeTupleClaimedEvent(source: ClaimedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.lockTxChain);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.newlyDeployCollection);
    builder.writeString(source.sourceChain);
    builder.writeString(source.transactionHash);
    return builder.build();
}

function dictValueParserClaimedEvent(): DictionaryValue<ClaimedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadClaimedEvent(src.loadRef().beginParse());
        }
    }
}

 type NftCollection_init_args = {
    $$type: 'NftCollection_init_args';
    owner_address: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;
}

function initNftCollection_init_args(src: NftCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.collection_content);
        let b_1 = new Builder();
        b_1.store(storeRoyaltyParams(src.royalty_params));
        b_0.storeRef(b_1.endCell());
    };
}

async function NftCollection_init(owner_address: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftCollection_init_args({ $$type: 'NftCollection_init_args', owner_address, collection_content, royalty_params })(builder);
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
    5637: { message: `No rewards available` },
    8704: { message: `already initialized` },
    8733: { message: `Only Storage Contract can call` },
    9414: { message: `Invalid destination chain!` },
    16053: { message: `Only owner can call` },
    35976: { message: `Only the owner can call this function` },
    36476: { message: `Validator does not exist!` },
    43094: { message: `Invalid fees` },
    43570: { message: `Data already processed!` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    52185: { message: `Threshold not reached!` },
    52761: { message: `Only collection deployer can call this message` },
    54233: { message: `Invalid bridge state` },
    54339: { message: `Invalid NFT type!` },
    54615: { message: `Insufficient balance` },
    62521: { message: `Must have signatures!` },
    62742: { message: `non-sequential NFTs` },
}

const NftCollection_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"HiFromDeployNFT721Storage","header":3149664349,"fields":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"storageAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"HiFromDeployNFT721Collection","header":1037677720,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"newlyDeployCollection","type":{"kind":"simple","type":"address","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"transactionHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CollectionDeploy","header":1027458158,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bridge","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StorageDeploy","header":3539326362,"fields":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DeployNFT721Storage","header":1019847713,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DeployNFT721Collection","header":2501624698,"fields":[{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"royalty_params","type":{"kind":"simple","type":"RoyaltyParams","optional":false}},{"name":"destination_user_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"source_chain","type":{"kind":"simple","type":"string","optional":false}},{"name":"transaction_hash","type":{"kind":"simple","type":"string","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreatedCollection","header":41705028,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UnlockToken","header":2585927731,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MintOne","header":2904992044,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"bridge","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Mint","header":1077380115,"fields":[{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Validator","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"added","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pendingRewards","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SignerAndSignature","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"NewValidator","header":null,"fields":[{"name":"key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ValidatorsToRewards","header":null,"fields":[{"name":"addresses","type":{"kind":"dict","key":"int","value":"address"}},{"name":"publicKeys","type":{"kind":"dict","key":"int","value":"int"}},{"name":"len","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DuplicateToOriginalContractInfo","header":null,"fields":[{"name":"keyChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"chain","type":{"kind":"simple","type":"string","optional":false}},{"name":"contractAddress","type":{"kind":"simple","type":"slice","optional":false}},{"name":"lastIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"OriginalToDuplicateContractInfo","header":null,"fields":[{"name":"keyChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"chain","type":{"kind":"simple","type":"string","optional":false}},{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ClaimData1","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"destinationChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenAmount","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimData2","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftType","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"ClaimData3","header":null,"fields":[{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"slice","optional":false}},{"name":"royaltyReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ClaimData4","header":null,"fields":[{"name":"newContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"transactionHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"royalty","type":{"kind":"simple","type":"RoyaltyParams","optional":false}},{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"ClaimData","header":null,"fields":[{"name":"data1","type":{"kind":"simple","type":"ClaimData1","optional":false}},{"name":"data2","type":{"kind":"simple","type":"ClaimData2","optional":false}},{"name":"data3","type":{"kind":"simple","type":"ClaimData3","optional":false}},{"name":"data4","type":{"kind":"simple","type":"ClaimData4","optional":false}}]},
    {"name":"Token","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"chain","type":{"kind":"simple","type":"string","optional":false}},{"name":"contractAddress","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"AddValidator","header":3868963206,"fields":[{"name":"newValidatorPublicKey","type":{"kind":"simple","type":"NewValidator","optional":false}},{"name":"newValidatorAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"sigs","type":{"kind":"dict","key":"int","value":"SignerAndSignature","valueFormat":"ref"}},{"name":"len","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"RewardValidator","header":1316982074,"fields":[{"name":"validator","type":{"kind":"simple","type":"NewValidator","optional":false}}]},
    {"name":"Lock721","header":62791907,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ClaimNFT721","header":2933783886,"fields":[{"name":"data","type":{"kind":"simple","type":"ClaimData","optional":false}},{"name":"signatures","type":{"kind":"dict","key":"int","value":"SignerAndSignature","valueFormat":"ref"}},{"name":"len","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"StakeEvent","header":1284335502,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"asd","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"AddNewValidatorEvent","header":3100755976,"fields":[{"name":"validator","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"RewardValidatorEvent","header":2049240067,"fields":[{"name":"validator","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"LockedEvent","header":2105076052,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"slice","optional":false}},{"name":"tokenAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"nftType","type":{"kind":"simple","type":"string","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UnLock721Event","header":2428616504,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimedEvent","header":2421062321,"fields":[{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"newlyDeployCollection","type":{"kind":"simple","type":"address","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"transactionHash","type":{"kind":"simple","type":"string","optional":false}}]},
]

const NftCollection_getters: ABIGetter[] = [
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"getNftItemInit","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"royalty_params","arguments":[],"returnType":{"kind":"simple","type":"RoyaltyParams","optional":false}},
]

const NftCollection_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CollectionDeploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetRoyaltyParams"}},
]

export class NftCollection implements Contract {
    
    static async init(owner_address: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        return await NftCollection_init(owner_address, collection_content, royalty_params);
    }
    
    static async fromInit(owner_address: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        const init = await NftCollection_init(owner_address, collection_content, royalty_params);
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftCollection_types,
        getters: NftCollection_getters,
        receivers: NftCollection_receivers,
        errors: NftCollection_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CollectionDeploy | Mint | GetRoyaltyParams) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CollectionDeploy') {
            body = beginCell().store(storeCollectionDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadTupleStateInit(source);
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }
    
}