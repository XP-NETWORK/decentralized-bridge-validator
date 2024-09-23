import type { Address } from "@ton/ton";
import type { TONProviderFetch } from "../types";

export default async function getBalance(
  client: TONProviderFetch,
  address: Address,
) {
  const [tc, release] = await client();
  const balance = await tc.getBalance(address);
  release();
  return balance;
}
