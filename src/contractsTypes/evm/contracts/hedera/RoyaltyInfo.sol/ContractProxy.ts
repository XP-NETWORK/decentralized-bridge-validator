/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export declare namespace IHederaTokenService {
  export type KeyValueStruct = {
    inheritAccountKey: boolean;
    contractId: AddressLike;
    ed25519: BytesLike;
    ECDSA_secp256k1: BytesLike;
    delegatableContractId: AddressLike;
  };

  export type KeyValueStructOutput = [
    inheritAccountKey: boolean,
    contractId: string,
    ed25519: string,
    ECDSA_secp256k1: string,
    delegatableContractId: string
  ] & {
    inheritAccountKey: boolean;
    contractId: string;
    ed25519: string;
    ECDSA_secp256k1: string;
    delegatableContractId: string;
  };

  export type TokenKeyStruct = {
    keyType: BigNumberish;
    key: IHederaTokenService.KeyValueStruct;
  };

  export type TokenKeyStructOutput = [
    keyType: bigint,
    key: IHederaTokenService.KeyValueStructOutput
  ] & { keyType: bigint; key: IHederaTokenService.KeyValueStructOutput };

  export type ExpiryStruct = {
    second: BigNumberish;
    autoRenewAccount: AddressLike;
    autoRenewPeriod: BigNumberish;
  };

  export type ExpiryStructOutput = [
    second: bigint,
    autoRenewAccount: string,
    autoRenewPeriod: bigint
  ] & { second: bigint; autoRenewAccount: string; autoRenewPeriod: bigint };

  export type HederaTokenStruct = {
    name: string;
    symbol: string;
    treasury: AddressLike;
    memo: string;
    tokenSupplyType: boolean;
    maxSupply: BigNumberish;
    freezeDefault: boolean;
    tokenKeys: IHederaTokenService.TokenKeyStruct[];
    expiry: IHederaTokenService.ExpiryStruct;
  };

  export type HederaTokenStructOutput = [
    name: string,
    symbol: string,
    treasury: string,
    memo: string,
    tokenSupplyType: boolean,
    maxSupply: bigint,
    freezeDefault: boolean,
    tokenKeys: IHederaTokenService.TokenKeyStructOutput[],
    expiry: IHederaTokenService.ExpiryStructOutput
  ] & {
    name: string;
    symbol: string;
    treasury: string;
    memo: string;
    tokenSupplyType: boolean;
    maxSupply: bigint;
    freezeDefault: boolean;
    tokenKeys: IHederaTokenService.TokenKeyStructOutput[];
    expiry: IHederaTokenService.ExpiryStructOutput;
  };

  export type FixedFeeStruct = {
    amount: BigNumberish;
    tokenId: AddressLike;
    useHbarsForPayment: boolean;
    useCurrentTokenForPayment: boolean;
    feeCollector: AddressLike;
  };

  export type FixedFeeStructOutput = [
    amount: bigint,
    tokenId: string,
    useHbarsForPayment: boolean,
    useCurrentTokenForPayment: boolean,
    feeCollector: string
  ] & {
    amount: bigint;
    tokenId: string;
    useHbarsForPayment: boolean;
    useCurrentTokenForPayment: boolean;
    feeCollector: string;
  };

  export type FractionalFeeStruct = {
    numerator: BigNumberish;
    denominator: BigNumberish;
    minimumAmount: BigNumberish;
    maximumAmount: BigNumberish;
    netOfTransfers: boolean;
    feeCollector: AddressLike;
  };

  export type FractionalFeeStructOutput = [
    numerator: bigint,
    denominator: bigint,
    minimumAmount: bigint,
    maximumAmount: bigint,
    netOfTransfers: boolean,
    feeCollector: string
  ] & {
    numerator: bigint;
    denominator: bigint;
    minimumAmount: bigint;
    maximumAmount: bigint;
    netOfTransfers: boolean;
    feeCollector: string;
  };

  export type RoyaltyFeeStruct = {
    numerator: BigNumberish;
    denominator: BigNumberish;
    amount: BigNumberish;
    tokenId: AddressLike;
    useHbarsForPayment: boolean;
    feeCollector: AddressLike;
  };

  export type RoyaltyFeeStructOutput = [
    numerator: bigint,
    denominator: bigint,
    amount: bigint,
    tokenId: string,
    useHbarsForPayment: boolean,
    feeCollector: string
  ] & {
    numerator: bigint;
    denominator: bigint;
    amount: bigint;
    tokenId: string;
    useHbarsForPayment: boolean;
    feeCollector: string;
  };

  export type TokenInfoStruct = {
    token: IHederaTokenService.HederaTokenStruct;
    totalSupply: BigNumberish;
    deleted: boolean;
    defaultKycStatus: boolean;
    pauseStatus: boolean;
    fixedFees: IHederaTokenService.FixedFeeStruct[];
    fractionalFees: IHederaTokenService.FractionalFeeStruct[];
    royaltyFees: IHederaTokenService.RoyaltyFeeStruct[];
    ledgerId: string;
  };

  export type TokenInfoStructOutput = [
    token: IHederaTokenService.HederaTokenStructOutput,
    totalSupply: bigint,
    deleted: boolean,
    defaultKycStatus: boolean,
    pauseStatus: boolean,
    fixedFees: IHederaTokenService.FixedFeeStructOutput[],
    fractionalFees: IHederaTokenService.FractionalFeeStructOutput[],
    royaltyFees: IHederaTokenService.RoyaltyFeeStructOutput[],
    ledgerId: string
  ] & {
    token: IHederaTokenService.HederaTokenStructOutput;
    totalSupply: bigint;
    deleted: boolean;
    defaultKycStatus: boolean;
    pauseStatus: boolean;
    fixedFees: IHederaTokenService.FixedFeeStructOutput[];
    fractionalFees: IHederaTokenService.FractionalFeeStructOutput[];
    royaltyFees: IHederaTokenService.RoyaltyFeeStructOutput[];
    ledgerId: string;
  };

  export type NonFungibleTokenInfoStruct = {
    tokenInfo: IHederaTokenService.TokenInfoStruct;
    serialNumber: BigNumberish;
    ownerId: AddressLike;
    creationTime: BigNumberish;
    metadata: BytesLike;
    spenderId: AddressLike;
  };

  export type NonFungibleTokenInfoStructOutput = [
    tokenInfo: IHederaTokenService.TokenInfoStructOutput,
    serialNumber: bigint,
    ownerId: string,
    creationTime: bigint,
    metadata: string,
    spenderId: string
  ] & {
    tokenInfo: IHederaTokenService.TokenInfoStructOutput;
    serialNumber: bigint;
    ownerId: string;
    creationTime: bigint;
    metadata: string;
    spenderId: string;
  };
}

