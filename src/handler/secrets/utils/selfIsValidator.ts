import { SecretNetworkClient } from "secretjs";

export async function selfIsValidator(
  client: SecretNetworkClient,
  bridge: string,
  bridgeCodeHash: string,
  publicKey: string,
) {
  const res = (await client.query.compute.queryContract({
    contract_address: bridge,
    code_hash: bridgeCodeHash,
    query: {
      get_validator: {
        address: Buffer.from(publicKey, "hex").toString("base64"),
      },
    },
  })) as { validator: { data: { added: boolean } } };
  return res.validator.data.added && res.validator.data.added;
}
