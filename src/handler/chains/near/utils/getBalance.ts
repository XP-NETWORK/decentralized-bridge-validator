import type { NearProviderFetch } from "../types";

export default async function getBalance(
  conn: NearProviderFetch,
  account_id: string,
) {
  const [provider, release] = await conn();
  const acc = await provider.account(account_id);
  const balance = await acc.getAccountBalance();
  release();
  return BigInt(balance.available);
}
