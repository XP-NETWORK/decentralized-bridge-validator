import {
  IEvmChainConfig,
  IMultiversXChainConfig,
  ISecretChainConfig,
  ITezosChainConfig,
  ITonChainConfig,
  TChain,
} from "../types";

export function getConfigs(bridgeTestChains: TChain[]) {
  return {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    bsc: bridgeTestChains.find((e) => e.chain === "BSC")! as IEvmChainConfig,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    eth: bridgeTestChains.find((e) => e.chain === "ETH")! as IEvmChainConfig,
    // hedera: bridgeTestChains.find(
    //   (e) => e.chain === "HEDERA",
    // )! as IHederaChainConfig,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    tezos: bridgeTestChains.find(
      (e) => e.chain === "TEZOS",
    )! as ITezosChainConfig,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    multiversx: bridgeTestChains.find(
      (e) => e.chain === "MULTIVERSX",
    )! as IMultiversXChainConfig,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    secret: bridgeTestChains.find(
      (e) => e.chain === "SECRET",
    )! as ISecretChainConfig,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    ton: bridgeTestChains.find((e) => e.chain === "TON")! as ITonChainConfig,
  };
}
