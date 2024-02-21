import { Wallet } from "ethers";
import { TWallet } from "../../types";

const getGenerateWallet = () => {
  return () => {
    const signer = Wallet.createRandom();
    const response: Promise<TWallet> = Promise.resolve({
      address: signer.address,
      pk: signer.privateKey,
    });
    return response;
  };
};

export default getGenerateWallet;
