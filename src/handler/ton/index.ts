import { Address } from "@ton/ton";
import TonWeb from "tonweb";
import { Bridge } from "../../contractsTypes/ton/tonBridge";
import { THandler } from "../types";
import { TonParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export function tonHandler({
  client,
  provider,
  signer,
  bridge,
  storage,
  lastBlock_,
  walletSender,
  secretKey,
  initialFunds,
  em,
}: TonParams): THandler {
  const chainIdent = "TON";
  const bc = client.open(
    Bridge.fromAddress(Address.parseFriendly(bridge).address),
  );
  const tonweb = new TonWeb(provider);
  return {
    signData: (buf) => signData(buf, Buffer.from(secretKey, "hex"), signer),
    publicKey: TonWeb.utils.bytesToHex(signer.publicKey),
    chainType: "ton",
    initialFunds: initialFunds,
    currency: "TON",
    address: signer.address.toString(),
    getBalance: () => getBalance(client, signer.address),
    signClaimData: (d) => signClaimData(d, secretKey, signer),
    addSelfAsValidator: () =>
      addSelfAsValidator(storage, bc, signer, walletSender),
    selfIsValidator: () => selfIsValidator(signer, tonweb, bridge),
    nftData: (_, ctr) => nftData(_, ctr, client),
    chainIdent: chainIdent,
    listenForLockEvents: (builder, cb) =>
      listenForLockEvents(builder, cb, lastBlock_, client, bridge, em),
  };
}

export function raise(msg: string): never {
  throw new Error(msg);
}
