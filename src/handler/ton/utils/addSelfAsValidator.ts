import { Address, OpenedContract, Sender, beginCell, toNano } from "@ton/core";
import { Dictionary, WalletContractV4 } from "@ton/ton";
import TonWeb from "tonweb";
import { BridgeStorage } from "../../../contractsTypes/evm";
import {
  Bridge,
  NewValidator,
  SignerAndSignature,
} from "../../../contractsTypes/ton/tonBridge";

import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  bc: OpenedContract<Bridge>,
  signer: WalletContractV4,
  walletSender: Sender,
) {
  const publicKey = TonWeb.utils.bytesToHex(signer.publicKey);
  let validatorsCount = Number(await bc.getValidatorsCount());
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
    signatureCount = Number(await storage.getStakingSignaturesCount(publicKey));
    validatorsCount = Number(await bc.getValidatorsCount());
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
        .storeBuffer(Buffer.from(item.signature, "hex"))
        .endCell(),
    };
    sigs.set(BigInt(index), sig);
  });

  await bc.send(
    walletSender,
    {
      value: toNano("0.05"),
    },
    {
      $$type: "AddValidator",
      newValidatorPublicKey: newValidator,
      newValidatorAddress: Address.parseFriendly(publicKey).address,
      sigs,
      len: beginCell()
        .storeUint(sigs.keys.length, 256)
        .endCell()
        .beginParse()
        .loadUintBig(256),
    },
  );
  return "success" as const;
}
