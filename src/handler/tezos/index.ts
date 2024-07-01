import { BridgeContractType } from "../../contractsTypes/tezos/Bridge.types";
import pollForLockEvents from "../poller";
import { raise } from "../ton";
import { THandler } from "../types";
import { TezosHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export async function tezosHandler({
  provider,
  signer,
  bridge,
  storage,
  lastBlock_,
  blockChunks,
  restApiUrl,
  initialFunds,
  em,
  decimals,
  chainType,
  chainIdent,
  serverLinkHandler,
  logger,
}: TezosHandlerParams): Promise<THandler> {
  const bc = await provider.contract.at<BridgeContractType>(bridge);

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
    signData: (buf) => signData(buf, signer),
    publicKey: await signer.publicKey(),
    chainType,
    initialFunds: initialFunds,
    address: await signer.publicKeyHash(),
    currency: "XTZ",
    getBalance: async () => getBalance(provider, await signer.publicKeyHash()),
    listenForLockEvents: (builder, cb) =>
      listenForLockEvents(
        builder,
        cb,
        lastBlock_,
        blockChunks,
        provider,
        bridge,
        restApiUrl,
        em,
        logger,
      ),
    signClaimData: (data) => signClaimData(data, signer),
    nftData: (tid, ctr) => nftData(tid, ctr, provider, logger),
    selfIsValidator: () => selfIsValidator(bc, signer),
    addSelfAsValidator: () => addSelfAsValidator(storage, bc, signer, logger),
    chainIdent: chainIdent,
    decimals: BigInt(10 ** decimals),
  };
}
