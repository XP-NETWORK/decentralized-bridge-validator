import type { Address } from "@ton/ton";
import { useMutexAndRelease } from "../../utils";
import type { TONProviderFetch } from "../types";

export default async function getBalance(
  client: TONProviderFetch,
  address: Address,
) {
  return useMutexAndRelease(client, async (tc) => await tc.getBalance(address));
}
