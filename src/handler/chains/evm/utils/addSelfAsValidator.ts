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
      const stakedAmt = await staking.stakingBalances(validatorAddress);
      if (stakedAmt > 0n) {
        const add = await staking.addNewChains([
          {
            chainType: "evm",
            validatorAddress,
          },
        ]);
        const receipt = await add.wait();
        logger.info(
          `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
        );
      }
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
      const [bC, r] = await bc();
      const added = await bC.addValidator(signer.address, stakingSignatures);
      await added.wait();
      r();
      return "success";
    } catch (e) {
      return "failure";
    }
  };
};

export default addSelfAsValidator;
