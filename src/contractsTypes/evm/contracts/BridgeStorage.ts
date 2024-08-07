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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export type ChainFeeStruct = {
  chain: string;
  fee: BigNumberish;
  royaltyReceiver: string;
};

export type ChainFeeStructOutput = [
  chain: string,
  fee: bigint,
  royaltyReceiver: string
] & { chain: string; fee: bigint; royaltyReceiver: string };

export type SignerAndSignatureStruct = {
  signerAddress: string;
  signature: BytesLike;
};

export type SignerAndSignatureStructOutput = [
  signerAddress: string,
  signature: string
] & { signerAddress: string; signature: string };

export type ValidatorAddressWithSignerAndSignatureStruct = {
  validatorAddress: string;
  signerAndSignature: SignerAndSignatureStruct;
};

export type ValidatorAddressWithSignerAndSignatureStructOutput = [
  validatorAddress: string,
  signerAndSignature: SignerAndSignatureStructOutput
] & {
  validatorAddress: string;
  signerAndSignature: SignerAndSignatureStructOutput;
};

export interface BridgeStorageInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "approveLockNft"
      | "approveStake"
      | "blackListSignatures"
      | "blackListValidator"
      | "blackListedValidators"
      | "chainEpoch"
      | "chainFee"
      | "chainFeeVoted"
      | "chainFeeVotes"
      | "chainRoyalty"
      | "chainRoyaltyVoted"
      | "chainRoyaltyVotes"
      | "changeChainFee"
      | "changeChainRoyaltyReceiver"
      | "getLockNftSignatures"
      | "getLockNftSignaturesCount"
      | "getStakingSignatures"
      | "getStakingSignaturesCount"
      | "lockSignatures"
      | "royaltyEpoch"
      | "stakingSignatures"
      | "usedSignatures"
      | "usedSignaturesBlackList"
      | "validatorCount"
      | "validatorEpoch"
      | "validatorStatusChangeVotes"
      | "validatorVoted"
      | "validators"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveLockNft",
    values: [string, string, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approveStake",
    values: [AddressLike, ValidatorAddressWithSignerAndSignatureStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "blackListSignatures",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "blackListValidator",
    values: [AddressLike, ValidatorAddressWithSignerAndSignatureStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "blackListedValidators",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "chainEpoch", values: [string]): string;
  encodeFunctionData(functionFragment: "chainFee", values: [string]): string;
  encodeFunctionData(
    functionFragment: "chainFeeVoted",
    values: [string, BigNumberish, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "chainFeeVotes",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "chainRoyalty",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "chainRoyaltyVoted",
    values: [string, string, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "chainRoyaltyVotes",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeChainFee",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeChainRoyaltyReceiver",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getLockNftSignatures",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getLockNftSignaturesCount",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingSignatures",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingSignaturesCount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "lockSignatures",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyEpoch",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingSignatures",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "usedSignatures",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "usedSignaturesBlackList",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "validatorCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "validatorEpoch",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "validatorStatusChangeVotes",
    values: [AddressLike, boolean, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "validatorVoted",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "validators",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveLockNft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blackListSignatures",
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
  decodeFunctionResult(functionFragment: "chainEpoch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "chainFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "chainFeeVoted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "chainFeeVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "chainRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "chainRoyaltyVoted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "chainRoyaltyVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeChainFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeChainRoyaltyReceiver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLockNftSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLockNftSignaturesCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingSignaturesCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usedSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usedSignaturesBlackList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validatorCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validatorEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validatorStatusChangeVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validatorVoted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "validators", data: BytesLike): Result;
}

export interface BridgeStorage extends BaseContract {
  connect(runner?: ContractRunner | null): BridgeStorage;
  waitForDeployment(): Promise<this>;

  interface: BridgeStorageInterface;

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

  approveLockNft: TypedContractMethod<
    [
      _transactionHash: string,
      _chain: string,
      _signature: BytesLike,
      _signerAddress: string
    ],
    [void],
    "nonpayable"
  >;

  approveStake: TypedContractMethod<
    [
      _stakerAddress: AddressLike,
      _validatorAddressWithSignerAndSignature: ValidatorAddressWithSignerAndSignatureStruct[]
    ],
    [void],
    "nonpayable"
  >;

  blackListSignatures: TypedContractMethod<
    [arg0: string, arg1: BigNumberish],
    [[string, string] & { signerAddress: string; signature: string }],
    "view"
  >;

  blackListValidator: TypedContractMethod<
    [
      _validatorAddress: AddressLike,
      _validatorAddressWithSignerAndSignature: ValidatorAddressWithSignerAndSignatureStruct[]
    ],
    [void],
    "nonpayable"
  >;

  blackListedValidators: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  chainEpoch: TypedContractMethod<[arg0: string], [bigint], "view">;

  chainFee: TypedContractMethod<[arg0: string], [bigint], "view">;

  chainFeeVoted: TypedContractMethod<
    [arg0: string, arg1: BigNumberish, arg2: AddressLike, arg3: BigNumberish],
    [boolean],
    "view"
  >;

  chainFeeVotes: TypedContractMethod<
    [arg0: string, arg1: BigNumberish, arg2: BigNumberish],
    [bigint],
    "view"
  >;

  chainRoyalty: TypedContractMethod<[arg0: string], [string], "view">;

  chainRoyaltyVoted: TypedContractMethod<
    [arg0: string, arg1: string, arg2: AddressLike, arg3: BigNumberish],
    [boolean],
    "view"
  >;

  chainRoyaltyVotes: TypedContractMethod<
    [arg0: string, arg1: string, arg2: BigNumberish],
    [bigint],
    "view"
  >;

  changeChainFee: TypedContractMethod<
    [_chain: string, _fee: BigNumberish],
    [void],
    "nonpayable"
  >;

  changeChainRoyaltyReceiver: TypedContractMethod<
    [_chain: string, _royaltyReceiver: string],
    [void],
    "nonpayable"
  >;

  getLockNftSignatures: TypedContractMethod<
    [transactionHash: string, chain: string],
    [SignerAndSignatureStructOutput[]],
    "view"
  >;

  getLockNftSignaturesCount: TypedContractMethod<
    [transactionHash: string, chain: string],
    [bigint],
    "view"
  >;

  getStakingSignatures: TypedContractMethod<
    [stakerAddress: string],
    [SignerAndSignatureStructOutput[]],
    "view"
  >;

  getStakingSignaturesCount: TypedContractMethod<
    [stakerAddress: string],
    [bigint],
    "view"
  >;

  lockSignatures: TypedContractMethod<
    [arg0: string, arg1: string, arg2: BigNumberish],
    [[string, string] & { signerAddress: string; signature: string }],
    "view"
  >;

  royaltyEpoch: TypedContractMethod<[arg0: string], [bigint], "view">;

  stakingSignatures: TypedContractMethod<
    [arg0: string, arg1: BigNumberish],
    [[string, string] & { signerAddress: string; signature: string }],
    "view"
  >;

  usedSignatures: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  usedSignaturesBlackList: TypedContractMethod<
    [arg0: BytesLike],
    [boolean],
    "view"
  >;

  validatorCount: TypedContractMethod<[], [bigint], "view">;

  validatorEpoch: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  validatorStatusChangeVotes: TypedContractMethod<
    [arg0: AddressLike, arg1: boolean, arg2: BigNumberish],
    [bigint],
    "view"
  >;

  validatorVoted: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [boolean],
    "view"
  >;

  validators: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approveLockNft"
  ): TypedContractMethod<
    [
      _transactionHash: string,
      _chain: string,
      _signature: BytesLike,
      _signerAddress: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "approveStake"
  ): TypedContractMethod<
    [
      _stakerAddress: AddressLike,
      _validatorAddressWithSignerAndSignature: ValidatorAddressWithSignerAndSignatureStruct[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "blackListSignatures"
  ): TypedContractMethod<
    [arg0: string, arg1: BigNumberish],
    [[string, string] & { signerAddress: string; signature: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "blackListValidator"
  ): TypedContractMethod<
    [
      _validatorAddress: AddressLike,
      _validatorAddressWithSignerAndSignature: ValidatorAddressWithSignerAndSignatureStruct[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "blackListedValidators"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "chainEpoch"
  ): TypedContractMethod<[arg0: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "chainFee"
  ): TypedContractMethod<[arg0: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "chainFeeVoted"
  ): TypedContractMethod<
    [arg0: string, arg1: BigNumberish, arg2: AddressLike, arg3: BigNumberish],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "chainFeeVotes"
  ): TypedContractMethod<
    [arg0: string, arg1: BigNumberish, arg2: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "chainRoyalty"
  ): TypedContractMethod<[arg0: string], [string], "view">;
  getFunction(
    nameOrSignature: "chainRoyaltyVoted"
  ): TypedContractMethod<
    [arg0: string, arg1: string, arg2: AddressLike, arg3: BigNumberish],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "chainRoyaltyVotes"
  ): TypedContractMethod<
    [arg0: string, arg1: string, arg2: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "changeChainFee"
  ): TypedContractMethod<
    [_chain: string, _fee: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "changeChainRoyaltyReceiver"
  ): TypedContractMethod<
    [_chain: string, _royaltyReceiver: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getLockNftSignatures"
  ): TypedContractMethod<
    [transactionHash: string, chain: string],
    [SignerAndSignatureStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getLockNftSignaturesCount"
  ): TypedContractMethod<
    [transactionHash: string, chain: string],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getStakingSignatures"
  ): TypedContractMethod<
    [stakerAddress: string],
    [SignerAndSignatureStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getStakingSignaturesCount"
  ): TypedContractMethod<[stakerAddress: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "lockSignatures"
  ): TypedContractMethod<
    [arg0: string, arg1: string, arg2: BigNumberish],
    [[string, string] & { signerAddress: string; signature: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "royaltyEpoch"
  ): TypedContractMethod<[arg0: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "stakingSignatures"
  ): TypedContractMethod<
    [arg0: string, arg1: BigNumberish],
    [[string, string] & { signerAddress: string; signature: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "usedSignatures"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "usedSignaturesBlackList"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "validatorCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "validatorEpoch"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "validatorStatusChangeVotes"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: boolean, arg2: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "validatorVoted"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "validators"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  filters: {};
}
