import { JsonRpcProvider, Wallet } from "ethers";
import { TSupportedChains } from "../../config";
import { BridgeStorage, Bridge__factory } from "../../contractsTypes/evm";
import { THandler } from "../types";
import {
  getAddSelfAsValidator,
  getGenerateWallet,
  getListenForLockEvents,
  getNftData,
  getSelfIsValidator,
  getSignClaimData,
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
    addSelfAsValidator: getAddSelfAsValidator(bc, storage, signer),
    generateWallet: getGenerateWallet(),
    listenForLockEvents: getListenForLockEvents(
      provider,
      lastBlock_,
      blockChunks,
      bridge,
      bc,
      chainIdent,
    ),
    nftData: getNftData(provider),
    selfIsValidator: getSelfIsValidator(bc, signer),
    signClaimData: getSignClaimData(chainIdent, signer),
  };
}
