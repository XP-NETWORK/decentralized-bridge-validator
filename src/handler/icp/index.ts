import { Actor, type ActorSubclass } from "@dfinity/agent";
import { LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { idlFactory as BridgeIDL } from "../../contractsTypes/icp/bridge/bridge";
import type { _SERVICE } from "../../contractsTypes/icp/bridge/bridge.types";
import { pollForLockEvents, poolForFailEvents } from "../poller";
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
  staking,
  validatorAddress,
}: ICPHandlerParams): THandler {
  const bc = Actor.createActorWithExtendedDetails<_SERVICE>(
    BridgeIDL,
    {
      canisterId: bridge,
      agent,
    },
    {
      certificate: false,
    },
  ) as ActorSubclass<_SERVICE>;
  const lc = LedgerCanister.create({
    agent,
    canisterId: Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"),
  });
  return {
    publicKey: `${identity.getPrincipal()},${Buffer.from(
      identity.getPublicKey().toRaw(),
    ).toString("hex")}`,
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
    poolForFailEvents: async (builder, cb) => {
      poolForFailEvents(chainIdent, builder, cb, em, logger);
    },
    signData: (buf) => signData(buf, identity, bc),
    chainType,
    initialFunds: initialFunds,
    chainIdent,
    currency: "ICP",
    address: identity.getPrincipal().toString(),
    signClaimData: (data) => signClaimData(data, identity, bc),
    selfIsValidator: () => selfIsValidator(bc, identity),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, lastBlock_, bc, em, logger),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        bc,
        identity,
        logger,
        staking,
        validatorAddress,
      ),
    getBalance: () => getBalance(lc, identity),
    nftData: (tid, ctr) => nftData(tid, ctr, agent, logger),
    decimals: BigInt(10 ** decimals),
  };
}
