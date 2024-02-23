import { JsonRpcProvider, Wallet } from "ethers";
import { TSupportedChains } from "../../config";
import { BridgeStorage, Bridge__factory } from "../../contractsTypes/evm";
import { THandler } from "../types";
import {
  addSelfAsValidator,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
} from "./utils";

export function evmHandler(
  chainIdent: TSupportedChains,
  provider: JsonRpcProvider,
  signer: Wallet,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
): THandler {
  const bc = Bridge__factory.connect(bridge, signer.connect(provider));
  return {
    chainIdent,
    addSelfAsValidator: addSelfAsValidator(bc, storage, signer),
    listenForLockEvents: listenForLockEvents(
      provider,
      lastBlock_,
      blockChunks,
      bridge,
      bc,
      chainIdent,
    ),
    nftData: nftData(provider),
    selfIsValidator: selfIsValidator(bc, signer),
    signClaimData: signClaimData(chainIdent, signer),
  };
}
