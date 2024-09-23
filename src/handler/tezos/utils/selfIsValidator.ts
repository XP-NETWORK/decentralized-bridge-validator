import type { Signer } from "@taquito/taquito";
import type { BridgeContractType } from "../../../contractsTypes/tezos/Bridge.types";
import { tas } from "../../../contractsTypes/tezos/type-aliases";

export default async function selfIsValidator(
  bc: () => Promise<readonly [BridgeContractType, () => void]>,
  signer: Signer,
) {
  const [bridge, release] = await bc();
  const mutez = await (await bridge.storage()).validators.get(
    tas.address(await signer.publicKeyHash()),
  );
  release();
  return mutez !== undefined;
}
