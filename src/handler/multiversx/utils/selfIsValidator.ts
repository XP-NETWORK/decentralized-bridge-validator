import {
  BytesValue,
  ResultsParser,
  SmartContract,
} from "@multiversx/sdk-core/out";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { UserSigner } from "@multiversx/sdk-wallet/out";

export default async function selfIsValidator(
  bc: SmartContract,
  signer: UserSigner,
  provider: INetworkProvider,
) {
  const query = bc.createQuery({
    func: "validators",
    args: [new BytesValue(Buffer.from(signer.getAddress().hex(), "hex"))],
  });
  const queryResponse = await provider.queryContract(query);
  const validatorsDefinition = bc.getEndpoint("validators");
  const resultsParser = new ResultsParser();
  const { firstValue } = resultsParser.parseQueryResponse(
    queryResponse,
    validatorsDefinition,
  );
  let added = false;
  if (firstValue) ({ added } = firstValue.valueOf()[0]);
  return added;
}
