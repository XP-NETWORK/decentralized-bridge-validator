import { hash } from "@stablelib/blake2b";

import { MichelCodecPacker, type Signer } from "@taquito/taquito";
import { b58cdecode, b58cencode, prefix } from "@taquito/utils";
import { tas } from "xp-decentralized-sdk/dist/contractsTypes/tezos/type-aliases";

export default async function signData(buf: string, signer: Signer) {
  const packer = new MichelCodecPacker();
  const address = tas.address(
    b58cencode(
      hash(new Uint8Array(b58cdecode(buf, prefix.edpk)), 20),
      prefix.tz1,
    ),
  );
  const packed = await packer.packData({
    data: {
      string: address,
    },
    type: {
      prim: "address",
    },
  });

  const signature = `0x${Buffer.from(
    (await signer.sign(packed.packed)).sig,
  ).toString("hex")}`;
  return { signature, signer: await signer.publicKey() };
}
