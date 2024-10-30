import { Wallet } from "ethers";

const generateWallet = () => {
  return () => {
    const evmWallet = Wallet.createRandom();
    return Promise.resolve({
      address: evmWallet.address,
      privateKey: evmWallet.privateKey,
    });
  };
};

export default generateWallet;
