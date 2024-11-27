import type { Ed25519 } from "casper-js-sdk/dist/lib/Keys";
import type { TCasperBridgeClient } from "..";
import { useMutexAndRelease } from "../../../utils";

export default async function selfIsValidator(
  fetchBridge: () => Promise<readonly [TCasperBridgeClient, () => void]>,
  identity: Ed25519,
): Promise<boolean> {
  try {
    const response = await useMutexAndRelease(fetchBridge, async (bridge) => {
      return await bridge.queryContractDictionary(
        "validators_dict",
        identity.publicKey.toAccountRawHashStr(),
      );
    });
    return response.data[0].data;
  } catch (e) {
    return false;
  }
}
