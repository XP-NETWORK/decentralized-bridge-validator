import { raise } from "xp-decentralized-sdk";
import { Bridge__factory } from "../../contractsTypes/evm";
import pollForLockEvents from "../poller";
import { THandler } from "../types";
import { EVMHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  log,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";
import nftDataForHedera from "./utils/nftDataForHedera";

export function evmHandler({
  chainIdent,
  provider,
  signer,
  bridge,
  storage,
  lastBlock_,
  blockChunks,
  initialFunds,
  currency,
  em,
  txSigner,
  decimals,
  royaltyProxy,
  chainType,
  serverLinkHandler,
}: EVMHandlerParams): THandler {
  const bc = Bridge__factory.connect(bridge, signer.connect(provider));
  return {
    signData: (buf) => signData(buf, txSigner),
    publicKey: signer.address,
    chainType,
    getBalance: () => getBalance(signer, provider),
    chainIdent,
    initialFunds: initialFunds,
    currency: currency,
    address: signer.address,
    addSelfAsValidator: addSelfAsValidator(bc, storage, signer),
    listenForLockEvents: listenForLockEvents(
      provider,
      lastBlock_,
      blockChunks,
      bridge,
      bc,
      chainIdent,
      em,
    ),

    nftData:
      royaltyProxy !== undefined
        ? nftDataForHedera(provider, royaltyProxy)
        : nftData(provider),
    selfIsValidator: selfIsValidator(bc, signer),
    signClaimData: signClaimData(chainIdent, txSigner),
    decimals: BigInt(10 ** decimals),
    pollForLockEvents: async (builder, cb) => {
      serverLinkHandler
        ? pollForLockEvents(chainIdent, builder, cb, em, serverLinkHandler, log)
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
  };
}
