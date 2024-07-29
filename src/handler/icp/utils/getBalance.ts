import type { Identity } from "@dfinity/agent";
import { AccountIdentifier, type LedgerCanister } from "@dfinity/ledger-icp";

export default async function getBalance(
  actor: LedgerCanister,
  identity: Identity,
) {
  const aid = AccountIdentifier.fromPrincipal({
    principal: identity.getPrincipal(),
  });
  return actor.accountBalance({ accountIdentifier: aid });
}
