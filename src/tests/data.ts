import { UserSigner } from "@multiversx/sdk-wallet/out";
import { InMemorySigner } from "@taquito/signer";
import { WalletContractV4 } from "@ton/ton";
import { JsonRpcProvider, Wallet } from "ethers";
import { Wallet as SecretWallet } from "secretjs";
import TonWeb from "tonweb";
import { IGeneratedWallets } from "../types";
import { getConfigs } from "./configs";

export async function generateData(
  genWallets: IGeneratedWallets,
  configs: ReturnType<typeof getConfigs>,
) {
  const tonweb = new TonWeb(new TonWeb.HttpProvider(configs.ton.rpcURL));

  const walletClass = tonweb.wallet.all["v4R2"];

  const wallet = new walletClass(tonweb.provider, {
    publicKey: TonWeb.utils.hexToBytes(genWallets.tonWallet.publicKey),
  });
  return {
    bsc: {
      signer: new Wallet(
        genWallets.evmWallet.privateKey,
        new JsonRpcProvider(configs.bsc.rpcURL),
      ),
      config: configs.bsc,
      address: genWallets.evmWallet.address,
    },
    hedera: {
      signer: new Wallet(
        genWallets.evmWallet.privateKey,
        new JsonRpcProvider(configs.hedera.rpcURL),
      ),
      config: configs.hedera,
      address: genWallets.evmWallet.address,
    },
    multiversx: {
      signer: UserSigner.fromWallet(
        genWallets.multiversXWallet.userWallet,
        genWallets.multiversXWallet.password,
      ),
      config: configs.multiversx,
      address: genWallets.multiversXWallet.userWallet.address,
    },
    eth: {
      signer: new Wallet(
        genWallets.evmWallet.privateKey,
        new JsonRpcProvider(configs.eth.rpcURL),
      ),
      config: configs.eth,
      address: genWallets.evmWallet.address,
    },
    tezos: {
      signer: new InMemorySigner(genWallets.tezosWallet.secretKey),
      config: configs.tezos,
      address: await new InMemorySigner(
        genWallets.tezosWallet.secretKey,
      ).publicKeyHash(),
    },
    secret: {
      signer: new SecretWallet(genWallets.secretWallet.privateKey),
      config: configs.secret,
      address: genWallets.secretWallet.publicKey,
    },
    ton: {
      signer: WalletContractV4.create({
        publicKey: Buffer.from(genWallets.tonWallet.publicKey, "hex"),
        workchain: 0,
      }),
      config: configs.ton,
      address: (await wallet.getAddress()).toString(),
    },
  };
}
