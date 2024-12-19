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
} from "../common";

export type SignerAndSignatureStruct = {
  signerAddress: string;
  signature: BytesLike;
};

export type SignerAndSignatureStructOutput = [
  signerAddress: string,
  signature: string
] & { signerAddress: string; signature: string };

export declare namespace Bridge {
  export type ClaimDataStruct = {
    tokenId: BigNumberish;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: AddressLike;
    sourceNftContractAddress: string;
    name: string;
    symbol: string;
    royalty: BigNumberish;
    royaltyReceiver: AddressLike;
    metadata: string;
    transactionHash: string;
    tokenAmount: BigNumberish;
    nftType: string;
    fee: BigNumberish;
    lockTxChain: string;
  };

  export type ClaimDataStructOutput = [
    tokenId: bigint,
    sourceChain: string,
    destinationChain: string,
    destinationUserAddress: string,
    sourceNftContractAddress: string,
    name: string,
    symbol: string,
    royalty: bigint,
    royaltyReceiver: string,
    metadata: string,
    transactionHash: string,
    tokenAmount: bigint,
    nftType: string,
    fee: bigint,
    lockTxChain: string
  ] & {
    tokenId: bigint;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddress: string;
    name: string;
    symbol: string;
    royalty: bigint;
    royaltyReceiver: string;
    metadata: string;
    transactionHash: string;
    tokenAmount: bigint;
    nftType: string;
    fee: bigint;
    lockTxChain: string;
  };
}

