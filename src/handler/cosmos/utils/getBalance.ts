import type { AccountData } from "@cosmjs/amino";
import type { CosmWasmFetchProvider } from "../types";

export default async function getBalance(
  fetchProvider: CosmWasmFetchProvider,
  sender: AccountData,
) {
  const [provider, release] = await fetchProvider();
  const balance = await provider.getBalance(sender.address, "uatom");
  release();
  return BigInt(balance?.amount ?? 0);
}
