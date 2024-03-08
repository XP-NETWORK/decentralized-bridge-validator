import { Signer, TezosToolkit } from "@taquito/taquito";

import { BridgeStorage } from "../../contractsTypes/evm";
import { BridgeContractType } from "../../contractsTypes/tezos/Bridge.types";

import { THandler } from "../types";

import { EntityManager } from "@mikro-orm/sqlite";
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
  lastBlock_: number,
  blockChunks: number,
  restApiUrl: string,
  initialFunds: bigint,
  em: EntityManager,
): Promise<THandler> {
  const chainIdent = "TEZOS";
  const bc = await provider.contract.at<BridgeContractType>(bridge);

  return {
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
  };
}
