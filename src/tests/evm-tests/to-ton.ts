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

export const evm_to_ton = async () => {
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

  const sender = configs.ton.signer.sender(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    )
    //@ts-ignore
    sender.address = configs.ton.signer.address

  const firstTest = createTest({
    fromChain: "MATIC",
    toChain: "TON",
    nftType: "singular",
    claimSigner: sender,
    receiver: configs.ton.signer.address.toString(),
    signer: configs.matic.signer,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
    },
    mintArgs: {
      tokenId: 400n,
      uri: "https://meta.polkamon.com/meta?id=10001852306",
      royalty: 10n,
      royaltyReceiver: configs.matic.signer.address,
      contract: "",
    },
    approveTokenId: "400",
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await evm_to_ton();
    await transferMultiple([test], factory);
  })();
}
// TESTED: ✅OK
