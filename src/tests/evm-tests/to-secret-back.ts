import { readFile } from "fs/promises";
import { SecretNetworkClient } from "secretjs";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { generateWallets } from "../../utils";
import {
  generateConfig,
  getChainConfigs,
  getSigners,
} from "../utils";
import { createTransferBackTest, transferBackMultiple } from "../utils/transfer-back";

export const evm_to_secret_back = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }

  const signers = getSigners(genWallets);
  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);

  const firstTest = createTransferBackTest({
    fromChain: "ETH",
    toChain: "SECRET",
    nftType: "singular",
    claimSigner: new SecretNetworkClient({
      chainId: configs.secret.config.chainId,
      url: configs.secret.config.rpcURL,
      wallet: configs.secret.signer,
      walletAddress: configs.secret.signer.address,
    }),
    receiver: configs.secret.signer.address,
    signer: configs.eth.signer,
    deployArgs: {
      name: `TestContract${Math.random() * 100000000}`,
      symbol: `TST${Math.random() * 100000000}`,
    },
    mintArgs: {
      tokenId: 400n,
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      royalty: 10n,
      royaltyReceiver: signers.eth.address,
      contract: "",
    },
    approveTokenId: "400",
    signerAddress: configs.eth.signer.address
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await evm_to_secret_back();
    await transferBackMultiple([test], factory);
  })();
}

// TESTED: ✅OK
