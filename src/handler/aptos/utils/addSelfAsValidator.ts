import { Account, Aptos } from "@aptos-labs/ts-sdk";
import { TBridgeData } from "../../../contractsTypes/aptos";
import { BridgeStorage } from "../../../contractsTypes/evm";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";
import { BRIDGE_MODULE_NAME } from "../constants";
import log from "./log";

const addSelfAsValidator = async (
  storage: BridgeStorage,
  bridge: string,
  account: Account,
  aptosClient: Aptos,
): Promise<"success" | "failure"> => {
  try {
    async function getStakingSignatureCount() {
      const resource: TBridgeData = await aptosClient.getAccountResource({
        accountAddress: bridge,
        resourceType: `${bridge}::${BRIDGE_MODULE_NAME}::Bridge`,
      });
      return resource.validators.data.length;
    }
    const newV = account.publicKey.toString();

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

    const validatorToAddPublicKeyUint8 = Buffer.from(
      account.publicKey.toString(),
      "hex",
    );

    const transaction = await aptosClient.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${bridge}::${BRIDGE_MODULE_NAME}::add_validator`,
        functionArguments: [
          validatorToAddPublicKeyUint8,
          signatures.map((sig) => sig.signature),
          signatures.map((sig) => sig.signerAddress),
        ],
      },
    });

    const commitedTransaction = await aptosClient.signAndSubmitTransaction({
      signer: account,
      transaction,
    });

    await aptosClient.waitForTransaction({
      transactionHash: commitedTransaction.hash,
      options: { checkSuccess: true },
    });

    return "success";
  } catch (e) {
    log(`Failed to add self as validator: ${e}`);
    return "failure";
  }
};

export default addSelfAsValidator;
