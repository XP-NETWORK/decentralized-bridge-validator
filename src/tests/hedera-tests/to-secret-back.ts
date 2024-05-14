import { readFile } from "fs/promises";
import { SecretNetworkClient } from "secretjs";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { generateWallets } from "../../utils";
import {
  generateConfig,
  getChainConfigs,
} from "../utils";
import { createTransferBackTest, transferBackMultiple } from "../utils/transfer-back";

export const hedera_to_secret = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }

  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);

  const firstTest = createTransferBackTest({
    fromChain: "HEDERA",
    toChain: "SECRET",
    nftType: "singular",
    claimSigner: new SecretNetworkClient({
      chainId: configs.secret.config.chainId,
      url: configs.secret.config.rpcURL,
      wallet: configs.secret.signer,
      walletAddress: configs.secret.signer.address,
    }),
    receiver: configs.secret.signer.address,
    signer: configs.hedera.signer,
    deployArgs: {
      name: `TestContract${Math.random() * 100000000}`,
      symbol: `TST${Math.random() * 100000000}`,
    },
    mintArgs: {
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
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
    const test = await hedera_to_secret();
    await transferBackMultiple([test], factory);
  })();
}

// TESTED: ✅OK
