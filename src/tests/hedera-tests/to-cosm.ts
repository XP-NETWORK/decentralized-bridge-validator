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

export const hedera_to_cosm = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }

  const signers = await getSigners(genWallets);
  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);
  const terraSigner = await signers.terra;

  const firstTest = createTest({
    fromChain: "HEDERA",
    toChain: "TERRA",
    nftType: "singular",
    claimSigner: terraSigner,
    receiver: (await terraSigner.getAccounts())[0].address,
    signer: configs.hedera.signer,
    deployArgs: {
      name: `TestContract${Math.random() * 100000000}`,
      symbol: `TST${Math.random() * 100000000}`,
    },
    mintArgs: {

      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      contract: "",
    },
    approveTokenId: "1",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await hedera_to_cosm();
    await transferMultiple([test], factory);
  })();
}

// TESTED: ✅OK
