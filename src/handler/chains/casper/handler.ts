import { Contracts } from "casper-js-sdk";
import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import { raise } from "../ton/handler";
import type { CasperHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export type TCasperBridgeClient = Contracts.Contract;

export function casperHandler({
  fetchProvider,
  storage,
  lastBlock_,
  initialFunds,
  em,
  decimals,
  chainIdent,
  chainType,
  ess,
  serverLinkHandler,
  logger,
  signer,
  staking,
  validatorAddress,
}: CasperHandlerParams): THandler {
  async function bc() {
    const [provider, release] = await fetchProvider();
    const contract = new Contracts.Contract(provider);
    return [contract, release] as const;
  }
  return {
    publicKey: Buffer.from(signer.publicKey.data).toString("hex"),
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
    currency: "APT",
    address: signer.accountHex(),
    signClaimData: (data) => signClaimData(data, signer),
    selfIsValidator: () => selfIsValidator(bc, signer),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, lastBlock_, ess, em, logger),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        bc,
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
