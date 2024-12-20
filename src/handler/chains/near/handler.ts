import axios from "axios";
import { Contract } from "near-api-js";
import type { KeyPairEd25519 } from "near-api-js/lib/utils";
import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import { raise } from "../ton/handler";
import type { NearHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export async function nearHandler({
  fetchProvider,
  signer,
  bridge,
  storage,
  lastBlock_,
  initialFunds,
  em,
  nearBlocksUrl,
  nearBlocksApiKey,
  theGraphApiUrl,
  address,
  decimals,
  chainIdent,
  chainType,
  serverLinkHandler,
  logger,
  staking,
  networkId,
  validatorAddress,
}: NearHandlerParams): Promise<THandler> {
  const bc = async () => {
    const [near, release] = await fetchProvider();
    const contract = new Contract(near.connection, bridge, {
      changeMethods: [],
      viewMethods: ["validator", "validator_count"],
      useLocalViewExecution: false,
    });
    return [contract, release] as const;
  };
  const nearBlocksApi = axios.create({
    baseURL: nearBlocksUrl,
    headers: {
      Authorization: `Bearer ${nearBlocksApiKey}`,
    },
  });
  const theGraphApi = axios.create({ baseURL: theGraphApiUrl });
  const publicKey = await signer.getPublicKey(address, networkId);
  const kp = (await signer.keyStore.getKey(
    networkId,
    address,
  )) as KeyPairEd25519;

  const publicKeyInHex = Buffer.from(publicKey.data).toString("hex");
  const [provider, release] = await fetchProvider();
  const account = await provider.account(address);
  release();
  return {
    publicKey: `${address}|${publicKeyInHex}`,
    pollForLockEvents: async (_, cb, cbLe) => {
      serverLinkHandler
        ? pollForLockEvents(chainIdent, cbLe, cb, em, serverLinkHandler, logger)
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
    signData: (buf) => signData(buf, kp),
    chainType,
    initialFunds: initialFunds,
    chainIdent,
    currency: "NEAR",
    address,
    validateNftData() {
      return { valid: true };
    },
    signClaimData: (data) => signClaimData(data, kp),
    selfIsValidator: () => selfIsValidator(bc as never, publicKeyInHex),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(
        cb,
        iter,
        theGraphApi,
        nearBlocksApi,
        lastBlock_,
        bridge,
        em,
        logger,
      ),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        address,
        publicKeyInHex,
        bc as never,
        bridge,
        logger,
        staking,
        validatorAddress,
        account,
      ),
    getBalance: () => getBalance(fetchProvider, address),
    nftData: (tid, ctr) => nftData(tid, ctr, fetchProvider, logger),
    decimals: BigInt(10 ** decimals),
  };
}
