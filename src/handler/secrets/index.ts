import { SecretNetworkClient, Wallet } from "secretjs";
import { BridgeStorage } from "../../contractsTypes/evm";
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

export function secretsHandler(
  client: SecretNetworkClient,
  wallet: Wallet,
  publicKey: string,
  privateKey: string,
  bridge: string,
  bridgeCodeHash: string,
  storage: BridgeStorage,
  lastBlock_: number,
  blockChunks: number,
  initialFunds: bigint,
  decimals: number,
  em: EntityManager,
): THandler {
  return {
    initialFunds,
    decimals,
    chainIdent: "SECRET",
    currency: "USCRT",
    address: client.address,
    signClaimData: (data) =>
      signClaimData(
        data,
        Buffer.from(privateKey),
        Buffer.from(publicKey, "hex"),
      ),
    selfIsValidator: () =>
      selfIsValidator(client, bridge, bridgeCodeHash, publicKey),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        cb,
        iter,
        lastBlock_,
        client,
        blockChunks,
        bridge,
        em,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        publicKey,
        storage,
        client,
        bridge,
        bridgeCodeHash,
        wallet,
      ),
    getBalance: () => getBalance(client),
    nftData: (tid, ctr) => nftData(tid, ctr, client),
  };
}
