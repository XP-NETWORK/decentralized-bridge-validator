import { raise } from "xp-decentralized-sdk";
import { type Bridge, Bridge__factory } from "../../../contractsTypes/evm";
import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import type { EVMHandlerParams, MutexReleaser } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";
import nftDataForHedera from "./utils/nftDataForHedera";

export function evmHandler({
  chainIdent,
  fetchProvider,
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
  logger,
  staking,
}: EVMHandlerParams): THandler {
  const bc = async (): Promise<[Bridge, MutexReleaser]> => {
    const [provider, release] = await fetchProvider();
    const contract = Bridge__factory.connect(bridge, signer.connect(provider));
    return [contract, release];
  };
  return {
    signData: (buf) => signData(buf, txSigner),
    publicKey: signer.address,
    chainType,
    getBalance: () => getBalance(signer, fetchProvider),
    chainIdent,
    validateNftData() {
      return { valid: true };
    },
    initialFunds,
    currency,
    address: signer.address,
    addSelfAsValidator: addSelfAsValidator(
      bc,
      storage,
      signer,
      logger,
      staking,
      signer.address,
    ),
    listenForLockEvents: listenForLockEvents(
      fetchProvider,
      lastBlock_,
      blockChunks,
      bridge,
      bc,
      chainIdent,
      em,
      logger,
    ),

    nftData:
      royaltyProxy !== undefined
        ? nftDataForHedera(fetchProvider, royaltyProxy, logger)
        : nftData(fetchProvider, logger),
    selfIsValidator: selfIsValidator(bc, signer),
    signClaimData: signClaimData(chainIdent, txSigner, logger),
    decimals: BigInt(10 ** decimals),
    pollForLockEvents: async (_, cb) => {
      serverLinkHandler
        ? pollForLockEvents(chainIdent, cb, em, serverLinkHandler, logger)
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
  };
}
