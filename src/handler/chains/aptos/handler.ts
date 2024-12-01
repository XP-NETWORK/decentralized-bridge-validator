import { createSurfClient } from "@thalalabs/surf";
import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import { raise } from "../ton/handler";
import { ABI } from "./abi/bridge";
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

const bc = async (fetchProvider: AptosProviderFetch, ba: string) => {
  const [agent, release] = await fetchProvider();
  return [createSurfClient(agent).useABI(ABI(ba)), release] as const;
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
  validatorAddress,
}: AptosHandlerParams): THandler {
  return {
    publicKey: signer.publicKey.bcsToHex().toStringWithoutPrefix(),
    pollForLockEvents: async (_, cb, cbLe) => {
      serverLinkHandler
        ? pollForLockEvents(chainIdent, cbLe, cb, em, serverLinkHandler, logger)
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
    currency: "APT",
    address: signer.accountAddress.toString(),
    signClaimData: (data) => signClaimData(data, signer),
    selfIsValidator: () =>
      selfIsValidator(() => bc(fetchProvider, bridge), signer),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        cb,
        iter,
        lastBlock_,
        fetchProvider,
        bridge,
        em,
        logger,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        () => bc(fetchProvider, bridge),
        signer,
        logger,
        staking,
        validatorAddress,
      ),
    getBalance: () => getBalance(fetchProvider, signer),
    nftData: (tid, ctr) =>
      nftData(tid, ctr, fetchProvider, () => bc(fetchProvider, bridge), logger),
    decimals: BigInt(10 ** decimals),
  };
}
