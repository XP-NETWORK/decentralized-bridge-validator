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

export const secret_to_cosm_back = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }
  //@ts-ignore
  const signers = getSigners(genWallets);
  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);
  const terraSigner = await signers.terra;

  const firstTest = createTransferBackTest({
    fromChain: "SECRET",
    toChain: "TERRA",
    nftType: "singular",
    claimSigner: terraSigner,
    receiver: (await terraSigner.getAccounts())[0].address,
    signer: new SecretNetworkClient({
      chainId: configs.secret.config.chainId,
      url: configs.secret.config.rpcURL,
      wallet: configs.secret.signer,
      walletAddress: configs.secret.signer.address,
    }),
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
    },
    mintArgs: {
      contractAddress: "",
      tokenId: "400",
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
    },
    approveTokenId: "400",
    signerAddress: configs.secret.signer.address
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await secret_to_cosm_back();
    await transferBackMultiple([test], factory);
  })();
}
