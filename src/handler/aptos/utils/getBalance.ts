import type { Account } from "@aptos-labs/ts-sdk";
import { useMutexAndRelease } from "../../utils";
import type { AptosProviderFetch } from "../types";

export default async function getBalance(
  fetchProvider: AptosProviderFetch,
  signer: Account,
) {
  const balance = await useMutexAndRelease(fetchProvider, async (provider) => {
    return provider.getAccountAPTAmount({
      accountAddress: signer.accountAddress,
    });
  });
  return BigInt(balance);
}
