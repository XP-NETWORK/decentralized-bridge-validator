import { useMutexAndRelease } from "../../utils";
import type { SecretProviderFetch } from "../types";

export default async function getBalance(fetchProvider: SecretProviderFetch) {
  const response = await useMutexAndRelease(
    fetchProvider,
    async (client) =>
      await client.query.bank.balance({
        address: client.address,
        denom: "uscrt",
      }),
  );
  return BigInt(response.balance?.amount ?? 0);
}
