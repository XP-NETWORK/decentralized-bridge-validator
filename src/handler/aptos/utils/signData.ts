import { createHash } from "crypto";
import * as ed from "@noble/ed25519";
import { BCS, HexString } from "aptos";

const signData = async (buf: string, pk: string, pubk: string) => {
  const serializer = new BCS.Serializer();
  serializer.serializeFixedBytes(new HexString(buf).toUint8Array());
  const msgHash = createHash("SHA256").update(serializer.getBytes()).digest();

  const signature = await ed.sign(msgHash, Buffer.from(pk, "hex"));

  return { signature: signature.toString(), signer: pubk };
};

export default signData;
