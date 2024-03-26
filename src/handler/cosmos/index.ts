import { Bridge } from "@xp/cosmos-client";
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

export async function cosmosHandler({
  client,
  wallet,
  privateKey,
  bridge,
  storage,
  lastBlock_,
  blockChunks,
  initialFunds,
  em,
  decimals,
}: CosmosHandlerParams): Promise<THandler> {
  const sender = (await wallet.getAccounts())[0];
  const bc = new Bridge.BridgeClient(client, sender.address, bridge);
  return {
    publicKey: Buffer.from(sender.pubkey).toString("hex"),
    signData: (buf) =>
      signData(buf, Buffer.from(privateKey, "hex"), sender.pubkey),
    chainType: "cosmos",
    initialFunds: initialFunds,
    chainIdent: "COSMOS",
    currency: "uatom",
    address: sender.address,
    signClaimData: (data) =>
      signClaimData(data, Buffer.from(privateKey), sender.pubkey),
    selfIsValidator: () => selfIsValidator(bc, Buffer.from(sender.pubkey)),
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
    addSelfAsValidator: () => addSelfAsValidator(storage, bc, sender),
    getBalance: () => getBalance(client, sender),
    nftData: (tid, ctr) => nftData(tid, ctr, client, sender),
    decimals: BigInt(10 ** decimals),
  };
}
