import type { Account } from "@aptos-labs/ts-sdk";
import type { TAptosBridgeClient } from "..";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
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
  fetchBridge: () => Promise<readonly [TAptosBridgeClient, () => void]>,
  identity: Account,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  async function getStakingSignatureCount() {
    return Number(
      useMutexAndRelease(
        fetchBridge,
        async (bridge) =>
          await bridge.view.validator_count({
            functionArguments: [],
            typeArguments: [],
          }),
      ),
    );
  }

  const pubKeyHex = Buffer.from(identity.publicKey.toUint8Array()).toString(
    "hex",
  );
  const address = identity.accountAddress.toString();
  const vid = `${pubKeyHex}|${address}`;
  await addNewChain(staking, "aptos", validatorAddress, vid, logger);
  try {
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
    const added = await useMutexAndRelease(
      fetchBridge,
      async (bridge) =>
        await bridge.entry.add_validator({
          account: identity,
          functionArguments: [
            identity.publicKey.toUint8Array(),
            identity.accountAddress.toString(),
            signatures.map((e) => {
              return Buffer.from(e.signature.slice(2), "hex");
            }),
            signatures.map((e) => {
              return Buffer.from(e.signerAddress, "hex");
            }),
          ],
          typeArguments: [],
        }),
    );
    logger.info(`Added self as validator at hash: ${added.hash}`);
    return true;
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return false;
  }
}
