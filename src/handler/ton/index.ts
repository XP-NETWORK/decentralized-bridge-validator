import { Address } from "@ton/ton";
import TonWeb from "tonweb";
import { Bridge } from "../../contractsTypes/ton/tonBridge";
import pollForLockEvents from "../poller";
import type { THandler } from "../types";
import { retry } from "../utils";
import type { TonParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

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
  logger,
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
            logger,
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
    signClaimData: (d) => signClaimData(d, secretKey, signer, logger),
    addSelfAsValidator: () =>
      addSelfAsValidator(storage, bc, signer, walletSender, logger),
    selfIsValidator: () => selfIsValidator(signer, tonweb, bridge),
    nftData: (_, ctr) =>
      retry(
        () => nftData(_, ctr, client),
        `Trying to fetch data for ${ctr}`,
        logger,
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
      listenForLockEvents(builder, cb, lastBlock_, client, bridge, em, logger),
    decimals: BigInt(10 ** decimals),
  };
}

export function raise(msg: string): never {
  throw new Error(msg);
}
