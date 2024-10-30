import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { SecretNetworkClient, Wallet } from "secretjs";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { ISecretChainConfig, ISecretWallet } from "../../../types";
import type { LogInstance } from "../../types";
import type { MutexReleaser } from "../evm/types";
import { raise } from "../ton/handler";
import { secretsHandler } from "./handler";

export async function configSecretHandler(
  conf: ISecretChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  secretWallet: ISecretWallet,
  serverLinkHandler: AxiosInstance | undefined,
  staking: ERC20Staking,
  validatorAddress: string,
  scrtLogger: LogInstance,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const wallet = new Wallet(secretWallet.privateKey);
  const client = new SecretNetworkClient({
    chainId: conf.chainId,
    url: conf.rpcURL,
    wallet: wallet,
    walletAddress: wallet.address,
  });
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [client, release] as [SecretNetworkClient, MutexReleaser];
  }
  return secretsHandler({
    fetchProvider,
    wallet,
    publicKey: secretWallet.publicKey,
    privateKey: secretWallet.privateKey,
    bridge: conf.contractAddress,
    bridgeCodeHash:
      (
        await client.query.compute.codeHashByContractAddress({
          contract_address: conf.contractAddress,
        })
      ).code_hash ?? raise("Failed to get Code Hash"),
    storage,
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    blockChunks: conf.blockChunks,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    decimals: conf.decimals,
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: scrtLogger,
    staking,
    validatorAddress,
  });
}
