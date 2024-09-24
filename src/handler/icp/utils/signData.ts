import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import * as ed from "@noble/ed25519";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";

export default async function signData(
  buf: string,
  identity: Ed25519KeyIdentity,
  fetchBridge: () => Promise<readonly [ActorSubclass<_SERVICE>, () => void]>,
) {
  const [principal, pubk] = buf.split(",");
  const [bc, release] = await fetchBridge();
  const body = await bc.encode_add_validator({
    principal: Principal.fromText(principal),
    public_key: pubk,
  });
  release();
  const signtureBytes = await ed.sign(
    Buffer.from(body),
    Buffer.from(identity.getKeyPair().secretKey),
  );
  const signature = `0x${Buffer.from(signtureBytes).toString("hex")}`;
  return {
    signature,
    signer: Buffer.from(identity.getPublicKey().toRaw()).toString("hex"),
  };
}
