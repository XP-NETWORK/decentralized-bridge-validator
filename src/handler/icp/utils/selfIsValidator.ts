import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.did";

export default async function selfIsValidator(
  client: ActorSubclass<_SERVICE>,
  identity: Ed25519KeyIdentity,
) {
  const publicKey = Buffer.from(identity.getPublicKey().toRaw()).toString(
    "hex",
  );
  const [validator] = await client.get_validator(publicKey);
  if (!validator) return false;
  return validator.address.toString() === identity.getPrincipal().toString();
}
