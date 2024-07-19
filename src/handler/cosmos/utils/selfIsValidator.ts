import type { Bridge } from "@xp/cosmos-client";

export default async function selfIsValidator(
  client: Bridge.BridgeClient,
  publicKey: Buffer,
) {
  const { data } = await client.getValidator({
    address: publicKey.toString("base64"),
  });
  return data?.added || false;
}
