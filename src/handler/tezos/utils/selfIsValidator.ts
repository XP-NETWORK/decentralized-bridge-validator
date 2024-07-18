import type { Signer } from "@taquito/taquito";
import type { BridgeContractType } from "../../../contractsTypes/tezos/Bridge.types";
import { tas } from "../../../contractsTypes/tezos/type-aliases";

export default async function selfIsValidator(
  bc: BridgeContractType,
  signer: Signer,
) {
  const mutez = (await bc.storage()).validators.get(
    tas.address(await signer.publicKeyHash()),
  );
  return mutez !== undefined;
}
