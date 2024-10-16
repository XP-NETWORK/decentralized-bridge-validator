import pollForLockEvents from "../poller";
import { raise } from "../ton";
import type { THandler } from "../types";
import type { AptosHandlerParams, AptosProviderFetch } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

import { createSurfClient } from "@thalalabs/surf";
import { ABI } from "./abi/bridge";

const bc = async (fetchProvider: AptosProviderFetch) => {
  const [agent, release] = await fetchProvider();
  return [createSurfClient(agent).useABI(ABI), release] as const;
};

export type TAptosBridgeClient = Awaited<ReturnType<typeof bc>>[0];

export function aptosHandler({
  fetchProvider,
  bridge,
  storage,
  lastBlock_,
  initialFunds,
  em,
  decimals,
  chainIdent,
  chainType,
  serverLinkHandler,
  logger,
  signer,
  staking,
  bridgeAccount,
  validatorAddress,
}: AptosHandlerParams): THandler {
  return {
    publicKey: signer.publicKey.bcsToHex().toStringWithoutPrefix(),
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
    signData: (buf) => signData(buf, signer),
    chainType,
    validateNftData() {
      return { valid: true };
    },
    initialFunds: initialFunds,
    chainIdent,
    currency: "ICP",
    address: signer.accountAddress.toString(),
    signClaimData: (data) => signClaimData(data, signer),
    selfIsValidator: () => selfIsValidator(() => bc(fetchProvider), signer),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        cb,
        iter,
        lastBlock_,
        () => bc(fetchProvider),
        bridge,
        em,
        logger,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        () => bc(fetchProvider),
        bridgeAccount,
        signer,
        logger,
        staking,
        validatorAddress,
      ),
    getBalance: () => getBalance(fetchProvider, signer),
    nftData: (tid, ctr) => nftData(tid, ctr, fetchProvider, logger),
    decimals: BigInt(10 ** decimals),
  };
}
