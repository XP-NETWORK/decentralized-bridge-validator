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

export const ton_to_cosm = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }
  const signer = await getSigners(genWallets)
  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);

  const firstTest = createTest({
    fromChain: "TON",
    toChain: "TERRA",
    nftType: "singular",
    claimSigner: await signer.terra,
    receiver: (await (await signer.terra).getAccounts())[0].address,
    signer: configs.ton.signer.sender(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    ),
    deployArgs: {
      owner_address: configs.ton.signer.address,
      collection_meta_uri: (Math.random() * 100000).toString(),
      royalty_params: {
        $$type: "RoyaltyParams",
        denominator: 1000n,
        destination: configs.ton.signer.address,
        numerator: 1n,
      },
    },
    mintArgs: {
      contract: "",
      owner: configs.ton.signer.address,
      token_id: 1n,
      uri: "https://meta.polkamon.com/meta?id=10001852306",
    },
    approveTokenId: "1",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await ton_to_cosm();
    await transferMultiple([test], factory);
  })();
}

