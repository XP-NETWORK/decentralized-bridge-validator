import { SecretNetworkClient, Wallet } from "secretjs";
import { BridgeStorage } from "../../contractsTypes/evm";
import { THandler } from "../types";

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
  bridge: string,
  bridgeCodeHash: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
  initialFunds: bigint,
): THandler {
  return {
    initialFunds: initialFunds,
    chainIdent: "SECRET",
    currency: "USCRT",
    address: client.address,
    signClaimData: (data) => signClaimData(data, wallet),
    selfIsValidator: () =>
      selfIsValidator(client, bridge, bridgeCodeHash, publicKey),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, lastBlock_, client, blockChunks, bridge),
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
