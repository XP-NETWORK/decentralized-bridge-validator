import { type Keys, PurseIdentifier } from "casper-js-sdk";
import { useMutexAndRelease } from "../../../utils";
import type { CasperProviderFetch } from "../types";

export default async function getBalance(
  fetchProvider: CasperProviderFetch,
  signer: Keys.Ed25519,
) {
  const balance = await useMutexAndRelease(fetchProvider, async (provider) => {
    return provider.nodeClient.queryBalance(
      PurseIdentifier.MainPurseUnderAccountHash,
      signer.accountHash().toFormattedString(),
    );
  });
  return balance.toBigInt();
}
