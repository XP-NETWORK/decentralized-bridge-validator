import {
  IEvmChainConfig,
  IHederaChainConfig,
  IMultiversXChainConfig,
  ISecretChainConfig,
  ITezosChainConfig,
  ITonChainConfig,
  TChain,
} from "../types";

export function getConfigs(bridgeTestChains: TChain[]) {
  return {
    bsc: bridgeTestChains.find((e) => e.chain === "BSC")! as IEvmChainConfig,
    eth: bridgeTestChains.find((e) => e.chain === "ETH")! as IEvmChainConfig,
    hedera: bridgeTestChains.find(
      (e) => e.chain === "HEDERA",
    )! as IHederaChainConfig,
    tezos: bridgeTestChains.find(
      (e) => e.chain === "TEZOS",
    )! as ITezosChainConfig,
    multiversx: bridgeTestChains.find(
      (e) => e.chain === "MULTIVERSX",
    )! as IMultiversXChainConfig,
    secret: bridgeTestChains.find(
      (e) => e.chain === "SECRET",
    )! as ISecretChainConfig,
    ton: bridgeTestChains.find((e) => e.chain === "TON")! as ITonChainConfig,
  };
}
