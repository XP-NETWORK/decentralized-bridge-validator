import { useMutexAndRelease } from "../../utils";
import type { TezosProviderFetch } from "../types";

export default async function getBalance(
  fetchProvider: TezosProviderFetch,
  address: string,
) {
  const bal = useMutexAndRelease(fetchProvider, async (provider) =>
    BigInt((await provider.rpc.getBalance(address)).toString()),
  );
  return bal;
}
