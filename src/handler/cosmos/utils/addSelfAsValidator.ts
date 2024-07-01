import { AccountData } from "@cosmjs/amino";
import { Bridge } from "@xp/cosmos-client";
import { pubkeyToAddress } from "secretjs";
import { encodeSecp256k1Pubkey } from "secretjs/dist/wallet_amino";
import { BridgeStorage } from "../../../contractsTypes/evm";
import { LogInstance } from "../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  identifier: string,
  storage: BridgeStorage,
  bridge: Bridge.BridgeClient,
  wallet: AccountData,
  logger: LogInstance,
): Promise<"success" | "failure"> {
  try {
    async function getStakingSignatureCount() {
      const res = await bridge.getValidatorsCount();
      return res.count;
    }
    const newV = Buffer.from(wallet.pubkey).toString("base64");
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

    const validatorToAddPublicKeyUint8 = Buffer.from(wallet.address, "hex");

    await bridge.addValidator({
      data: {
        validator: [
          encodeSecp256k1Pubkey(validatorToAddPublicKeyUint8).value,
          pubkeyToAddress(validatorToAddPublicKeyUint8),
        ],
        signatures: signatures.map((item) => {
          return {
            signature: Buffer.from(
              item.signature.replace("0x", ""),
              "hex",
            ).toString("base64"),
            signer_address: item.signerAddress,
          };
        }),
      },
    });
    return "success";
  } catch (e) {
    logger.error(identifier, "Failed to add self as validator: ", e);
    return "failure";
  }
}
