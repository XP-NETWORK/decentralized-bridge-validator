import type { AccountData } from "@cosmjs/amino";
import type { Bridge } from "@xp/cosmos-client";
import { pubkeyToAddress } from "secretjs";
import { encodeSecp256k1Pubkey } from "secretjs/dist/wallet_amino";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../../utils";
import { addNewChain } from "../../common/add-new-chain";

export default async function addSelfAsValidator(
  identifier: string,
  storage: BridgeStorage,
  bc: () => Promise<readonly [Bridge.BridgeClient, () => void]>,
  wallet: AccountData,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  const newV = Buffer.from(wallet.pubkey).toString("base64");
  await addNewChain(staking, "cosmos", validatorAddress, newV, logger);
  try {
    async function getStakingSignatureCount() {
      const res = await useMutexAndRelease(
        bc,
        async (bridge) => await bridge.getValidatorsCount(),
      );
      return res.count;
    }

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
    const result = await useMutexAndRelease(
      bc,
      async (bridge) =>
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
        }),
    );
    logger.info(`Added self as validator at ${result.transactionHash}`);
    return true;
  } catch (e) {
    logger.error(identifier, "Failed to add self as validator: ", e);
    return false;
  }
}
