/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  Strings,
  StringsInterface,
} from "../../../../@openzeppelin/contracts/utils/Strings";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "StringsInsufficientHexLength",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea2646970667358221220ebf559ecd869b22266b23fd850e8444de99e34bdb6fda0e725bd9ae986ba4b1264736f6c63430008150033";

type StringsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StringsConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Strings__factory extends ContractFactory {
  constructor(...args: StringsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Strings & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Strings__factory {
    return super.connect(runner) as Strings__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StringsInterface {
    return new Interface(_abi) as StringsInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Strings {
    return new Contract(address, _abi, runner) as unknown as Strings;
  }
}
