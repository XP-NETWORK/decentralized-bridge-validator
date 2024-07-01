import { hash } from "@stablelib/blake2b";
import { Signer } from "@taquito/taquito";
import { b58cdecode, b58cencode, prefix } from "@taquito/utils";
import { BridgeStorage } from "../../../contractsTypes/evm";
import { BridgeContractType } from "../../../contractsTypes/tezos/Bridge.types";
import { tas } from "../../../contractsTypes/tezos/type-aliases";
import { LogInstance } from "../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  bc: BridgeContractType,
  signer: Signer,
  logger: LogInstance,
): Promise<"success" | "failure"> {
  try {
    let validatorsCount = (await bc.storage()).validators_count.toNumber();
    let signatureCount = Number(
      await storage.getStakingSignaturesCount(await signer.publicKeyHash()),
    );

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(
        await storage.getStakingSignaturesCount(await signer.publicKeyHash()),
      );
      validatorsCount = (await bc.storage()).validators_count.toNumber();
    }

    const stakingSignatures = [
      ...(await storage.getStakingSignatures(await signer.publicKey())),
    ].map((item) => {
      return {
        signerAddress: item.signerAddress,
        signature: item.signature,
      };
    });

    await bc.methods
      .add_validator(
        tas.address(await signer.publicKeyHash()),
        stakingSignatures.map((e) => {
          const addr = tas.address(
            b58cencode(
              hash(
                new Uint8Array(b58cdecode(e.signerAddress, prefix.edpk)),
                20,
              ),
              prefix.tz1,
            ),
          );
          const sig = tas.signature(
            Buffer.from(e.signature.replace("0x", ""), "hex").toString(),
          );
          return {
            addr,
            sig,
            signer: tas.key(e.signerAddress),
          };
        }),
      )
      .send();
    return "success";
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return "failure";
  }
}
