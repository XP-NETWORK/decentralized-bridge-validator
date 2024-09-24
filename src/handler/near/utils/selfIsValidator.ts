import type { Contract } from "near-api-js";

export default async function selfIsValidator(
  fetchBridge: () => Promise<
    readonly [Contract & Record<string, CallableFunction>, () => void]
  >,
  publicKeyInHex: string,
) {
  try {
    const [bridge, release] = await fetchBridge();
    const validator = await bridge.validator({ public_key: publicKeyInHex });
    release();
    if (!validator) return false;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
