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
  sender: Address;
}

export function storeHiFromDeployNFT721Storage(src: HiFromDeployNFT721Storage) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1017107824, 32);
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
      b_2.storeAddress(src.sender);
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadHiFromDeployNFT721Storage(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1017107824) { throw Error('Invalid prefix'); }
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
  let _sender = sc_2.loadAddress();
  return { $$type: 'HiFromDeployNFT721Storage' as const, sourceNftContractAddress: _sourceNftContractAddress, storageAddress: _storageAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri, sender: _sender };
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
  let _sender = source.readAddress();
  return { $$type: 'HiFromDeployNFT721Storage' as const, sourceNftContractAddress: _sourceNftContractAddress, storageAddress: _storageAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri, sender: _sender };
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
  builder.writeAddress(source.sender);
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
}

export function storeCollectionDeploy(src: CollectionDeploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4033579765, 32);
      b_0.storeAddress(src.newOwner);
      b_0.storeRef(src.metadata);
      b_0.storeInt(src.token_id, 257);
  };
}

export function loadCollectionDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4033579765) { throw Error('Invalid prefix'); }
  let _newOwner = sc_0.loadAddress();
  let _metadata = sc_0.loadRef();
  let _token_id = sc_0.loadIntBig(257);
  return { $$type: 'CollectionDeploy' as const, newOwner: _newOwner, metadata: _metadata, token_id: _token_id };
}

function loadTupleCollectionDeploy(source: TupleReader) {
  let _newOwner = source.readAddress();
  let _metadata = source.readCell();
  let _token_id = source.readBigNumber();
  return { $$type: 'CollectionDeploy' as const, newOwner: _newOwner, metadata: _metadata, token_id: _token_id };
}

function storeTupleCollectionDeploy(source: CollectionDeploy) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.newOwner);
  builder.writeCell(source.metadata);
  builder.writeNumber(source.token_id);
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
  sender: Address;
}

export function storeStorageDeploy(src: StorageDeploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1498703807, 32);
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
      b_1.storeAddress(src.sender);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadStorageDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1498703807) { throw Error('Invalid prefix'); }
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
  let _sender = sc_1.loadAddress();
  return { $$type: 'StorageDeploy' as const, sourceNftContractAddress: _sourceNftContractAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri, sender: _sender };
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
  let _sender = source.readAddress();
  return { $$type: 'StorageDeploy' as const, sourceNftContractAddress: _sourceNftContractAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri, sender: _sender };
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
  builder.writeAddress(source.sender);
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
  sender: Address;
}

export function storeDeployNFT721Storage(src: DeployNFT721Storage) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3037136312, 32);
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
      b_1.storeAddress(src.sender);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadDeployNFT721Storage(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3037136312) { throw Error('Invalid prefix'); }
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
  let _sender = sc_1.loadAddress();
  return { $$type: 'DeployNFT721Storage' as const, collectionAddress: _collectionAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri, sender: _sender };
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
  let _sender = source.readAddress();
  return { $$type: 'DeployNFT721Storage' as const, collectionAddress: _collectionAddress, isOriginal: _isOriginal, key: _key, tokenId: _tokenId, destinationChain: _destinationChain, destinationUserAddress: _destinationUserAddress, sourceNftContractAddressLock: _sourceNftContractAddressLock, sourceChain: _sourceChain, nftItemAddress: _nftItemAddress, metaDataUri: _metaDataUri, sender: _sender };
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
  builder.writeAddress(source.sender);
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
}

export function storeDeployNFT721Collection(src: DeployNFT721Collection) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2399096803, 32);
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
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadDeployNFT721Collection(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2399096803) { throw Error('Invalid prefix'); }
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
  return { $$type: 'DeployNFT721Collection' as const, collection_content: _collection_content, royalty_params: _royalty_params, destination_user_address: _destination_user_address, source_chain: _source_chain, transaction_hash: _transaction_hash, metadata: _metadata, token_id: _token_id, lockTxChain: _lockTxChain };
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
  return { $$type: 'DeployNFT721Collection' as const, collection_content: _collection_content, royalty_params: _royalty_params, destination_user_address: _destination_user_address, source_chain: _source_chain, transaction_hash: _transaction_hash, metadata: _metadata, token_id: _token_id, lockTxChain: _lockTxChain };
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
}

export function storeMintOne(src: MintOne) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3338267266, 32);
      b_0.storeAddress(src.new_owner);
      b_0.storeRef(src.content);
  };
}

