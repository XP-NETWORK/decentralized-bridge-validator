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

export type ValidatorAddressAndChainTypeStruct = {
  validatorAddress: string;
  chainType: string;
};

export type ValidatorAddressAndChainTypeStructOutput = [
  validatorAddress: string,
  chainType: string
] & { validatorAddress: string; chainType: string };

export interface ERC20StakingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ERC20Token"
      | "addNewChains"
      | "stakeERC20"
      | "stakingAmount"
      | "stakingBalances"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;

  encodeFunctionData(
    functionFragment: "ERC20Token",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addNewChains",
    values: [ValidatorAddressAndChainTypeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeERC20",
    values: [ValidatorAddressAndChainTypeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakingBalances",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "ERC20Token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addNewChains",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakeERC20", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakingAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingBalances",
    data: BytesLike
  ): Result;
}

export namespace StakedEvent {
  export type InputTuple = [
    sender: AddressLike,
    amount: BigNumberish,
    validatorAddressAndChainType: ValidatorAddressAndChainTypeStruct[]
  ];
  export type OutputTuple = [
    sender: string,
    amount: bigint,
    validatorAddressAndChainType: ValidatorAddressAndChainTypeStructOutput[]
  ];
  export interface OutputObject {
    sender: string;
    amount: bigint;
    validatorAddressAndChainType: ValidatorAddressAndChainTypeStructOutput[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ERC20Staking extends BaseContract {
  connect(runner?: ContractRunner | null): ERC20Staking;
  waitForDeployment(): Promise<this>;

  interface: ERC20StakingInterface;

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

  ERC20Token: TypedContractMethod<[], [string], "view">;

  addNewChains: TypedContractMethod<
    [_validatorAddressAndChainType: ValidatorAddressAndChainTypeStruct[]],
    [void],
    "nonpayable"
  >;

  stakeERC20: TypedContractMethod<
    [_validatorAddressAndChainType: ValidatorAddressAndChainTypeStruct[]],
    [void],
    "nonpayable"
  >;

  stakingAmount: TypedContractMethod<[], [bigint], "view">;

  stakingBalances: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ERC20Token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "addNewChains"
  ): TypedContractMethod<
    [_validatorAddressAndChainType: ValidatorAddressAndChainTypeStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "stakeERC20"
  ): TypedContractMethod<
    [_validatorAddressAndChainType: ValidatorAddressAndChainTypeStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "stakingAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "stakingBalances"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getEvent(
    key: "Staked"
  ): TypedContractEvent<
    StakedEvent.InputTuple,
    StakedEvent.OutputTuple,
    StakedEvent.OutputObject
  >;

  filters: {
    "Staked(address,uint256,tuple[])": TypedContractEvent<
      StakedEvent.InputTuple,
      StakedEvent.OutputTuple,
      StakedEvent.OutputObject
    >;
    Staked: TypedContractEvent<
      StakedEvent.InputTuple,
      StakedEvent.OutputTuple,
      StakedEvent.OutputObject
    >;
  };
}
