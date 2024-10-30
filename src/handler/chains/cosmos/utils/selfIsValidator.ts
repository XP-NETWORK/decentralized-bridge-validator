import type { Bridge } from "@xp/cosmos-client";
import { useMutexAndRelease } from "../../../utils";

export default async function selfIsValidator(
  client: () => Promise<readonly [Bridge.BridgeClient, () => void]>,
  publicKey: Buffer,
) {
  const { data } = await useMutexAndRelease(
    client,
    async (bridge) =>
      await bridge.getValidator({
        address: publicKey.toString("base64"),
      }),
  );
  return data?.added || false;
}
