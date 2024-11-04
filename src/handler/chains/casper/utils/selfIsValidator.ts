import type { Ed25519 } from "casper-js-sdk/dist/lib/Keys";
import type { TCasperBridgeClient } from "..";

export default async function selfIsValidator(
  _fetchBridge: () => Promise<readonly [TCasperBridgeClient, () => void]>,
  _identity: Ed25519,
): Promise<boolean> {
  throw new Error("PANIC: Not yet implemented.");
}
