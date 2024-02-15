import { JsonRpcProvider, Wallet } from "ethers";
import secrets from "../secrets.json";
import { TSupportedChains, testnetBridgeConfig } from "./config";
import { evmHandler } from "./handler/evm";
import { TWallet } from "./handler/types";
import { IEvmChainConfig } from "./types";

export function configEvmHandler(
  chainIdent: TSupportedChains,
  rpc: string,
  wallet: TWallet,
) {
  return evmHandler(
    chainIdent,
    new JsonRpcProvider(rpc),
    new Wallet(wallet.pk),
  );
}

export async function configDeps() {
  return {
    chains: {
      evm: testnetBridgeConfig.bridgeChains
        .filter((e) => e.chainType === "evm")
        .map((c) => {
          const config = c as IEvmChainConfig;
          return configEvmHandler(
            config.chain as TSupportedChains,
            config.rpcURL,
            secrets.evmWallet,
          );
        }),
    },
  };
}
