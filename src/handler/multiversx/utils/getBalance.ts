import type { IAddress } from "@multiversx/sdk-core/out";
import { useMutexAndRelease } from "../../utils";
import type { MXProviderFetch } from "../types";

export default async function getBalance(
  provider: MXProviderFetch,
  address: IAddress,
) {
  const acc = await useMutexAndRelease(
    provider,
    async (pp) => await pp.getAccount(address),
  );
  return BigInt(acc.balance.toString());
}
