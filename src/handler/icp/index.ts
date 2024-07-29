import { LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { createActor } from "../../contractsTypes/icp/bridge";
import pollForLockEvents from "../poller";
import { raise } from "../ton";
import type { THandler } from "../types";
import type { ICPHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export function icpHandler({
  agent,
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
  identity,
}: ICPHandlerParams): THandler {
  const bc = createActor(bridge, {
    agentOptions: {
      identity,
    },
  });
  const lc = LedgerCanister.create({
    agent,
    canisterId: Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"),
  });
  return {
    publicKey: Buffer.from(identity.getPublicKey().toRaw()).toString("hex"),
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
    signData: (buf) => signData(buf, identity),
    chainType,
    initialFunds: initialFunds,
    chainIdent,
    currency: "ICP",
    address: identity.getPrincipal().toString(),
    signClaimData: (data) => signClaimData(data, identity),
    selfIsValidator: () => selfIsValidator(bc, identity),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, lastBlock_, bc, em, logger),
    addSelfAsValidator: () => addSelfAsValidator(storage, bc, identity, logger),
    getBalance: () => getBalance(lc, identity),
    nftData: (tid, ctr) => nftData(tid, ctr, agent, logger),
    decimals: BigInt(10 ** decimals),
  };
}
