import {
  CLPublicKeyTag,
  type CLU64,
  CLValueBuilder,
  type Keys,
  RuntimeArgs,
} from "casper-js-sdk";
import type { TCasperBridgeClient } from "..";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";
import { useMutexAndRelease } from "../../../utils";
import { addNewChain } from "../../common/add-new-chain";
import { getSignatures } from "../../common/get-signatures";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  chainName: string,
  fetchBridge: () => Promise<readonly [TCasperBridgeClient, () => void]>,
  identity: Keys.Ed25519,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  const vid = Buffer.from(identity.publicKey.value()).toString("hex");
  await addNewChain(staking, "casper", validatorAddress, vid, logger);
  const func = async () => {
    const num: CLU64 = await useMutexAndRelease(fetchBridge, async (br) => {
      return await br.queryContractData(["validator_count"]);
    });
    return num.value().toNumber();
  };

  try {
    const signatures = await getSignatures(func, storage, vid);
    useMutexAndRelease(fetchBridge, async (bridge) => {
      bridge.callEntrypoint(
        "add_validator",
        RuntimeArgs.fromMap({
          new_validator_public_key_arg: CLValueBuilder.publicKey(
            identity.publicKey.value(),
            CLPublicKeyTag.ED25519,
          ),
          signatures_arg: CLValueBuilder.list(
            signatures.map((signature) => {
              return CLValueBuilder.tuple2([
                CLValueBuilder.publicKey(
                  Buffer.from(signature.signerAddress, "hex"),
                  CLPublicKeyTag.ED25519,
                ),
                CLValueBuilder.byteArray(
                  Buffer.from(signature.signature.slice(2), "hex"),
                ),
              ]);
            }),
          ),
        }),
        identity.publicKey,
        chainName,
        "10000000000",
        [identity],
      );
    });
    return true;
  } catch (e) {
    logger.error("Failed to add self as validator:", e);
    return false;
  }
}
