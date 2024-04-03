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

export const evm_to_secret = async () => {
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
    fromChain: "ETH",
    toChain: "TERRA",
    nftType: "singular",
    claimSigner: terraSigner,
    receiver: (await terraSigner.getAccounts())[0].address,
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
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await evm_to_secret();
    await transferMultiple([test], factory);
  })();
}

// TESTED: ✅OK
