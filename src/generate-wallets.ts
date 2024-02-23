import fs from "fs/promises";
import { generateWallet as evmGw } from "./handler/evm/utils";
import { generateWallet as mxGw } from "./handler/multiversx/utils";
import { generateWallet as secretGw } from "./handler/secrets/utils";
import { generateWallet as tzGw } from "./handler/tezos/utils";
import { generateWallet as tonGw } from "./handler/ton/utils";

export async function generateWallets() {
  const wallets = {
    evmWallet: await evmGw()(),
    secretWallet: await secretGw(),
    tezosWallet: await tzGw(),
    multiversXWallet: await mxGw(),
    tonWallet: await tonGw(),
  };
  return fs.writeFile("secrets.json", JSON.stringify(wallets));
}
