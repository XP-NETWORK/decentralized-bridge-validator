import { useMutexAndRelease } from "../../../utils";
import type { SecretProviderFetch } from "../types";

export default async function selfIsValidator(
  fetchProvider: SecretProviderFetch,
  bridge: string,
  bridgeCodeHash: string,
  publicKey: string,
) {
  const res = await useMutexAndRelease(fetchProvider, async (client) => {
    return (await client.query.compute.queryContract({
      contract_address: bridge,
      code_hash: bridgeCodeHash,
      query: {
        get_validator: {
          address: Buffer.from(publicKey, "hex").toString("base64"),
        },
      },
    })) as { validator: { data: { added: boolean } } };
  });
  return (res?.validator?.data?.added && res?.validator?.data?.added) ?? false;
}
