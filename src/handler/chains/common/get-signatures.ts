import type { BridgeStorage } from "../../../contractsTypes/evm";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export async function getSignatures(
  getStakingSignatureCount: () => Promise<number>,
  storage: BridgeStorage,
  vid: string,
) {
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
  return signatures;
}
