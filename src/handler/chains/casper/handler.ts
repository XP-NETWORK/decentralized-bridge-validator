import { Parser } from "@make-software/ces-js-parser";
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

export async function casperHandler({
  fetchProvider,
  storage,
  lastBlock_,
  initialFunds,
  em,
  decimals,
  chainIdent,
  chainType,
  bridge,
  rpc,
  serverLinkHandler,
  logger,
  signer,
  staking,
  validatorAddress,
  network,
}: CasperHandlerParams): Promise<THandler> {
  async function bc() {
    const [provider, release] = await fetchProvider();
    const contract = new Contracts.Contract(provider);
    contract.setContractHash(`hash-${bridge}`);
    return [contract, release] as const;
  }
  async function fetchParser() {
    const [provider, release] = await fetchProvider();
    const parser = await Parser.create(provider.nodeClient, [bridge]);
    return [parser, release] as const;
  }
  return {
    publicKey: Buffer.from(signer.publicKey.value()).toString("hex"),
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
    currency: "CSPR",
    address: signer.accountHex(),
    signClaimData: (data) => signClaimData(data, signer),
    selfIsValidator: () => selfIsValidator(bc, signer),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        cb,
        iter,
        lastBlock_,
        fetchProvider,
        fetchParser,
        bridge,
        em,
        logger,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        network,
        bc,
        fetchProvider,
        rpc,
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
