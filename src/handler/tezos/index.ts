import { BridgeContractType } from "../../contractsTypes/tezos/Bridge.types";
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
}: TezosHandlerParams): Promise<THandler> {
  const chainIdent = "TEZOS";
  const bc = await provider.contract.at<BridgeContractType>(bridge);

  return {
    signData: (buf) => signData(buf, signer),
    publicKey: await signer.publicKey(),
    chainType: "tezos",
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
      ),
    signClaimData: (data) => signClaimData(data, signer),
    nftData: (tid, ctr) => nftData(tid, ctr, provider),
    selfIsValidator: () => selfIsValidator(bc, signer),
    addSelfAsValidator: () => addSelfAsValidator(storage, bc, signer),
    chainIdent: chainIdent,
    decimals: BigInt(10 ** decimals),
  };
}
