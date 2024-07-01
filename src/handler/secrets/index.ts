import pollForLockEvents from "../poller";
import { raise } from "../ton";
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
  chainIdent,
  chainType,
  serverLinkHandler,
  logger,
}: SecretsHandlerParams): THandler {
  return {
    publicKey,
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
    signData: (buf) => signData(buf, privateKey, publicKey),
    chainType,
    initialFunds: initialFunds,
    chainIdent,
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
        logger,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        publicKey,
        storage,
        client,
        bridge,
        bridgeCodeHash,
        wallet,
        logger,
      ),
    getBalance: () => getBalance(client),
    nftData: (tid, ctr) => nftData(tid, ctr, client, logger),
    decimals: BigInt(10 ** decimals),
  };
}
