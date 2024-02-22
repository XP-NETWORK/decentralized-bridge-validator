import { Wallet } from "ethers";
import { Bridge, BridgeStorage } from "../../../contractsTypes/evm";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

const addSelfAsValidator = (
  bc: Bridge,
  storage: BridgeStorage,
  signer: Wallet,
) => {
  return async (): Promise<"success" | "failure"> => {
    try {
      let validatorsCount = Number(await bc.validatorsCount());
      let signatureCount = Number(
        await storage.getStakingSignaturesCount(signer.address),
      );

      while (signatureCount < confirmationCountNeeded(validatorsCount)) {
        await waitForMSWithMsg(
          ProcessDelayMilliseconds,
          `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
            validatorsCount,
          )}`,
        );
        signatureCount = Number(
          await storage.getStakingSignaturesCount(signer.address),
        );
        validatorsCount = Number(await bc.validatorsCount());
      }

      const stakingSignatures = [
        ...(await storage.getStakingSignatures(signer.address)),
      ].map((item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      });

      const added = await bc.addValidator(signer.address, stakingSignatures);
      added.wait();
      return "success";
    } catch (e) {
      return "failure";
    }
  };
};

export default addSelfAsValidator;
