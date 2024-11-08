import type { Account, Contract } from "near-api-js";
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
  accountId: string,
  publicKey: string,
  fetchBridge: () => Promise<
    readonly [Contract & Record<string, CallableFunction>, () => void]
  >,
  bridgeContractId: string,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
  signer: Account,
): Promise<boolean> {
  const payload = `${accountId}|${publicKey}`;
  await addNewChain(staking, "near", validatorAddress, payload, logger);
  try {
    async function getStakingSignatureCount() {
      return useMutexAndRelease(fetchBridge, async (bridge) =>
        Number(await bridge.validator_count()),
      );
    }
    let validatorsCount = await getStakingSignatureCount();
    let signatureCount = Number(
      await storage.getStakingSignaturesCount(payload),
    );

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(await storage.getStakingSignaturesCount(payload));
      validatorsCount = await getStakingSignatureCount();
    }
    const signatures = [...(await storage.getStakingSignatures(payload))];

    const av = await signer.functionCall({
      contractId: bridgeContractId,
      methodName: "add_validator",
      args: {
        validator: {
          account_id: accountId,
          public_key: publicKey,
        },
        signatures: signatures.map((e) => {
          return {
            signer: e.signerAddress,
            signature: [...Buffer.from(e.signature.replace("0x", ""), "hex")],
          };
        }),
      },
    });
    logger.trace(`Added self as validator at: ${av.transaction.hash}`);
    return true;
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return false;
  }
}
