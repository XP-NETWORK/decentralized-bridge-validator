import { Bridge } from "@xp/cosmos-client";
import pollForLockEvents from "../poller/index";
import { raise } from "../ton";
import { THandler } from "../types";
import { CosmosHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

import CosmWasmLog from "./utils/log";

export async function cosmWasmHandler({
  chainIdent,
  client,
  wallet,
  privateKey,
  publicKey,
  bridge,
  storage,
  lastBlock_,
  blockChunks,
  initialFunds,
  em,
  currency,
  decimals,
  chainType,
  serverLinkHandler,
}: CosmosHandlerParams): Promise<THandler> {
  const sender = (await wallet.getAccounts())[0];
  const bc = new Bridge.BridgeClient(client, sender.address, bridge);
  return {
    publicKey: Buffer.from(sender.pubkey).toString("hex"),
    signData: (buf) => signData(buf, privateKey, publicKey),
    chainType,
    initialFunds: initialFunds,
    chainIdent: chainIdent,
    currency: currency,
    address: sender.address,
    signClaimData: (data) => signClaimData(data, privateKey, publicKey),
    selfIsValidator: () => selfIsValidator(bc, Buffer.from(sender.pubkey)),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        chainIdent,
        cb,
        iter,
        lastBlock_,
        client,
        blockChunks,
        bridge,
        em,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(chainIdent, storage, bc, sender),
    getBalance: () => getBalance(client, sender),
    nftData: (tid, ctr) => nftData(tid, ctr, client, sender),
    decimals: BigInt(10 ** decimals),
    pollForLockEvents: async (builder, cb) => {
      serverLinkHandler
        ? pollForLockEvents(
            chainIdent,
            builder,
            cb,
            em,
            serverLinkHandler,
            CosmWasmLog,
          )
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
  };
}
