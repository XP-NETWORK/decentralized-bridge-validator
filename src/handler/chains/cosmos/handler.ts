import { Bridge } from "@xp/cosmos-client";
import pollForLockEvents from "../../poller/index";
import type { THandler } from "../../types";
import { raise } from "../ton/handler";
import type { CosmosHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export async function cosmWasmHandler({
  chainIdent,
  fetchProvider,
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
  logger,
}: CosmosHandlerParams): Promise<THandler> {
  const sender = (await wallet.getAccounts())[0];
  const bc = async () => {
    const [client, release] = await fetchProvider();
    const bc = new Bridge.BridgeClient(client, sender.address, bridge);
    return [bc, release] as const;
  };
  return {
    publicKey: Buffer.from(sender.pubkey).toString("hex"),
    signData: (buf) => signData(buf, privateKey, publicKey),
    chainType,
    initialFunds: initialFunds,
    chainIdent: chainIdent,
    currency: currency,
    validateNftData() {
      return { valid: true };
    },
    address: sender.address,
    signClaimData: (data) => signClaimData(data, privateKey, publicKey),
    selfIsValidator: () => selfIsValidator(bc, Buffer.from(sender.pubkey)),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        chainIdent,
        cb,
        iter,
        lastBlock_,
        fetchProvider,
        blockChunks,
        bridge,
        em,
        logger,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(chainIdent, storage, bc, sender, logger),
    getBalance: () => getBalance(fetchProvider, sender),
    nftData: (tid, ctr) => nftData(tid, ctr, fetchProvider, sender, logger),
    decimals: BigInt(10 ** decimals),
    pollForLockEvents: async (builder, cb) => {
      serverLinkHandler
        ? pollForLockEvents(
            chainIdent,
            builder,
            cb,
            em,
            serverLinkHandler,
            logger,
          )
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
  };
}
