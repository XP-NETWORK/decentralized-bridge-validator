import { ethers } from "ethers";
import type { Web3Account } from "web3-eth-accounts";

export default function signData(buf: string, signer: Web3Account) {
  return Promise.resolve({
    signature: signer.sign(
      ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(["address"], [buf]),
      ),
    ).signature,
    signer: signer.address,
  });
}
