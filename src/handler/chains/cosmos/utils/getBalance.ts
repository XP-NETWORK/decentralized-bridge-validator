import type { AccountData } from "@cosmjs/amino";
import { useMutexAndRelease } from "../../../utils";
import type { CosmWasmFetchProvider } from "../types";

export default async function getBalance(
  fetchProvider: CosmWasmFetchProvider,
  sender: AccountData,
  currency: string,
) {
  const balance = await useMutexAndRelease(
    fetchProvider,
    async (provider) => await provider.getBalance(sender.address, currency),
  );
  return BigInt(balance?.amount ?? 0);
}
