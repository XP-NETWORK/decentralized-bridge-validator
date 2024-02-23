import { Signer, TezosToolkit } from "@taquito/taquito";

import { BridgeStorage } from "../../contractsTypes/evm";
import { BridgeContractType } from "../../contractsTypes/tezos/Bridge.types";

import { THandler } from "../types";

import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
} from "./utils";

export async function tezosHandler(
  provider: TezosToolkit,
  signer: Signer,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
  restApiUrl: string,
): Promise<THandler> {
  const chainIdent = "TEZOS";
  const bc = await provider.contract.at<BridgeContractType>(bridge);

  return {
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
      ),
    signClaimData: (data) => signClaimData(data, signer),
    nftData: (tid, ctr) => nftData(tid, ctr, provider),
    selfIsValidator: () => selfIsValidator(bc, signer),
    addSelfAsValidator: () => addSelfAsValidator(storage, bc, signer),
    chainIdent: chainIdent,
  };
}
