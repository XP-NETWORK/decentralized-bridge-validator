import { Wallet } from "ethers";
import { TWallet } from "../../types";

const generateWallet = () => {
  return () => {
    const signer = Wallet.createRandom();
    const response: Promise<TWallet> = Promise.resolve({
      address: signer.address,
      pk: signer.privateKey,
      pubK: signer.publicKey,
    });
    return response;
  };
};

export default generateWallet;
