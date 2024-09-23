import type { Signer } from "ethers";
import type { EVMProviderFetch } from "../types";

export default async function getBalance(
  signer: Signer,
  fetchProvider: EVMProviderFetch,
) {
  const [provider, release] = await fetchProvider();
  const balance = await provider.getBalance(await signer.getAddress());
  release();
  return balance;
}
