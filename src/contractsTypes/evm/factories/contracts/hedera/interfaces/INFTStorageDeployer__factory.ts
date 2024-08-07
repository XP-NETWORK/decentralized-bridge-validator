/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  INFTStorageDeployer,
  INFTStorageDeployerInterface,
} from "../../../../contracts/hedera/interfaces/INFTStorageDeployer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "collectionAddress",
        type: "address",
      },
    ],
    name: "deployNFT721Storage",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class INFTStorageDeployer__factory {
  static readonly abi = _abi;
  static createInterface(): INFTStorageDeployerInterface {
    return new Interface(_abi) as INFTStorageDeployerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): INFTStorageDeployer {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as INFTStorageDeployer;
  }
}
