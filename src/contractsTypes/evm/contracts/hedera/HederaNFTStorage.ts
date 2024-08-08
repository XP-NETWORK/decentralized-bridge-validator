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
} from "../../common";

export interface HederaNFTStorageInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimContract"
      | "claimNft"
      | "collectionAddress"
      | "depositToken"
      | "owner"
      | "redirectForToken"
      | "transferFrom"
      | "transferFromNFT"
      | "unlockToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "CallResponseEvent" | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "claimContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimNft",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "collectionAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redirectForToken",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFromNFT",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockToken",
    values: [BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectionAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redirectForToken",
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
  decodeFunctionResult(
    functionFragment: "unlockToken",
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

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, tokenId: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface HederaNFTStorage extends BaseContract {
  connect(runner?: ContractRunner | null): HederaNFTStorage;
  waitForDeployment(): Promise<this>;

  interface: HederaNFTStorageInterface;

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

  claimContract: TypedContractMethod<[], [string], "view">;

  claimNft: TypedContractMethod<
    [serialNum: BigNumberish, token: AddressLike],
    [void],
    "nonpayable"
  >;

  collectionAddress: TypedContractMethod<[], [string], "view">;

  depositToken: TypedContractMethod<
    [tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  redirectForToken: TypedContractMethod<
    [token: AddressLike, encodedFunctionSelector: BytesLike],
    [[bigint, string] & { responseCode: bigint; response: string }],
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

  unlockToken: TypedContractMethod<
    [tokenId: BigNumberish, to: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "claimNft"
  ): TypedContractMethod<
    [serialNum: BigNumberish, token: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "collectionAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "depositToken"
  ): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "redirectForToken"
  ): TypedContractMethod<
    [token: AddressLike, encodedFunctionSelector: BytesLike],
    [[bigint, string] & { responseCode: bigint; response: string }],
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
  getFunction(
    nameOrSignature: "unlockToken"
  ): TypedContractMethod<
    [tokenId: BigNumberish, to: AddressLike],
    [void],
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
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
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

    "Transfer(address,address,int64)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}