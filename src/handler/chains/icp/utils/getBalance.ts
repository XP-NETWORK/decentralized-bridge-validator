import type { Identity } from "@dfinity/agent";
import { AccountIdentifier, type LedgerCanister } from "@dfinity/ledger-icp";
import { useMutexAndRelease } from "../../../utils";

export default async function getBalance(
  fetchLedger: () => Promise<readonly [LedgerCanister, () => void]>,
  identity: Identity,
) {
  const aid = AccountIdentifier.fromPrincipal({
    principal: identity.getPrincipal(),
  });
  // const [ledger, release] = await fetchLedger();

  const balance = await useMutexAndRelease(
    fetchLedger,
    async (ledger) => await ledger.accountBalance({ accountIdentifier: aid }),
  );
  // release();
  return balance;
}
