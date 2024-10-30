import { beginCell } from "@ton/core";
import { sign } from "@ton/crypto";
import type { WalletContractV4 } from "@ton/ton";
import TonWeb from "tonweb";
import {
  type NewValidator,
  storeNewValidator,
} from "../../../../contractsTypes/ton/tonBridge";

export default async function signData(
  buf: string,
  pk: Buffer,
  signer: WalletContractV4,
) {
  const newValidatorPublicKey = Buffer.from(buf, "hex");
  const newValidatorPublicKeyBigInt = beginCell()
    .storeBuffer(newValidatorPublicKey)
    .endCell()
    .beginParse()
    .loadUintBig(256);

  const newValidator: NewValidator = {
    $$type: "NewValidator",
    key: newValidatorPublicKeyBigInt,
  };
  const signature = `0x${sign(
    beginCell().store(storeNewValidator(newValidator)).endCell().hash(),
    pk,
  ).toString("hex")}`;
  return { signature, signer: TonWeb.utils.bytesToHex(signer.publicKey) };
}
