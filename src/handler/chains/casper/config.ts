import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { CasperClient, Keys } from "casper-js-sdk";
import { casperHandler } from ".";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { ICasperChainConfig, ICasperWallet } from "../../../types";
import type { LogInstance } from "../../types";

export async function configCasperHandler(
  conf: ICasperChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  casperWallet: ICasperWallet,
  serverLinkHandler: AxiosInstance | undefined,
  casperLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const cc = new CasperClient(conf.rpcURL);
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const priv = Keys.Ed25519.parsePrivateKey(
    Buffer.from(casperWallet.privateKey, "hex"),
  );
  const pub = Keys.Ed25519.privateToPublicKey(priv);
  const key = Keys.Ed25519.parseKeyPair(pub, priv);
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [cc, release] as const;
  }

  return casperHandler({
    fetchProvider: fetchProvider,
    bridge: conf.contractAddress,
    chainIdent: "CASPER",
    chainType: "casper",
    decimals: conf.decimals,
    em,
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock || conf.lastBlock,
    logger: casperLogger,
    serverLinkHandler,
    signer: key,
    staking,
    storage,
    validatorAddress,
    chainName: conf.chain,
    rpc: conf.rpcURL,
  });
}
