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

export const cosm_to_mx = async () => {
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
    toChain: "MULTIVERSX",
    nftType: "singular",
    claimSigner: configs.multiversx.signer,
    receiver: await configs.multiversx.signer.getAddress(),
    signer: await signers.terra,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
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
    const test = await cosm_to_mx();
    await transferMultiple([test], factory);
  })();
}

// TESTED: ✅OK (MX Fails with `legacy async call invalid`)