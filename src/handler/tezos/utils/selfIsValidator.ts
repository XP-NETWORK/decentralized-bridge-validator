import type { Signer } from "@taquito/taquito";
import type { BridgeContractType } from "../../../contractsTypes/tezos/Bridge.types";
import { tas } from "../../../contractsTypes/tezos/type-aliases";
import { useMutexAndRelease } from "../../utils";

export default async function selfIsValidator(
  bc: () => Promise<readonly [BridgeContractType, () => void]>,
  signer: Signer,
) {
  const mutez = await useMutexAndRelease(
    bc,
    async (bridge) =>
      await (await bridge.storage()).validators.get(
        tas.address(await signer.publicKeyHash()),
      ),
  );
  return mutez !== undefined;
}
