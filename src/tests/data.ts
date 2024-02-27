import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { TonClient, WalletContractV4 } from "@ton/ton";
import { JsonRpcProvider, Wallet } from "ethers";
import { createInterface } from "readline/promises";
import { SecretNetworkClient, Wallet as SecretWallet } from "secretjs";
import TonWeb from "tonweb";
import { IGeneratedWallets } from "../types";
import { getConfigs } from "./configs";

const int = createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
      signer: await (async () => {
        const wallet = new Wallet(
          genWallets.evmWallet.privateKey,
          new JsonRpcProvider(configs.bsc.rpcURL),
        );
        await requireFundsForAddress(
          async () => (await wallet.provider?.getBalance(wallet)) ?? 0n,
          wallet.address,
        );
      })(),
      config: configs.bsc,
      address: genWallets.evmWallet.address,
    },
    hedera: {
      signer: await (async () => {
        const wallet = new Wallet(
          genWallets.evmWallet.privateKey,
          new JsonRpcProvider(configs.hedera.rpcURL),
        );
        await requireFundsForAddress(
          async () => (await wallet.provider?.getBalance(wallet)) ?? 0n,
          wallet.address,
        );
      })(),
      config: configs.hedera,
      address: genWallets.evmWallet.address,
    },
    multiversx: {
      signer: await (async () => {
        const signer = UserSigner.fromWallet(
          genWallets.multiversXWallet.userWallet,
          genWallets.multiversXWallet.password,
        );

        await requireFundsForAddress(async () => {
          const np = new ProxyNetworkProvider(configs.multiversx.gatewayURL);
          return BigInt(
            (await np.getAccount(signer.getAddress())).balance.toString(),
          );
        }, signer.getAddress().bech32());
        return signer;
      })(),
      config: configs.multiversx,
      address: genWallets.multiversXWallet.userWallet.address,
    },
    eth: {
      signer: await (async () => {
        const wallet = new Wallet(
          genWallets.evmWallet.privateKey,
          new JsonRpcProvider(configs.eth.rpcURL),
        );
        await requireFundsForAddress(
          async () => (await wallet.provider?.getBalance(wallet)) ?? 0n,
          wallet.address,
        );
      })(),
      config: configs.eth,
      address: genWallets.evmWallet.address,
    },
    tezos: {
      signer: (async () => {
        const signer = new InMemorySigner(genWallets.tezosWallet.secretKey);
        const Tezos = new TezosToolkit(configs.tezos.rpcURL);
        await requireFundsForAddress(
          async () =>
            BigInt(
              (
                await Tezos.rpc.getBalance(await signer.publicKeyHash())
              ).toString(),
            ),
          await signer.publicKeyHash(),
        );
      })(),
      config: configs.tezos,
      address: await new InMemorySigner(
        genWallets.tezosWallet.secretKey,
      ).publicKeyHash(),
    },
    secret: {
      signer: await (async () => {
        const wallet = new SecretWallet(genWallets.secretWallet.privateKey);
        await requireFundsForAddress(
          async () =>
            BigInt(
              (
                await new SecretNetworkClient({
                  url: configs.secret.rpcURL,
                  chainId: configs.secret.chainId,
                }).query.bank.balance({
                  address: wallet.address,
                  denom: "uscrt",
                })
              ).balance?.amount ?? "0",
            ),
          wallet.address,
        );
        return wallet;
      })(),
      config: configs.secret,
      address: genWallets.secretWallet.publicKey,
    },
    ton: {
      signer: await (async () => {
        const wallet = WalletContractV4.create({
          publicKey: Buffer.from(genWallets.tonWallet.publicKey, "hex"),
          workchain: 0,
        });
        const tc = new TonClient({
          endpoint: configs.ton.rpcURL,
          apiKey: "api-key",
        });
        await requireFundsForAddress(
          async () => await tc.getBalance(wallet.address),
          wallet.address.toString(),
        );
        return wallet;
      })(),
      config: configs.ton,
      address: (await wallet.getAddress()).toString(),
    },
  };
}

async function requireFundsForAddress(
  gb: () => Promise<bigint>,
  address: string,
  minBalance = 0.1,
) {
  let funded = false;
  while (!funded) {
    const balance = await gb();
    if (balance < minBalance) {
      await int.question(
        `Fund the wallet: ${address} and press enter to continue. Current Balance: ${balance}`,
      );
      continue;
    }
    funded = true;
  }
}
