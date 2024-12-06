import type { Contract } from "near-api-js";
import { useMutexAndRelease } from "../../../utils";

export default async function selfIsValidator(
  fetchBridge: () => Promise<
    readonly [Contract & Record<string, CallableFunction>, () => void]
  >,
  publicKeyInHex: string,
) {
  try {
    const validator = await useMutexAndRelease(
      fetchBridge,
      async (bridge) => await bridge.validator({ public_key: publicKeyInHex }),
    );
    if (!validator) return false;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
