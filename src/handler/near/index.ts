import { Contract } from "near-api-js";
import pollForLockEvents from "../poller";
import { raise } from "../ton";
import type { THandler } from "../types";
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
  near,
  signer,
  bridge,
  privateKey,
  storage,
  lastBlock_,
  initialFunds,
  em,
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
  const bc = new Contract(near.connection, bridge, {
    changeMethods: [],
    viewMethods: [],
    useLocalViewExecution: true,
  });
  const publicKey = await signer.getPublicKey(address, networkId);
  const publicKeyInHex = Buffer.from(publicKey.data).toString("hex");
  const account = await near.account(address);
  return {
    publicKey: publicKeyInHex,
    pollForLockEvents: async (builder, cb) => {
      serverLinkHandler
        ? pollForLockEvents(
            chainIdent,
            builder,
            cb,
            em,
            serverLinkHandler,
            logger,
          )
        : raise(
            "Unreachable. Wont be called if serverLinkHandler is not present.",
          );
    },
    signData: (buf) => signData(buf, privateKey),
    chainType,
    initialFunds: initialFunds,
    chainIdent,
    currency: "NEAR",
    address,
    signClaimData: (data) => signClaimData(data, privateKey),
    selfIsValidator: () => selfIsValidator(bc as never, publicKeyInHex),
    listenForLockEvents: (cb, iter) =>
      listenForLockEvents(cb, iter, near, lastBlock_, bridge, em, logger),
    addSelfAsValidator: () =>
      addSelfAsValidator(
        storage,
        address,
        publicKeyInHex,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        bc as any,
        logger,
        staking,
        validatorAddress,
        account,
      ),
    getBalance: () => getBalance(near, address),
    nftData: (tid, ctr) => nftData(tid, ctr, near, logger),
    decimals: BigInt(10 ** decimals),
  };
}
