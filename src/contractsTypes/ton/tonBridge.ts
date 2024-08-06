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
  {"name":"DeployNFT721Storage","header":1019847713,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"DeployNFT721Collection","header":2399096803,"fields":[{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"royalty_params","type":{"kind":"simple","type":"RoyaltyParams","optional":false}},{"name":"destination_user_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"source_chain","type":{"kind":"simple","type":"string","optional":false}},{"name":"transaction_hash","type":{"kind":"simple","type":"string","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lockTxChain","type":{"kind":"simple","type":"string","optional":false}}]},
  {"name":"CreatedCollection","header":41705028,"fields":[{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"UnlockToken","header":2585927731,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
  {"name":"CollectionDeploy","header":4033579765,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"StorageDeploy","header":3539326362,"fields":[{"name":"sourceNftContractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"isOriginal","type":{"kind":"simple","type":"bool","optional":false}},{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destinationChain","type":{"kind":"simple","type":"cell","optional":false}},{"name":"destinationUserAddress","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sourceNftContractAddressLock","type":{"kind":"simple","type":"slice","optional":false}},{"name":"sourceChain","type":{"kind":"simple","type":"string","optional":false}},{"name":"nftItemAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataUri","type":{"kind":"simple","type":"cell","optional":false}}]},
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