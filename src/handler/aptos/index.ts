import { THandler } from "../types";
import { AptosHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export function aptosHandler({
  client,
  account,
  publicKey,
  privateKey,
  bridge,
  storage,
  lastBlock_,
  initialFunds,
  em,
  decimals,
  chainIdent,
  chainType,
}: AptosHandlerParams): THandler {
  return {
    publicKey,
    signData: (buf) => signData(buf, privateKey, publicKey),
    chainType,
    initialFunds: initialFunds,
    chainIdent,
    currency: "APT",
    address: account.accountAddress.toString(),
    signClaimData: (data) => signClaimData(data, privateKey, publicKey),
    selfIsValidator: () => selfIsValidator(client, bridge, publicKey),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, lastBlock_, client, bridge, em),
    addSelfAsValidator: () =>
      addSelfAsValidator(storage, bridge, account, client),
    getBalance: () => getBalance(client, account.accountAddress),
    nftData: (tid) => nftData(tid, client),
    decimals: BigInt(10 ** decimals),
  };
}
