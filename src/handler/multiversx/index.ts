import {
  AbiRegistry,
  SmartContract,
  TransactionEventsParser,
  TransactionsConverter,
} from "@multiversx/sdk-core/out";
import { Address } from "@multiversx/sdk-network-providers/out/primitives";
import axios from "axios";
import { multiversXBridgeABI } from "../../contractsTypes/multiversx/abi/multiversXBridgeABI";
import pollForLockEvents from "../poller";
import { raise } from "../ton";
import type { THandler } from "../types";
import type { MultiversXHandlerParams } from "./types";
import {
  addSelfAsValidator,
  getBalance,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
  signData,
} from "./utils";

export function multiversxHandler({
  provider,
  gatewayURL,
  signer,
  chainID,
  bridge,
  storage,
  lastBlock,
  initialFunds,
  em,
  decimals,
  chainType,
  chainIdent,
  serverLinkHandler,
  logger,
}: MultiversXHandlerParams): THandler {
  const multiversXBridgeAddress = new Address(bridge);
  const abiRegistry = AbiRegistry.create(multiversXBridgeABI);
  const bc = new SmartContract({
    address: multiversXBridgeAddress,
    abi: abiRegistry,
  });
  const eventsParser = new TransactionEventsParser({
    abi: abiRegistry,
  });
  const converter = new TransactionsConverter();

  const gateway = axios.create({
    baseURL: gatewayURL,
  });

  return {
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
    signData: (buf) => signData(buf, signer),
    publicKey: signer.getAddress().hex(),
    chainType,
    initialFunds: initialFunds,
    currency: "EGLD",
    address: signer.getAddress().bech32(),
    getBalance: () => getBalance(provider, signer.getAddress()),
    chainIdent,
    selfIsValidator: () => selfIsValidator(bc, signer, provider),
    addSelfAsValidator: () =>
      addSelfAsValidator(bc, chainID, storage, signer, provider, logger),
    listenForLockEvents: (builder, cb) =>
      listenForLockEvents(
        builder,
        cb,
        lastBlock,
        bridge,
        gateway,
        provider,
        gatewayURL,
        em,
        converter,
        eventsParser,
        logger,
      ),
    nftData: (tid, ctr) => nftData(tid, ctr, provider, gatewayURL, logger),
    signClaimData: (data) => signClaimData(data, signer),
    decimals: BigInt(10 ** decimals),
  };
}
