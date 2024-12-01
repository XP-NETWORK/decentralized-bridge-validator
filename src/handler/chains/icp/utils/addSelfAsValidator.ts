import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { _SERVICE } from "../../../../contractsTypes/icp/bridge/bridge.types";
import type { LogInstance } from "../../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../../utils";
import { addNewChain } from "../../common/add-new-chain";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  fetchBridge: () => Promise<readonly [ActorSubclass<_SERVICE>, () => void]>,
  identity: Ed25519KeyIdentity,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  const vid = `${identity.getPrincipal()},${Buffer.from(
    identity.getPublicKey().toRaw(),
  ).toString("hex")}`;
  await addNewChain(staking, "icp", validatorAddress, vid, logger);
  const publicKey = Buffer.from(identity.getPublicKey().toRaw()).toString(
    "hex",
  );
  try {
    async function getStakingSignatureCount() {
      return Number(
        useMutexAndRelease(
          fetchBridge,
          async (bridge) => await bridge.get_validator_count(),
        ),
      );
    }
    let validatorsCount = await getStakingSignatureCount();
    let signatureCount = Number(await storage.getStakingSignaturesCount(vid));

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(await storage.getStakingSignaturesCount(vid));
      validatorsCount = await getStakingSignatureCount();
    }
    const signatures = [...(await storage.getStakingSignatures(vid))].map(
      (item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      },
    );
    await useMutexAndRelease(
      fetchBridge,
      async (bridge) =>
        await bridge.add_validator(
          {
            principal: identity.getPrincipal(),
            public_key: publicKey,
          },
          signatures.map((e) => {
            return {
              signature: e.signature.replace("0x", ""),
              signer: e.signerAddress,
            };
          }),
        ),
    );
    return true;
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return false;
  }
}