export interface ContractProxyInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DEFAULT_EXPIRY"
      | "MAX_INT"
      | "deployNft"
      | "mint"
      | "redirectForToken"
      | "royaltyInfo"
      | "transferFrom"
      | "transferFromNFT"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CallResponseEvent"
      | "Mint"
      | "NftCollectionCreated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_EXPIRY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "MAX_INT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deployNft",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "redirectForToken",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyInfo",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFromNFT",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_EXPIRY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "MAX_INT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deployNft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redirectForToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFromNFT",
    data: BytesLike
  ): Result;
}

export namespace CallResponseEventEvent {
  export type InputTuple = [arg0: boolean, arg1: BytesLike];
  export type OutputTuple = [arg0: boolean, arg1: string];
  export interface OutputObject {
    arg0: boolean;
    arg1: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintEvent {
  export type InputTuple = [
    token: AddressLike,
    owner: AddressLike,
    serialNumber: BigNumberish
  ];
  export type OutputTuple = [
    token: string,
    owner: string,
    serialNumber: bigint
  ];
  export interface OutputObject {
    token: string;
    owner: string;
    serialNumber: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NftCollectionCreatedEvent {
  export type InputTuple = [token: AddressLike];
  export type OutputTuple = [token: string];
  export interface OutputObject {
    token: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ContractProxy extends BaseContract {
  connect(runner?: ContractRunner | null): ContractProxy;
  waitForDeployment(): Promise<this>;

  interface: ContractProxyInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  DEFAULT_EXPIRY: TypedContractMethod<[], [bigint], "view">;

  MAX_INT: TypedContractMethod<[], [bigint], "view">;

  deployNft: TypedContractMethod<
    [name: string, symbol: string],
    [void],
    "payable"
  >;

  mint: TypedContractMethod<
    [token: AddressLike, tokenURI: string],
    [void],
    "payable"
  >;

  redirectForToken: TypedContractMethod<
    [token: AddressLike, encodedFunctionSelector: BytesLike],
    [[bigint, string] & { responseCode: bigint; response: string }],
    "nonpayable"
  >;

  royaltyInfo: TypedContractMethod<
    [token: AddressLike, serialNumber: BigNumberish],
    [[bigint, IHederaTokenService.NonFungibleTokenInfoStructOutput]],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [
      token: AddressLike,
      from: AddressLike,
      to: AddressLike,
      amount: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  transferFromNFT: TypedContractMethod<
    [
      token: AddressLike,
      from: AddressLike,
      to: AddressLike,
      serialNumber: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DEFAULT_EXPIRY"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MAX_INT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "deployNft"
  ): TypedContractMethod<[name: string, symbol: string], [void], "payable">;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [token: AddressLike, tokenURI: string],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "redirectForToken"
  ): TypedContractMethod<
    [token: AddressLike, encodedFunctionSelector: BytesLike],
    [[bigint, string] & { responseCode: bigint; response: string }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "royaltyInfo"
  ): TypedContractMethod<
    [token: AddressLike, serialNumber: BigNumberish],
    [[bigint, IHederaTokenService.NonFungibleTokenInfoStructOutput]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [
      token: AddressLike,
      from: AddressLike,
      to: AddressLike,
      amount: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFromNFT"
  ): TypedContractMethod<
    [
      token: AddressLike,
      from: AddressLike,
      to: AddressLike,
      serialNumber: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  getEvent(
    key: "CallResponseEvent"
  ): TypedContractEvent<
    CallResponseEventEvent.InputTuple,
    CallResponseEventEvent.OutputTuple,
    CallResponseEventEvent.OutputObject
  >;
  getEvent(
    key: "Mint"
  ): TypedContractEvent<
    MintEvent.InputTuple,
    MintEvent.OutputTuple,
    MintEvent.OutputObject
  >;
  getEvent(
    key: "NftCollectionCreated"
  ): TypedContractEvent<
    NftCollectionCreatedEvent.InputTuple,
    NftCollectionCreatedEvent.OutputTuple,
    NftCollectionCreatedEvent.OutputObject
  >;

  filters: {
    "CallResponseEvent(bool,bytes)": TypedContractEvent<
      CallResponseEventEvent.InputTuple,
      CallResponseEventEvent.OutputTuple,
      CallResponseEventEvent.OutputObject
    >;
    CallResponseEvent: TypedContractEvent<
      CallResponseEventEvent.InputTuple,
      CallResponseEventEvent.OutputTuple,
      CallResponseEventEvent.OutputObject
    >;

    "Mint(address,address,int64)": TypedContractEvent<
      MintEvent.InputTuple,
      MintEvent.OutputTuple,
      MintEvent.OutputObject
    >;
    Mint: TypedContractEvent<
      MintEvent.InputTuple,
      MintEvent.OutputTuple,
      MintEvent.OutputObject
    >;

    "NftCollectionCreated(address)": TypedContractEvent<
      NftCollectionCreatedEvent.InputTuple,
      NftCollectionCreatedEvent.OutputTuple,
      NftCollectionCreatedEvent.OutputObject
    >;
    NftCollectionCreated: TypedContractEvent<
      NftCollectionCreatedEvent.InputTuple,
      NftCollectionCreatedEvent.OutputTuple,
      NftCollectionCreatedEvent.OutputObject
    >;
  };
}
