import type { Account } from "@aptos-labs/ts-sdk";
import type { TAptosBridgeClient } from "..";
import { useMutexAndRelease } from "../../../utils";

export default async function selfIsValidator(
  fetchBridge: () => Promise<readonly [TAptosBridgeClient, () => void]>,
  identity: Account,
) {
  const [validator] = await useMutexAndRelease(fetchBridge, async (bridge) => {
    return bridge.view.has_validator({
      functionArguments: [identity.publicKey.toUint8Array()],
      typeArguments: [],
    });
  });
  return validator;
}
