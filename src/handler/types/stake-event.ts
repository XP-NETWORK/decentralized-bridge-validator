import type { TSupportedChainTypes } from "../../config";

export type StakeEvent = {
  validatorAddress: string;
  caller: string;
  chainType: TSupportedChainTypes;
}[];
