import type { SecretNetworkClient } from "secretjs";

export default async function getBalance(client: SecretNetworkClient) {
  const response = await client.query.bank.balance({
    address: client.address,
    denom: "uscrt",
  });
  return BigInt(response.balance?.amount ?? 0);
}
