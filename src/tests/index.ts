import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { TChainFactory } from "xp-decentralized-sdk/dist/factory/types/utils";
import { bridgeTestChains } from "../config";
import { IGeneratedWallets } from "../types";
import { generateWallets } from "../utils";
import {
  createTest,
  generateConfig,
  getChainConfigs,
  getSigners,
  transferMultiple,
} from "./utils";

const testcases = async (factory: TChainFactory) => {
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

  const firstTest = createTest({
    fromChain: "ETH",
    toChain: "TON",
    nftType: "singular",
    claimSigner: configs.ton.signer.sender(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    ),
    receiver: configs.ton.signer.address.toString(),
    signer: configs.eth.signer,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
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
  await transferMultiple([firstTest], factory);
};

const factory = ChainFactory(ChainFactoryConfigs.TestNet());
testcases(factory)
  .catch((e) => console.error(e))
  .then((e) => console.log(e));
