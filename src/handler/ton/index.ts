import { Address } from "@ton/ton";
import TonWeb from "tonweb";
import { Bridge } from "../../contractsTypes/ton/tonBridge";
import pollForLockEvents from "../poller";
import { THandler } from "../types";
import { retry } from "../utils";
import { TonParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

import TonLog from "./utils/log";

export function tonHandler({
  client,
  provider,
  signer,
  bridge,
  storage,
  lastBlock_,
  walletSender,
  secretKey,
  initialFunds,
  em,
  decimals,
  chainType,
  chainIdent,
  serverLinkHandler,
}: TonParams): THandler {
  const bc = client.open(
    Bridge.fromAddress(Address.parseFriendly(bridge).address),
  );
  const tonweb = new TonWeb(provider);
  return {
    pollForLockEvents: async (builder, cb) => {
      serverLinkHandler
        ? pollForLockEvents(
            chainIdent,
            builder,
            cb,
            em,
            serverLinkHandler,
            TonLog,
          )
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
    signData: (buf) => signData(buf, Buffer.from(secretKey, "hex"), signer),
    publicKey: TonWeb.utils.bytesToHex(signer.publicKey),
    chainType,
    initialFunds: initialFunds,
    currency: "TON",
    address: signer.address.toString(),
    getBalance: () => getBalance(client, signer.address),
    signClaimData: (d) => signClaimData(d, secretKey, signer),
    addSelfAsValidator: () =>
      addSelfAsValidator(storage, bc, signer, walletSender),
    selfIsValidator: () => selfIsValidator(signer, tonweb, bridge),
    nftData: (_, ctr) =>
      retry(
        () => nftData(_, ctr, client),
        `Trying to fetch data for ${ctr}`,
        5,
      ).catch(() => {
        return {
          metadata: "",
          name: "XP Wrapped Nft",
          symbol: "TTON",
          royalty: 0n,
        };
      }),
    chainIdent: chainIdent,
    listenForLockEvents: (builder, cb) =>
      listenForLockEvents(builder, cb, lastBlock_, client, bridge, em),
    decimals: BigInt(10 ** decimals),
  };
}

export function raise(msg: string): never {
  throw new Error(msg);
}
