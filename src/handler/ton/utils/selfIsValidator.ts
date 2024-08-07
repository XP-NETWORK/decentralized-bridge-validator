import { beginCell } from "@ton/core";
import type { WalletContractV4 } from "@ton/ton";
import type TonWeb from "tonweb";

export default async function selfIsValidator(
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

  console.log("TON selfIsValidator", !!res.stack[0][1].elements.length);

  return !!res.stack[0][1].elements.length;
}
