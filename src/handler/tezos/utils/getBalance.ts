import type { TezosToolkit } from "@taquito/taquito";

export default async function getBalance(
  provider: TezosToolkit,
  address: string,
) {
  return BigInt((await provider.rpc.getBalance(address)).toString());
}
