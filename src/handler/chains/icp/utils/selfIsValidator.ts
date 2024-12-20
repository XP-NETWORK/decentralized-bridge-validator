import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type { _SERVICE } from "../../../../contractsTypes/icp/bridge/bridge.types";
import { useMutexAndRelease } from "../../../utils";

export default async function selfIsValidator(
  fetchBridge: () => Promise<readonly [ActorSubclass<_SERVICE>, () => void]>,
  identity: Ed25519KeyIdentity,
) {
  const publicKey = Buffer.from(identity.getPublicKey().toRaw()).toString(
    "hex",
  );
  const [validator] = await useMutexAndRelease(
    fetchBridge,
    async (client) => await client.get_validator(publicKey),
  );
  if (!validator) return false;
  return validator.address.toString() === identity.getPrincipal().toString();
}
