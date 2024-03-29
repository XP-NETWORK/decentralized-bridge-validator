import { THandler } from "../types";
import { SecretsHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export function secretsHandler({
  client,
  wallet,
  publicKey,
  privateKey,
  bridge,
  bridgeCodeHash,
  storage,
  lastBlock_,
  blockChunks,
  initialFunds,
  em,
  decimals,
}: SecretsHandlerParams): THandler {
  return {
    publicKey,
    signData: (buf) => signData(buf, privateKey, publicKey),
    chainType: "scrt",
    initialFunds: initialFunds,
    chainIdent: "SECRET",
    currency: "USCRT",
    address: client.address,
    signClaimData: (data) => signClaimData(data, privateKey, publicKey),
    selfIsValidator: () =>
      selfIsValidator(client, bridge, bridgeCodeHash, publicKey),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        cb,
        iter,
        lastBlock_,
        client,
        blockChunks,
        bridge,
        em,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        publicKey,
        storage,
        client,
        bridge,
        bridgeCodeHash,
        wallet,
      ),
    getBalance: () => getBalance(client),
    nftData: (tid, ctr) => nftData(tid, ctr, client),
    decimals: BigInt(10 ** decimals),
  };
}
