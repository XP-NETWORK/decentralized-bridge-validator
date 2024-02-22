import { beginCell } from "@ton/core";
import { WalletContractV4 } from "@ton/ton";
import TonWeb from "tonweb";

export async function selfIsValidator(
  signer: WalletContractV4,
  tonweb: TonWeb,
  bridge: string,
) {
  const thisValidatorPk = beginCell()
    .storeBuffer(signer.publicKey)
    .endCell()
    .beginParse()
    .loadUintBig(256);
  const res = await tonweb.provider.call(bridge, "Validator", [
    ["num", thisValidatorPk.toString()],
  ]);
  return !!res.stack[0][1].elements.length;
}
