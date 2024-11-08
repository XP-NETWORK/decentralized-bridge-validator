import type { Wallet } from "ethers";
import type { Bridge, BridgeStorage } from "../../../../contractsTypes/evm";
import type { ERC20Staking } from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../../utils";
import { addNewChain } from "../../common/add-new-chain";
import type { MutexReleaser } from "../types";

const addSelfAsValidator = (
  bc: () => Promise<[Bridge, MutexReleaser]>,
  storage: BridgeStorage,
  signer: Wallet,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) => {
  return async (): Promise<"success" | "failure"> => {
    try {
      await addNewChain(
        staking,
        "evm",
        validatorAddress,
        validatorAddress,
        logger,
      );
      let validatorsCount = Number(
        await useMutexAndRelease(bc, async (bridge) => {
          return bridge.validatorsCount();
        }),
      );
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
        validatorsCount = Number(
          await useMutexAndRelease(bc, async (bridge) =>
            bridge.validatorsCount(),
          ),
        );
      }

      const stakingSignatures = [
        ...(await storage.getStakingSignatures(signer.address)),
      ].map((item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      });
      const added = await useMutexAndRelease(
        bc,
        async (bridge) =>
          await bridge.addValidator(signer.address, stakingSignatures),
      );
      await added.wait();
      return "success";
    } catch (e) {
      return "failure";
    }
  };
};

export default addSelfAsValidator;
