import type { AccountData } from "@cosmjs/amino";
import { useMutexAndRelease } from "../../utils";
import type { CosmWasmFetchProvider } from "../types";

export default async function getBalance(
  fetchProvider: CosmWasmFetchProvider,
  sender: AccountData,
) {
  const balance = await useMutexAndRelease(
    fetchProvider,
    async (provider) => await provider.getBalance(sender.address, "uatom"),
  );
  return BigInt(balance?.amount ?? 0);
}
