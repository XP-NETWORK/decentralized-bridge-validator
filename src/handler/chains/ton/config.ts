import type { EntityManager } from "@mikro-orm/sqlite";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4 } from "@ton/ton";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import TonWeb from "tonweb";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { ITonChainConfig, ITonWallet } from "../../../types";
import type { LogInstance } from "../../types";
import type { MutexReleaser } from "../evm/types";
import { tonHandler } from "./handler";

export async function configTonHandler(
  conf: ITonChainConfig,
  tonWallet: ITonWallet,
  storage: BridgeStorage,
  em: EntityManager,
  serverLinkHandler: AxiosInstance | undefined,
  tonLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const endpoint = await getHttpEndpoint({
    network: conf.network,
  }); // get the decentralized RPC endpoint
  const client = new TonClient({
    endpoint: endpoint,
  });
  const signer = WalletContractV4.create({
    publicKey: Buffer.from(tonWallet.publicKey, "hex"),
    workchain: 0,
  });
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const mutex = new Mutex();
  async function fetchClient() {
    const release = await mutex.acquire();
    return [client, release] as [TonClient, MutexReleaser];
  }
  return tonHandler({
    fetchClient,
    provider: new TonWeb.HttpProvider(endpoint),
    signer,
    bridge: conf.contractAddress,
    storage,
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    walletSender: client
      .open(signer)
      .sender(Buffer.from(tonWallet.secretKey, "hex")),
    secretKey: tonWallet.secretKey,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    decimals: conf.decimals,
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: tonLogger,
    staking,
    validatorAddress,
  });
}
