import { readFile } from "fs/promises";
import { SecretNetworkClient } from "secretjs";
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

export const tezos_to_secret = async () => {
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
    fromChain: "TEZOS",
    toChain: "SECRET",
    nftType: "singular",
    claimSigner: new SecretNetworkClient({
      chainId: configs.secret.config.chainId,
      url: configs.secret.config.rpcURL,
      wallet: configs.secret.signer,
      walletAddress: configs.secret.signer.address,
    }),
    receiver: configs.secret.signer.address,
    signer: signers.tezos,
    deployArgs: {
      name: "TestContract",
      description: "Test Contract Description",
    },
    mintArgs: {
      tokenId: "400" as any,
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      contract: "",
    },
    approveTokenId: "400",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await tezos_to_secret();
    await transferMultiple([test], factory);
  })();
}