export interface BridgeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "UPGRADE_INTERFACE_VERSION"
      | "addValidator"
      | "blackListValidator"
      | "blackListedValidators"
      | "claimNFT1155"
      | "claimNFT721"
      | "claimValidatorRewards"
      | "collectionDeployer"
      | "duplicateStorageMapping1155"
      | "duplicateStorageMapping721"
      | "duplicateToOriginalMapping"
      | "initialize"
      | "lock1155"
      | "lock721"
      | "originalStorageMapping1155"
      | "originalStorageMapping721"
      | "originalToDuplicateMapping"
      | "proxiableUUID"
      | "resetReward"
      | "rewardVals"
      | "selfChain"
      | "storageDeployer"
      | "uniqueIdentifier"
      | "uniqueImplementations"
      | "upgrade"
      | "upgradeToAndCall"
      | "upgradeables"
      | "validators"
      | "validatorsCount"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddNewValidator"
      | "BlackListValidator"
      | "Claim1155"
      | "Claimed721"
      | "Initialized"
      | "Locked"
      | "LogHash"
      | "RewardValidator"
      | "UnLock1155"
      | "UnLock721"
      | "Upgraded"
      | "UpgradedContract"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addValidator",
    values: [AddressLike, SignerAndSignatureStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "blackListValidator",
    values: [AddressLike, SignerAndSignatureStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "blackListedValidators",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimNFT1155",
    values: [Bridge.ClaimDataStruct, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimNFT721",
    values: [Bridge.ClaimDataStruct, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimValidatorRewards",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "collectionDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "duplicateStorageMapping1155",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "duplicateStorageMapping721",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "duplicateToOriginalMapping",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike[], string, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lock1155",
    values: [BigNumberish, string, string, AddressLike, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "lock721",
    values: [BigNumberish, string, string, AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "originalStorageMapping1155",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "originalStorageMapping721",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "originalToDuplicateMapping",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resetReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardVals",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(functionFragment: "selfChain", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "storageDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "uniqueIdentifier",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "uniqueImplementations",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgrade",
    values: [AddressLike, SignerAndSignatureStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeables",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "validators",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "validatorsCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addValidator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blackListValidator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blackListedValidators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimNFT1155",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimNFT721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimValidatorRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectionDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "duplicateStorageMapping1155",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "duplicateStorageMapping721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "duplicateToOriginalMapping",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lock1155", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lock721", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "originalStorageMapping1155",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "originalStorageMapping721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "originalToDuplicateMapping",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resetReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewardVals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "selfChain", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "storageDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniqueIdentifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniqueImplementations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeables",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "validators", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validatorsCount",
    data: BytesLike
  ): Result;
}

export namespace AddNewValidatorEvent {
  export type InputTuple = [_validator: AddressLike];
  export type OutputTuple = [_validator: string];
  export interface OutputObject {
    _validator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BlackListValidatorEvent {
  export type InputTuple = [_validator: AddressLike];
  export type OutputTuple = [_validator: string];
  export interface OutputObject {
    _validator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace Claim1155Event {
  export type InputTuple = [
    lockTxChain: string,
    sourceChain: string,
    transactionHash: string,
    nftContract: AddressLike,
    tokenId: BigNumberish,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    lockTxChain: string,
    sourceChain: string,
    transactionHash: string,
    nftContract: string,
    tokenId: bigint,
    amount: bigint
  ];
  export interface OutputObject {
    lockTxChain: string;
    sourceChain: string;
    transactionHash: string;
    nftContract: string;
    tokenId: bigint;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace Claimed721Event {
  export type InputTuple = [
    lockTxChain: string,
    sourceChain: string,
    transactionHash: string,
    nftContract: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [
    lockTxChain: string,
    sourceChain: string,
    transactionHash: string,
    nftContract: string,
    tokenId: bigint
  ];
  export interface OutputObject {
    lockTxChain: string;
    sourceChain: string;
    transactionHash: string;
    nftContract: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace LockedEvent {
  export type InputTuple = [
    tokenId: BigNumberish,
    destinationChain: string,
    destinationUserAddress: string,
    sourceNftContractAddress: string,
    tokenAmount: BigNumberish,
    nftType: string,
    sourceChain: string,
    metaDataUri: string
  ];
  export type OutputTuple = [
    tokenId: bigint,
    destinationChain: string,
    destinationUserAddress: string,
    sourceNftContractAddress: string,
    tokenAmount: bigint,
    nftType: string,
    sourceChain: string,
    metaDataUri: string
  ];
  export interface OutputObject {
    tokenId: bigint;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddress: string;
    tokenAmount: bigint;
    nftType: string;
    sourceChain: string;
    metaDataUri: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace LogHashEvent {
  export type InputTuple = [hashValue: BytesLike, arg1: BytesLike[]];
  export type OutputTuple = [hashValue: string, arg1: string[]];
  export interface OutputObject {
    hashValue: string;
    arg1: string[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardValidatorEvent {
  export type InputTuple = [_validator: AddressLike];
  export type OutputTuple = [_validator: string];
  export interface OutputObject {
    _validator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnLock1155Event {
  export type InputTuple = [
    to: AddressLike,
    tokenId: BigNumberish,
    contractAddr: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    to: string,
    tokenId: bigint,
    contractAddr: string,
    amount: bigint
  ];
  export interface OutputObject {
    to: string;
    tokenId: bigint;
    contractAddr: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnLock721Event {
  export type InputTuple = [
    to: AddressLike,
    tokenId: BigNumberish,
    contractAddr: AddressLike
  ];
  export type OutputTuple = [to: string, tokenId: bigint, contractAddr: string];
  export interface OutputObject {
    to: string;
    tokenId: bigint;
    contractAddr: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike];
  export type OutputTuple = [implementation: string];
  export interface OutputObject {
    implementation: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpgradedContractEvent {
  export type InputTuple = [_contractAddress: AddressLike];
  export type OutputTuple = [_contractAddress: string];
  export interface OutputObject {
    _contractAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Bridge extends BaseContract {
  connect(runner?: ContractRunner | null): Bridge;
  waitForDeployment(): Promise<this>;

  interface: BridgeInterface;

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

  UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;

  addValidator: TypedContractMethod<
    [_validator: AddressLike, signatures: SignerAndSignatureStruct[]],
    [void],
    "nonpayable"
  >;

  blackListValidator: TypedContractMethod<
    [_validator: AddressLike, signatures: SignerAndSignatureStruct[]],
    [void],
    "nonpayable"
  >;

  blackListedValidators: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  claimNFT1155: TypedContractMethod<
    [data: Bridge.ClaimDataStruct, signatures: BytesLike[]],
    [void],
    "payable"
  >;

  claimNFT721: TypedContractMethod<
    [data: Bridge.ClaimDataStruct, signatures: BytesLike[]],
    [void],
    "payable"
  >;

  claimValidatorRewards: TypedContractMethod<
    [_validator: AddressLike],
    [void],
    "nonpayable"
  >;

  collectionDeployer: TypedContractMethod<[], [string], "view">;

  duplicateStorageMapping1155: TypedContractMethod<
    [arg0: string, arg1: string],
    [string],
    "view"
  >;

  duplicateStorageMapping721: TypedContractMethod<
    [arg0: string, arg1: string],
    [string],
    "view"
  >;

  duplicateToOriginalMapping: TypedContractMethod<
    [arg0: AddressLike, arg1: string],
    [[string, string] & { chain: string; contractAddress: string }],
    "view"
  >;

  initialize: TypedContractMethod<
    [
      _validators: AddressLike[],
      _chainType: string,
      _collectionDeployer: AddressLike,
      _storageDeployer: AddressLike,
      _collectionOwner: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  lock1155: TypedContractMethod<
    [
      tokenId: BigNumberish,
      destinationChain: string,
      destinationUserAddress: string,
      sourceNftContractAddress: AddressLike,
      tokenAmount: BigNumberish,
      metaDataUri: string
    ],
    [void],
    "nonpayable"
  >;

  lock721: TypedContractMethod<
    [
      tokenId: BigNumberish,
      destinationChain: string,
      destinationUserAddress: string,
      sourceNftContractAddress: AddressLike,
      metaDataUri: string
    ],
    [void],
    "nonpayable"
  >;

  originalStorageMapping1155: TypedContractMethod<
    [arg0: string, arg1: string],
    [string],
    "view"
  >;

  originalStorageMapping721: TypedContractMethod<
    [arg0: string, arg1: string],
    [string],
    "view"
  >;

  originalToDuplicateMapping: TypedContractMethod<
    [arg0: string, arg1: string],
    [[string, string] & { chain: string; contractAddress: string }],
    "view"
  >;

  proxiableUUID: TypedContractMethod<[], [string], "view">;

  resetReward: TypedContractMethod<[], [boolean], "view">;

  rewardVals: TypedContractMethod<
    [validatorsToReward: AddressLike[]],
    [void],
    "nonpayable"
  >;

  selfChain: TypedContractMethod<[], [string], "view">;

  storageDeployer: TypedContractMethod<[], [string], "view">;

  uniqueIdentifier: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  uniqueImplementations: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  upgrade: TypedContractMethod<
    [newImplementation: AddressLike, signatures: SignerAndSignatureStruct[]],
    [void],
    "nonpayable"
  >;

  upgradeToAndCall: TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  upgradeables: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  validators: TypedContractMethod<
    [arg0: AddressLike],
    [[boolean, bigint] & { added: boolean; pendingReward: bigint }],
    "view"
  >;

  validatorsCount: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "UPGRADE_INTERFACE_VERSION"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "addValidator"
  ): TypedContractMethod<
    [_validator: AddressLike, signatures: SignerAndSignatureStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "blackListValidator"
  ): TypedContractMethod<
    [_validator: AddressLike, signatures: SignerAndSignatureStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "blackListedValidators"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "claimNFT1155"
  ): TypedContractMethod<
    [data: Bridge.ClaimDataStruct, signatures: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "claimNFT721"
  ): TypedContractMethod<
    [data: Bridge.ClaimDataStruct, signatures: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "claimValidatorRewards"
  ): TypedContractMethod<[_validator: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "collectionDeployer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "duplicateStorageMapping1155"
  ): TypedContractMethod<[arg0: string, arg1: string], [string], "view">;
  getFunction(
    nameOrSignature: "duplicateStorageMapping721"
  ): TypedContractMethod<[arg0: string, arg1: string], [string], "view">;
  getFunction(
    nameOrSignature: "duplicateToOriginalMapping"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: string],
    [[string, string] & { chain: string; contractAddress: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      _validators: AddressLike[],
      _chainType: string,
      _collectionDeployer: AddressLike,
      _storageDeployer: AddressLike,
      _collectionOwner: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lock1155"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      destinationChain: string,
      destinationUserAddress: string,
      sourceNftContractAddress: AddressLike,
      tokenAmount: BigNumberish,
      metaDataUri: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lock721"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      destinationChain: string,
      destinationUserAddress: string,
      sourceNftContractAddress: AddressLike,
      metaDataUri: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "originalStorageMapping1155"
  ): TypedContractMethod<[arg0: string, arg1: string], [string], "view">;
  getFunction(
    nameOrSignature: "originalStorageMapping721"
  ): TypedContractMethod<[arg0: string, arg1: string], [string], "view">;
  getFunction(
    nameOrSignature: "originalToDuplicateMapping"
  ): TypedContractMethod<
    [arg0: string, arg1: string],
    [[string, string] & { chain: string; contractAddress: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "proxiableUUID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "resetReward"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "rewardVals"
  ): TypedContractMethod<
    [validatorsToReward: AddressLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "selfChain"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "storageDeployer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "uniqueIdentifier"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "uniqueImplementations"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "upgrade"
  ): TypedContractMethod<
    [newImplementation: AddressLike, signatures: SignerAndSignatureStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "upgradeToAndCall"
  ): TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "upgradeables"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "validators"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [[boolean, bigint] & { added: boolean; pendingReward: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "validatorsCount"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "AddNewValidator"
  ): TypedContractEvent<
    AddNewValidatorEvent.InputTuple,
    AddNewValidatorEvent.OutputTuple,
    AddNewValidatorEvent.OutputObject
  >;
  getEvent(
    key: "BlackListValidator"
  ): TypedContractEvent<
    BlackListValidatorEvent.InputTuple,
    BlackListValidatorEvent.OutputTuple,
    BlackListValidatorEvent.OutputObject
  >;
  getEvent(
    key: "Claim1155"
  ): TypedContractEvent<
    Claim1155Event.InputTuple,
    Claim1155Event.OutputTuple,
    Claim1155Event.OutputObject
  >;
  getEvent(
    key: "Claimed721"
  ): TypedContractEvent<
    Claimed721Event.InputTuple,
    Claimed721Event.OutputTuple,
    Claimed721Event.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "Locked"
  ): TypedContractEvent<
    LockedEvent.InputTuple,
    LockedEvent.OutputTuple,
    LockedEvent.OutputObject
  >;
  getEvent(
    key: "LogHash"
  ): TypedContractEvent<
    LogHashEvent.InputTuple,
    LogHashEvent.OutputTuple,
    LogHashEvent.OutputObject
  >;
  getEvent(
    key: "RewardValidator"
  ): TypedContractEvent<
    RewardValidatorEvent.InputTuple,
    RewardValidatorEvent.OutputTuple,
    RewardValidatorEvent.OutputObject
  >;
  getEvent(
    key: "UnLock1155"
  ): TypedContractEvent<
    UnLock1155Event.InputTuple,
    UnLock1155Event.OutputTuple,
    UnLock1155Event.OutputObject
  >;
  getEvent(
    key: "UnLock721"
  ): TypedContractEvent<
    UnLock721Event.InputTuple,
    UnLock721Event.OutputTuple,
    UnLock721Event.OutputObject
  >;
  getEvent(
    key: "Upgraded"
  ): TypedContractEvent<
    UpgradedEvent.InputTuple,
    UpgradedEvent.OutputTuple,
    UpgradedEvent.OutputObject
  >;
  getEvent(
    key: "UpgradedContract"
  ): TypedContractEvent<
    UpgradedContractEvent.InputTuple,
    UpgradedContractEvent.OutputTuple,
    UpgradedContractEvent.OutputObject
  >;

  filters: {
    "AddNewValidator(address)": TypedContractEvent<
      AddNewValidatorEvent.InputTuple,
      AddNewValidatorEvent.OutputTuple,
      AddNewValidatorEvent.OutputObject
    >;
    AddNewValidator: TypedContractEvent<
      AddNewValidatorEvent.InputTuple,
      AddNewValidatorEvent.OutputTuple,
      AddNewValidatorEvent.OutputObject
    >;

    "BlackListValidator(address)": TypedContractEvent<
      BlackListValidatorEvent.InputTuple,
      BlackListValidatorEvent.OutputTuple,
      BlackListValidatorEvent.OutputObject
    >;
    BlackListValidator: TypedContractEvent<
      BlackListValidatorEvent.InputTuple,
      BlackListValidatorEvent.OutputTuple,
      BlackListValidatorEvent.OutputObject
    >;

    "Claim1155(string,string,string,address,uint256,uint256)": TypedContractEvent<
      Claim1155Event.InputTuple,
      Claim1155Event.OutputTuple,
      Claim1155Event.OutputObject
    >;
    Claim1155: TypedContractEvent<
      Claim1155Event.InputTuple,
      Claim1155Event.OutputTuple,
      Claim1155Event.OutputObject
    >;

    "Claimed721(string,string,string,address,uint256)": TypedContractEvent<
      Claimed721Event.InputTuple,
      Claimed721Event.OutputTuple,
      Claimed721Event.OutputObject
    >;
    Claimed721: TypedContractEvent<
      Claimed721Event.InputTuple,
      Claimed721Event.OutputTuple,
      Claimed721Event.OutputObject
    >;

    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "Locked(uint256,string,string,string,uint256,string,string,string)": TypedContractEvent<
      LockedEvent.InputTuple,
      LockedEvent.OutputTuple,
      LockedEvent.OutputObject
    >;
    Locked: TypedContractEvent<
      LockedEvent.InputTuple,
      LockedEvent.OutputTuple,
      LockedEvent.OutputObject
    >;

    "LogHash(bytes32,bytes[])": TypedContractEvent<
      LogHashEvent.InputTuple,
      LogHashEvent.OutputTuple,
      LogHashEvent.OutputObject
    >;
    LogHash: TypedContractEvent<
      LogHashEvent.InputTuple,
      LogHashEvent.OutputTuple,
      LogHashEvent.OutputObject
    >;

    "RewardValidator(address)": TypedContractEvent<
      RewardValidatorEvent.InputTuple,
      RewardValidatorEvent.OutputTuple,
      RewardValidatorEvent.OutputObject
    >;
    RewardValidator: TypedContractEvent<
      RewardValidatorEvent.InputTuple,
      RewardValidatorEvent.OutputTuple,
      RewardValidatorEvent.OutputObject
    >;

    "UnLock1155(address,uint256,address,uint256)": TypedContractEvent<
      UnLock1155Event.InputTuple,
      UnLock1155Event.OutputTuple,
      UnLock1155Event.OutputObject
    >;
    UnLock1155: TypedContractEvent<
      UnLock1155Event.InputTuple,
      UnLock1155Event.OutputTuple,
      UnLock1155Event.OutputObject
    >;

    "UnLock721(address,uint256,address)": TypedContractEvent<
      UnLock721Event.InputTuple,
      UnLock721Event.OutputTuple,
      UnLock721Event.OutputObject
    >;
    UnLock721: TypedContractEvent<
      UnLock721Event.InputTuple,
      UnLock721Event.OutputTuple,
      UnLock721Event.OutputObject
    >;

    "Upgraded(address)": TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
    Upgraded: TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;

    "UpgradedContract(address)": TypedContractEvent<
      UpgradedContractEvent.InputTuple,
      UpgradedContractEvent.OutputTuple,
      UpgradedContractEvent.OutputObject
    >;
    UpgradedContract: TypedContractEvent<
      UpgradedContractEvent.InputTuple,
      UpgradedContractEvent.OutputTuple,
      UpgradedContractEvent.OutputObject
    >;
  };
}
