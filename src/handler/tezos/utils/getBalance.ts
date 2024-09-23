import type { TezosProviderFetch } from "../types";

export default async function getBalance(
  fetchProvider: TezosProviderFetch,
  address: string,
) {
  const [provider, release] = await fetchProvider();
  const bal = BigInt((await provider.rpc.getBalance(address)).toString());
  release();
  return bal;
}
