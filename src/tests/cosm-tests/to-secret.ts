import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";

import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { generateWallets } from "../../utils";
import {
  createTest,
  generateConfig,
  getChainConfigs,
  getSigners,
  transferMultiple,
} from "../utils";
import { SecretNetworkClient } from "secretjs";

export const cosm_to_secret = async () => {
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

  const firstTest = createTest({
    fromChain: "TERRA",
    toChain: "SECRET",
    nftType: "singular",
    claimSigner: new SecretNetworkClient({
      url: configs.secret.config.rpcURL,
      chainId: configs.secret.config.chainId,
      wallet: signers.secret,
      walletAddress: signers.secret.address,
    }),
    receiver: signers.secret.address,
    signer: await signers.terra,
    deployArgs: {
      name: "TestContract" + Math.floor(Math.random() * 1000).toString(),
      symbol: "TST" + Math.floor(Math.random() * 1000).toString(),
    },
    mintArgs: {
      contract: "",
      token_id: "400",
      token_uri:
        "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
    },
    approveTokenId: "400",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await cosm_to_secret();
    await transferMultiple([test], factory);
  })();
}

// OK TESTED✅