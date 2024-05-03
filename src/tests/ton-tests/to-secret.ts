import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";

import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { generateWallets } from "../../utils";
import {
  createTest,
  generateConfig,
  getChainConfigs,
  transferMultiple,
} from "../utils";
import { beginCell } from "@ton/core";
import { SecretNetworkClient } from "secretjs";

export const ton_to_secret = async () => {
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

  const firstTest = createTest({
    fromChain: "TON",
    toChain: "SECRET",
    nftType: "singular",
    claimSigner: new SecretNetworkClient({
      chainId: configs.secret.config.chainId,
      url: configs.secret.config.rpcURL,
      wallet: configs.secret.signer,
      walletAddress: configs.secret.signer.address,
    }),
    receiver: configs.secret.signer.address,
    signer: configs.ton.signer.sender(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    ),
    deployArgs: {
      owner_address: configs.ton.signer.address,
      collection_content: beginCell()
        .storeInt(0x01, 8)
        .storeStringRefTail("")
        .endCell(),
      royalty_params: {
        $$type: "RoyaltyParams",
        denominator: 10n,
        destination: configs.ton.signer.address,
        numerator: 1n,
      },
    },
    mintArgs: {
      contract: configs.ton.signer.address,
    },
    approveTokenId: "1",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await ton_to_secret();
    await transferMultiple([test], factory);
  })();
}

