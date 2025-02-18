import { type Keys, PurseIdentifier } from "casper-js-sdk";
import { useMutexAndRelease } from "../../../utils";
import type { CasperProviderFetch } from "../types";

export default async function getBalance(
  fetchProvider: CasperProviderFetch,
  signer: Keys.Ed25519,
) {
  try {
    console.log(
      "casper",
      signer.publicKey.toHex(),
      signer.publicKey.toAccountHashStr(),
    );
    const balance = await useMutexAndRelease(
      fetchProvider,
      async (provider) => {
        return await provider.nodeClient.queryBalance(
          PurseIdentifier.MainPurseUnderPublicKey,
          signer.publicKey.toHex(),
        );
      },
    );
    return balance.toBigInt();
  } catch {
    return 0n;
  }
}
