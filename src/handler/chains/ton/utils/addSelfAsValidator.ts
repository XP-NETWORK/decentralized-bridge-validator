import {
  // Address,
  type OpenedContract,
  type Sender,
  beginCell,
  toNano,
} from "@ton/core";
import { Dictionary, WalletContractV4 } from "@ton/ton";
import TonWeb from "tonweb";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type {
  Bridge,
  NewValidator,
  SignerAndSignature,
} from "../../../../contractsTypes/ton/tonBridge";
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
  bc: () => Promise<readonly [OpenedContract<Bridge>, () => void]>,
  signer: WalletContractV4,
  walletSender: Sender,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  try {
    await addNewChain(
      staking,
      "ton",
      validatorAddress,
      signer.publicKey.toString("hex"),
      logger,
    );
    const publicKey = TonWeb.utils.bytesToHex(signer.publicKey);
    let validatorsCount = await useMutexAndRelease(bc, async (bridge) =>
      Number(await bridge.getValidatorsCount()),
    );
    let signatureCount = Number(
      await storage.getStakingSignaturesCount(publicKey),
    );

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(
        await storage.getStakingSignaturesCount(publicKey),
      );
      validatorsCount = await useMutexAndRelease(bc, async (bridge) =>
        Number(await bridge.getValidatorsCount()),
      );
    }

    const stakingSignatures = [
      ...(await storage.getStakingSignatures(publicKey)),
    ].map((item) => {
      return {
        signerAddress: item.signerAddress,
        signature: item.signature,
      };
    });
    const newValidatorPublicKey = Buffer.from(publicKey, "hex");
    const newValidatorPublicKeyBigInt = beginCell()
      .storeBuffer(newValidatorPublicKey)
      .endCell()
      .beginParse()
      .loadUintBig(256);
    const newValidator: NewValidator = {
      $$type: "NewValidator",
      key: newValidatorPublicKeyBigInt,
    };

    const sigs = Dictionary.empty<bigint, SignerAndSignature>();
    stakingSignatures.forEach((item, index) => {
      const signerPublicKey = Buffer.from(item.signerAddress, "hex");
      const signerPublicKeyBigInt = beginCell()
        .storeBuffer(signerPublicKey)
        .endCell()
        .beginParse()
        .loadUintBig(256);

      const sig: SignerAndSignature = {
        $$type: "SignerAndSignature",
        key: signerPublicKeyBigInt,
        signature: beginCell()
          .storeBuffer(Buffer.from(item.signature.replace("0x", ""), "hex"))
          .endCell(),
      };
      sigs.set(BigInt(index), sig);
    });

    const wallet = WalletContractV4.create({
      publicKey: Buffer.from(publicKey, "hex"),
      workchain: 0,
    });
    await useMutexAndRelease(bc, async (bridge) => {
      await bridge.send(
        walletSender,
        {
          value: toNano("0.05"),
        },
        {
          $$type: "AddValidator",
          newValidatorPublicKey: newValidator,
          newValidatorAddress: wallet.address,
          sigs,
          len: beginCell()
            .storeUint(sigs.size, 256)
            .endCell()
            .beginParse()
            .loadUintBig(256),
        },
      );
    });
    return true;
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return false;
  }
}
