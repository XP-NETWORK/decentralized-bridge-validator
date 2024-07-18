import type { UserSigner } from "@multiversx/sdk-wallet/out";

export default async function signData(buf: string, signer: UserSigner) {
  return {
    signature: `0x${(await signer.sign(Buffer.from(buf, "hex"))).toString(
      "hex",
    )}`,
    signer: signer.getAddress().hex(),
  };
}
