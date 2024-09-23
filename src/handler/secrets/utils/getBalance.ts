import type { SecretProviderFetch } from "../types";

export default async function getBalance(fetchProvider: SecretProviderFetch) {
  const [client, release] = await fetchProvider();
  const response = await client.query.bank.balance({
    address: client.address,
    denom: "uscrt",
  });
  release();
  return BigInt(response.balance?.amount ?? 0);
}
