import {
  AbiRegistry,
  SmartContract,
  TransactionEventsParser,
  TransactionsConverter,
} from "@multiversx/sdk-core/out";
import { Address } from "@multiversx/sdk-network-providers/out/primitives";
import axios from "axios";
import { multiversXBridgeABI } from "../../contractsTypes/evm/abi";
import { THandler } from "../types";
import { MultiversXHandlerParams } from "./types";
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
      addSelfAsValidator(bc, chainID, storage, signer, provider),
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
      ),
    nftData: (tid, ctr) => nftData(tid, ctr, provider, gatewayURL),
    signClaimData: (data) => signClaimData(data, signer),
    decimals: BigInt(10 ** decimals),
  };
}
