import type { Contract } from "near-api-js";

export default async function selfIsValidator(
  bridge: Contract & Record<string, CallableFunction>,
  publicKeyInHex: string,
) {
  const validator = await bridge.validator({ public_key: publicKeyInHex });
  if (!validator) return false;
  return true;
}
