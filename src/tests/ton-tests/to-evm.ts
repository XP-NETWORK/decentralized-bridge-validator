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

export const ton_to_evm = async () => {
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

  const signer = configs.ton.signer.sender(
      Buffer.from(genWallets.tonWallet.secretKey, "hex")
    )
    //@ts-ignore
    signer.address = configs.ton.signer.address

  const firstTest = createTest({
    fromChain: "TON",
    toChain: "ETH",
    nftType: "singular",
    claimSigner: configs.eth.signer,
    receiver: await configs.eth.signer.getAddress(),
    signer: signer,
    deployArgs: {
      owner_address: configs.ton.signer.address,
      collection_meta: {
        name: 'Test Collection',
        symbol: (Math.random() * 100000).toString(),
        description: 'Testnet Collection for Testing XP NFT Bridge',
        image: ''
      },
      royalty_params: {
        $$type: "RoyaltyParams",
        denominator: 10n,
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
    const test = await ton_to_evm();
    await transferMultiple([test], factory);
  })();
}

