/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IHRC,
  IHRCInterface,
} from "../../../../../lib/hedera/contracts/hts-precompile/IHRC";

const _abi = [
  {
    inputs: [],
    name: "associate",
    outputs: [
      {
        internalType: "uint256",
        name: "responseCode",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dissociate",
    outputs: [
      {
        internalType: "uint256",
        name: "responseCode",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IHRC__factory {
  static readonly abi = _abi;
  static createInterface(): IHRCInterface {
    return new Interface(_abi) as IHRCInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IHRC {
    return new Contract(address, _abi, runner) as unknown as IHRC;
  }
}
