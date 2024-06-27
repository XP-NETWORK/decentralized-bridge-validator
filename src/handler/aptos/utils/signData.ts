import { createHash } from "crypto";
import * as ed from "@noble/ed25519";
import { BCS, HexString } from "aptos";

const signData = async (buf: string, pk: string, pubk: string) => {
  const serializer = new BCS.Serializer();
  serializer.serializeFixedBytes(new HexString(buf).toUint8Array());
  const msgHash = createHash("SHA256").update(serializer.getBytes()).digest();

  const signature = await ed.sign(msgHash, Buffer.from(pk, "hex"));

  return { signature, signer: pubk };
};

async function test() {
  const res = await signData(
    "0xd74738213a0d8db59a2611bead568fc976947626b4ca779e17609b347de4c003",
    "85ecc3678136901a49fdd83eaaed1b2878d032d468a37e6ce961b8326a4cfbe7",
    "0xd74738213a0d8db59a2611bead568fc976947626b4ca779e17609b347de4c003",
  );
  console.log({ res });
}

test();

export default signData;
