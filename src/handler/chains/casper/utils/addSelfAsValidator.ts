import crypto from "node:crypto";
import {
  CLPublicKeyTag,
  CLValueBuilder,
  type CasperClient,
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
import { getDeploy } from "./get-deploy";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  network: "casper-test" | "casper",
  fetchBridge: () => Promise<readonly [TCasperBridgeClient, () => void]>,
  fetchProvider: () => Promise<readonly [CasperClient, () => void]>,
  rpc: string,
  identity: Keys.Ed25519,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  const vid = crypto
    .createHash("sha256")
    .update(identity.publicKey.data)
    .digest();
  await addNewChain(
    staking,
    "casper",
    validatorAddress,
    vid.toString("hex"),
    logger,
  );
  const func = async (): Promise<number> => {
    const num = await useMutexAndRelease(fetchBridge, async (br) => {
      return await br.queryContractData(["validators_count"]);
    });
    return num.toNumber();
  };

  const signatures = await getSignatures(func, storage, vid.toString("hex"));

  try {
    const submit = await useMutexAndRelease(fetchBridge, async (bridge) => {
      // bridge.callEntrypoint("submit_signatures", RuntimeArgs.fromMap(), identity.publicKey, )
      console.log(signatures);
      const clSignerAndSignature = signatures.map(
        ({ signature, signerAddress }) => {
          const signerClValue = CLValueBuilder.publicKey(
            Buffer.from(signerAddress, "hex"),
            CLPublicKeyTag.ED25519,
          );
          const signatureClValue = CLValueBuilder.byteArray(
            Buffer.from(signature.replace("0x", ""), "hex"),
          );
          return CLValueBuilder.tuple2([signerClValue, signatureClValue]);
        },
      );

      const clSignerAndSignatureList =
        CLValueBuilder.list(clSignerAndSignature);

      const rt_args = RuntimeArgs.fromMap({
        data_hash_arg: CLValueBuilder.byteArray(vid),
        data_type_arg: CLValueBuilder.u8(1),
        signatures_arg: clSignerAndSignatureList,
      });
      const costOfSignatures =
        10000000000 * clSignerAndSignatureList.value().length;

      return bridge
        .callEntrypoint(
          "submit_signatures",
          rt_args,
          identity.publicKey,
          network,
          String(35000000000 + costOfSignatures),
          [identity],
        )
        .send(rpc);
    });

    await useMutexAndRelease(
      fetchProvider,
      async (provider) => await getDeploy(provider, submit),
    );
    logger.info("Submitted Signatures to add validator");

    const response = await useMutexAndRelease(fetchBridge, async (bridge) => {
      return bridge
        .callEntrypoint(
          "add_validator",
          RuntimeArgs.fromMap({
            new_validator_public_key_arg: identity.publicKey,
          }),
          identity.publicKey,
          network,
          "15000000000",
          [identity],
        )
        .send(rpc);
    });
    await useMutexAndRelease(fetchProvider, async (provider) => {
      return await getDeploy(provider, response);
    });
    logger.info("Added self as validator.");
    return true;
  } catch (e) {
    logger.error("Failed to add self as validator:", e);
    return false;
  }
}
