import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import { useMutexAndRelease } from "../../utils";
import { raise } from "../ton/handler";
import type { SecretsHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export async function secretsHandler({
  fetchProvider,
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
  staking,
  validatorAddress,
}: SecretsHandlerParams): Promise<THandler> {
  const address = await useMutexAndRelease(
    fetchProvider,
    async (provider) => provider.address,
  );
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
    validateNftData() {
      return { valid: true };
    },
    chainIdent,
    currency: "USCRT",
    address: address,
    signClaimData: (data) => signClaimData(data, privateKey, publicKey),
    selfIsValidator: () =>
      selfIsValidator(fetchProvider, bridge, bridgeCodeHash, publicKey),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
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
      addSelfAsValidator(
        publicKey,
        storage,
        fetchProvider,
        bridge,
        bridgeCodeHash,
        wallet,
        logger,
        staking,
        validatorAddress,
      ),
    getBalance: () => getBalance(fetchProvider),
    nftData: (tid, ctr) => nftData(tid, ctr, fetchProvider, logger),
    decimals: BigInt(10 ** decimals),
  };
}
