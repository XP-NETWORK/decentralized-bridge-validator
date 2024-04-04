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

export const mx_to_secret = async () => {
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
  //@ts-ignore
  const configs = await generateConfig(genWallets, chainConfigs);
  const terraSigner = await signers.terra;

  const firstTest = createTest({
    fromChain: "MULTIVERSX",
    toChain: "TERRA",
    nftType: "singular",
    claimSigner: terraSigner,
    receiver: (await terraSigner.getAccounts())[0].address,
    signer: signers.multiversx,
    deployArgs: {
      name: "TestContract",
      ticker: "TST",
    },
    mintArgs: {
      name: "Test Nft",
      ticker: "TST",
      uris: [
        "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      ],
    },
    approveTokenId: "400",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await mx_to_secret();
    await transferMultiple([test], factory);
  })();
}
