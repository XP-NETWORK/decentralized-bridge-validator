import { SecretNetworkClient, Wallet } from "secretjs";
import { BridgeStorage } from "../../contractsTypes/evm";
import { THandler } from "../types";

import { addSelfAsValidator } from "./utils/addSelfAsValidator";
import { generateWallet } from "./utils/generateWallet";
import { listenForLockEvents } from "./utils/listenForLockEvents";
import { nftData } from "./utils/nftData";
import { selfIsValidator } from "./utils/selfIsValidator";
import { signClaimData } from "./utils/signClaimData";

export function secretsHandler(
  client: SecretNetworkClient,
  wallet: Wallet,
  publicKey: string,
  bridge: string,
  bridgeCodeHash: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
): THandler {
  return {
    chainIdent: "SECRET",
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
    generateWallet: generateWallet,
    nftData: (tid, ctr) => nftData(tid, ctr, client),
  };
}
