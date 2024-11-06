import { Actor, type ActorSubclass } from "@dfinity/agent";
import { LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { idlFactory as BridgeIDL } from "../../../contractsTypes/icp/bridge/bridge";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import { raise } from "../ton/handler";
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
  identity,
  staking,
  validatorAddress,
}: ICPHandlerParams): THandler {
  const bc = async () => {
    const [agent, release] = await fetchProvider();
    const actor = Actor.createActorWithExtendedDetails<_SERVICE>(
      BridgeIDL,
      {
        canisterId: bridge,
        agent,
      },
      {
        certificate: false,
      },
    ) as ActorSubclass<_SERVICE>;
    return [actor, release] as const;
  };
  const lc = async () => {
    const [agent, release] = await fetchProvider();
    const canister = LedgerCanister.create({
      agent,
      canisterId: Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"),
    });
    return [canister, release] as const;
  };
  return {
    publicKey: `${identity.getPrincipal()},${Buffer.from(
      identity.getPublicKey().toRaw(),
    ).toString("hex")}`,
    pollForLockEvents: async (_, cb, cbLe) => {
      serverLinkHandler
        ? pollForLockEvents(chainIdent, cbLe, cb, em, serverLinkHandler, logger)
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
    signData: (buf) => signData(buf, identity, bc),
    chainType,
    validateNftData() {
      return { valid: true };
    },
    initialFunds: initialFunds,
    chainIdent,
    currency: "ICP",
    address: identity.getPrincipal().toString(),
    signClaimData: (data) => signClaimData(data, identity, bc),
    selfIsValidator: () => selfIsValidator(bc, identity),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, lastBlock_, bc, bridge, em, logger),
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
    nftData: (tid, ctr) => nftData(tid, ctr, fetchProvider, logger),
    decimals: BigInt(10 ** decimals),
  };
}