export function loadMintOne(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3338267266) { throw Error('Invalid prefix'); }
  let _new_owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  return { $$type: 'MintOne' as const, new_owner: _new_owner, content: _content };
}

function loadTupleMintOne(source: TupleReader) {
  let _new_owner = source.readAddress();
  let _content = source.readCell();
  return { $$type: 'MintOne' as const, new_owner: _new_owner, content: _content };
}

function storeTupleMintOne(source: MintOne) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_owner);
  builder.writeCell(source.content);
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
}

export function storeMint(src: Mint) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1355444520, 32);
      b_0.storeInt(src.token_id, 257);
      b_0.storeAddress(src.owner);
      b_0.storeRef(src.content);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1355444520) { throw Error('Invalid prefix'); }
  let _token_id = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  return { $$type: 'Mint' as const, token_id: _token_id, owner: _owner, content: _content };
}

function loadTupleMint(source: TupleReader) {
  let _token_id = source.readBigNumber();
  let _owner = source.readAddress();
  let _content = source.readCell();
  return { $$type: 'Mint' as const, token_id: _token_id, owner: _owner, content: _content };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
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

type Bridge_init_args = {
  $$type: 'Bridge_init_args';
  validatorPublicKey: bigint;
  validatorAddress: Address;
  chainType: string;
}

function initBridge_init_args(src: Bridge_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.validatorPublicKey, 257);
      b_0.storeAddress(src.validatorAddress);
      b_0.storeStringRefTail(src.chainType);
  };
}

