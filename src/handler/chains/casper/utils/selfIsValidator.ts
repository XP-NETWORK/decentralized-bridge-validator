import type { Ed25519 } from "casper-js-sdk/dist/lib/Keys";
import type { TCasperBridgeClient } from "..";
import { useMutexAndRelease } from "../../../utils";

export default async function selfIsValidator(
  fetchBridge: () => Promise<readonly [TCasperBridgeClient, () => void]>,
  identity: Ed25519,
): Promise<boolean> {
  try {
    await useMutexAndRelease(fetchBridge, async (bridge) => {
      return bridge.queryContractDictionary(
        "validators",
        Buffer.from(identity.publicKey.value()).toString("hex"),
      );
    });
    return true;
  } catch {
    return false;
  }
}
