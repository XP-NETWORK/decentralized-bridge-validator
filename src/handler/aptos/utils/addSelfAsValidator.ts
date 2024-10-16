import type { Account } from "@aptos-labs/ts-sdk";
import type { TAptosBridgeClient } from "..";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  fetchBridge: () => Promise<readonly [TAptosBridgeClient, () => void]>,
  bridgeAccount: Account,
  identity: Account,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<"success" | "failure"> {
  const stakedAmt = await staking.stakingBalances(validatorAddress);
  if (stakedAmt > 0n) {
    const add = await staking.addNewChains([
      {
        chainType: "aptos",
        validatorAddress: identity.publicKey.bcsToHex().toString(),
      },
    ]);
    const receipt = await add.wait();
    logger.info(
      `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
    );
  }
  const publicKey = identity.publicKey.bcsToHex().toString();
  try {
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
    const newV = publicKey;
    let validatorsCount = await getStakingSignatureCount();
    let signatureCount = Number(await storage.getStakingSignaturesCount(newV));

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(await storage.getStakingSignaturesCount(newV));
      validatorsCount = await getStakingSignatureCount();
    }
    const signatures = [...(await storage.getStakingSignatures(newV))].map(
      (item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      },
    );
    console.log(
      signatures.map((e) => {
        return {
          signature: e.signature,
          signer: e.signerAddress,
        };
      }),
    );
    await useMutexAndRelease(
      fetchBridge,
      async (bridge) =>
        await bridge.entry.add_validator({
          account: bridgeAccount,
          functionArguments: [
            identity.publicKey.bcsToHex().toString(),
            signatures.map((e) => {
              return Buffer.from(e.signature.slice(2));
            }),
            signatures.map((e) => {
              return Buffer.from(e.signerAddress);
            }),
          ],
          typeArguments: [],
        }),
    );
    return "success";
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return "failure";
  }
}
