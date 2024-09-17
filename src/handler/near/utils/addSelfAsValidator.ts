import type { Account, Contract } from "near-api-js";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import type { LogInstance } from "../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  accountId: string,
  publicKey: string,
  bridge: Record<string, CallableFunction> & Contract,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
  signer: Account,
): Promise<"success" | "failure"> {
  const payload = `${accountId}|${publicKey}`;
  const stakedAmt = await staking.stakingBalances(validatorAddress);
  if (stakedAmt > 0n) {
    const add = await staking.addNewChains([
      {
        chainType: "near",
        validatorAddress: payload,
      },
    ]);
    const receipt = await add.wait();
    logger.info(
      `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
    );
  }
  try {
    async function getStakingSignatureCount() {
      return Number(await bridge.validator_count());
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
      contractId: bridge.contractId,
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
    return "success";
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return "failure";
  }
}
