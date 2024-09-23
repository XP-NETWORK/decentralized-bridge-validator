import {
  BytesValue,
  ResultsParser,
  type SmartContract,
} from "@multiversx/sdk-core/out";
import type { UserSigner } from "@multiversx/sdk-wallet/out";
import type { MXProviderFetch } from "../types";

export default async function selfIsValidator(
  bc: SmartContract,
  signer: UserSigner,
  provider: MXProviderFetch,
) {
  const query = bc.createQuery({
    func: "validators",
    args: [new BytesValue(Buffer.from(signer.getAddress().hex(), "hex"))],
  });
  const [p, r] = await provider();
  const queryResponse = await p.queryContract(query);
  r();
  const validatorsDefinition = bc.getEndpoint("validators");
  const resultsParser = new ResultsParser();
  const { firstValue } = resultsParser.parseQueryResponse(
    queryResponse,
    validatorsDefinition,
  );
  let added = false;
  if (firstValue) {
    const [value] = firstValue.valueOf();
    added = value?.added ?? false;
  }
  return added;
}
