/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  INFTClaim,
  INFTClaimInterface,
} from "../../../../contracts/hedera/interfaces/INFTClaim";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "int64",
        name: "serial",
        type: "int64",
      },
    ],
    name: "addClaimRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "data",
        type: "uint256",
      },
    ],
    name: "decodeHts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "int64",
        name: "",
        type: "int64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "int64",
        name: "serialNum",
        type: "int64",
      },
    ],
    name: "getClaimRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getClaimableNfts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class INFTClaim__factory {
  static readonly abi = _abi;
  static createInterface(): INFTClaimInterface {
    return new Interface(_abi) as INFTClaimInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): INFTClaim {
    return new Contract(address, _abi, runner) as unknown as INFTClaim;
  }
}