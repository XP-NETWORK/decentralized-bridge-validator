import { JsonRpcProvider, Wallet } from "ethers";
import { TSupportedChains } from "../../config";
import { THandler, TWallet } from "../types";

export function evmHandler(
  chainIdent: TSupportedChains,
  _provider: JsonRpcProvider,
  _signer: Wallet,
): THandler {
  return {
    async addSelfAsValidator() {
      throw new Error("unimplemented");
    },
    chainIdent: chainIdent,
    listenForLockEvents(_builder, _cb) {
      throw new Error("unimplemented");
    },
    async nftData(_tokenId, _contract) {
      throw new Error("unimplemented");
    },
    signClaimData(_buf) {
      throw new Error("unimplemented");
    },
    generateWallet() {
      const signer = Wallet.createRandom();
      const response: Promise<TWallet> = Promise.resolve({
        address: signer.address,
        pk: signer.privateKey,
      });
      return response;
    },
  };
}
