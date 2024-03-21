import { Bridge__factory } from "../../contractsTypes/evm";
import { THandler } from "../types";
import { EVMHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export function evmHandler({
  chainIdent,
  provider,
  signer,
  bridge,
  storage,
  lastBlock_,
  blockChunks,
  initialFunds,
  currency,
  em,
  txSigner,
}: EVMHandlerParams): THandler {
  const bc = Bridge__factory.connect(bridge, signer.connect(provider));
  return {
    signData: (buf) => signData(buf, txSigner),
    publicKey: signer.address,
    chainType: "evm",
    getBalance: () => getBalance(signer, provider),
    chainIdent,
    initialFunds: initialFunds,
    currency: currency,
    address: signer.address,
    addSelfAsValidator: addSelfAsValidator(bc, storage, signer),
    listenForLockEvents: listenForLockEvents(
      provider,
      lastBlock_,
      blockChunks,
      bridge,
      bc,
      chainIdent,
      em,
    ),
    nftData: nftData(provider),
    selfIsValidator: selfIsValidator(bc, signer),
    signClaimData: signClaimData(chainIdent, txSigner),
  };
}
