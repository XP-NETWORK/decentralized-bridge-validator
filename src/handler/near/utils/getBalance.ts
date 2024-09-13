import type { Near } from "near-api-js";

export default async function getBalance(conn: Near, account_id: string) {
  const acc = await conn.account(account_id);
  const balance = await acc.getAccountBalance();
  return BigInt(balance.available);
}