async function Bridge_init(validatorPublicKey: bigint, validatorAddress: Address, chainType: string) {
  const __code = Cell.fromBase64('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');
  const __system = Cell.fromBase64('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');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBridge_init_args({ $$type: 'Bridge_init_args', validatorPublicKey, validatorAddress, chainType })(builder);
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

const Bridge_types: ABIType[] = [
  {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
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
  {"name":"HiFromDeployNFT721Storage","header":1017107824,"fields":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"storageAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"HiFromDeployNFT721Collection","header":1037677720,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"newlyDeployCollection","type":{"kind":"simple","type":"address","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"transactionHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}}]},
  {"name":"CollectionDeploy","header":4033579765,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"StorageDeploy","header":1498703807,"fields":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"DeployNFT721Storage","header":3037136312,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"DeployNFT721Collection","header":2399096803,"fields":[{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"royalty_params","type":{"kind":"simple","type":"RoyaltyParams","optional":false}},{"name":"destination_user_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"source_chain","type":{"kind":"simple","type":"string","optional":false}},{"name":"transaction_hash","type":{"kind":"simple","type":"string","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}}]},
  {"name":"CreatedCollection","header":41705028,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"UnlockToken","header":2585927731,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"MintOne","header":3338267266,"fields":[{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"Mint","header":1355444520,"fields":[{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
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

const Bridge_getters: ABIGetter[] = [
  {"name":"Original721Mapping","arguments":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":true}},
  {"name":"Duplicate721Mapping","arguments":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":true}},
  {"name":"OriginalToDuplicate","arguments":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"string","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"OriginalToDuplicateContractInfo","optional":true}},
  {"name":"DuplicateToOriginal","arguments":[{"name":"key","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"DuplicateToOriginalContractInfo","optional":true}},
  {"name":"TokenInfo","arguments":[{"name":"key","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Token","optional":true}},
  {"name":"TokenInfoSelf","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"slice","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":true}},
  {"name":"Validator","arguments":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Validator","optional":true}},
  {"name":"ValidatorsCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
  {"name":"CollectionDeployer","arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
  {"name":"StorageDeployer","arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
  {"name":"Collections","arguments":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
]

const Bridge_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"typed","type":"Excesses"}},
  {"receiver":"internal","message":{"kind":"text","text":"Deploy"}},
  {"receiver":"internal","message":{"kind":"typed","type":"AddValidator"}},
  {"receiver":"internal","message":{"kind":"typed","type":"RewardValidator"}},
  {"receiver":"internal","message":{"kind":"typed","type":"HiFromDeployNFT721Storage"}},
  {"receiver":"internal","message":{"kind":"typed","type":"HiFromDeployNFT721Collection"}},
  {"receiver":"internal","message":{"kind":"typed","type":"OwnershipAssigned"}},
  {"receiver":"internal","message":{"kind":"typed","type":"ClaimNFT721"}},
  {"receiver":"internal","message":{"kind":"empty"}},
]

export class Bridge implements Contract {
  
  static async init(validatorPublicKey: bigint, validatorAddress: Address, chainType: string) {
      return await Bridge_init(validatorPublicKey, validatorAddress, chainType);
  }
  
  static async fromInit(validatorPublicKey: bigint, validatorAddress: Address, chainType: string) {
      const init = await Bridge_init(validatorPublicKey, validatorAddress, chainType);
      const address = contractAddress(0, init);
      return new Bridge(address, init);
  }
  
  static fromAddress(address: Address) {
      return new Bridge(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  Bridge_types,
      getters: Bridge_getters,
      receivers: Bridge_receivers,
      errors: Bridge_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Excesses | 'Deploy' | AddValidator | RewardValidator | HiFromDeployNFT721Storage | HiFromDeployNFT721Collection | OwnershipAssigned | ClaimNFT721 | null) {
      
      let body: Cell | null = null;
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Excesses') {
          body = beginCell().store(storeExcesses(message)).endCell();
      }
      if (message === 'Deploy') {
          body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddValidator') {
          body = beginCell().store(storeAddValidator(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RewardValidator') {
          body = beginCell().store(storeRewardValidator(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'HiFromDeployNFT721Storage') {
          body = beginCell().store(storeHiFromDeployNFT721Storage(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'HiFromDeployNFT721Collection') {
          body = beginCell().store(storeHiFromDeployNFT721Collection(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnershipAssigned') {
          body = beginCell().store(storeOwnershipAssigned(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimNFT721') {
          body = beginCell().store(storeClaimNFT721(message)).endCell();
      }
      if (message === null) {
          body = new Cell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getOriginal721Mapping(provider: ContractProvider, sourceNftContractAddress: Address, sourceChain: string) {
      let builder = new TupleBuilder();
      builder.writeAddress(sourceNftContractAddress);
      builder.writeString(sourceChain);
      let source = (await provider.get('Original721Mapping', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
  async getDuplicate721Mapping(provider: ContractProvider, contractAddress: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(contractAddress);
      let source = (await provider.get('Duplicate721Mapping', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
  async getOriginalToDuplicate(provider: ContractProvider, sourceNftContractAddress: string, sourceChain: string) {
      let builder = new TupleBuilder();
      builder.writeString(sourceNftContractAddress);
      builder.writeString(sourceChain);
      let source = (await provider.get('OriginalToDuplicate', builder.build())).stack;
      const result_p = source.readTupleOpt();
      const result = result_p ? loadTupleOriginalToDuplicateContractInfo(result_p) : null;
      return result;
  }
  
  async getDuplicateToOriginal(provider: ContractProvider, key: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(key);
      let source = (await provider.get('DuplicateToOriginal', builder.build())).stack;
      const result_p = source.readTupleOpt();
      const result = result_p ? loadTupleDuplicateToOriginalContractInfo(result_p) : null;
      return result;
  }
  
  async getTokenInfo(provider: ContractProvider, key: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(key);
      let source = (await provider.get('TokenInfo', builder.build())).stack;
      const result_p = source.readTupleOpt();
      const result = result_p ? loadTupleToken(result_p) : null;
      return result;
  }
  
  async getTokenInfoSelf(provider: ContractProvider, tokenId: bigint, sourceChain: string, sourceNftContractAddress: Cell) {
      let builder = new TupleBuilder();
      builder.writeNumber(tokenId);
      builder.writeString(sourceChain);
      builder.writeSlice(sourceNftContractAddress);
      let source = (await provider.get('TokenInfoSelf', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
  async getValidator(provider: ContractProvider, key: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(key);
      let source = (await provider.get('Validator', builder.build())).stack;
      const result_p = source.readTupleOpt();
      const result = result_p ? loadTupleValidator(result_p) : null;
      return result;
  }
  
  async getValidatorsCount(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('ValidatorsCount', builder.build())).stack;
      let result = source.readBigNumberOpt();
      return result;
  }
  
  async getCollectionDeployer(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('CollectionDeployer', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
  async getStorageDeployer(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('StorageDeployer', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
  async getCollections(provider: ContractProvider, key: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(key);
      let source = (await provider.get('Collections', builder.build())).stack;
      let result = source.readAddressOpt();
      return result;
  }
  
}