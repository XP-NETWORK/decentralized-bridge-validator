import type { Bridge } from "@xp/cosmos-client";

export default async function selfIsValidator(
  client: () => Promise<readonly [Bridge.BridgeClient, () => void]>,
  publicKey: Buffer,
) {
  const [bc, release] = await client();
  const { data } = await bc.getValidator({
    address: publicKey.toString("base64"),
  });
  release();
  return data?.added || false;
}
