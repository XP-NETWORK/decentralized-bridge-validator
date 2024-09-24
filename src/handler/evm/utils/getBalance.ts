import type { Signer } from "ethers";
import { useMutexAndRelease } from "../../utils";
import type { EVMProviderFetch } from "../types";

export default async function getBalance(
  signer: Signer,
  fetchProvider: EVMProviderFetch,
) {
  return useMutexAndRelease(fetchProvider, async (provider) => {
    return provider.getBalance(await signer.getAddress());
  });
}
