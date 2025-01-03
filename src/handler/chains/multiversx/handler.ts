import { AbiRegistry, SmartContract } from "@multiversx/sdk-core/out";
import { Address } from "@multiversx/sdk-network-providers/out/primitives";
import { multiversXBridgeABI } from "../../../contractsTypes/multiversx/abi/multiversXBridgeABI";
import pollForLockEvents from "../../poller";
import type { THandler } from "../../types";
import { raise } from "../ton/handler";
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
  staking,
  validatorAddress,
}: MultiversXHandlerParams): THandler {
  const multiversXBridgeAddress = new Address(bridge);
  const abiRegistry = AbiRegistry.create(multiversXBridgeABI);
  const bc = new SmartContract({
    address: multiversXBridgeAddress,
    abi: abiRegistry,
  });

  // const gateway = axios.create({
  //   baseURL: gatewayURL,
  // });

  return {
    validateNftData(data) {
      if (data.name.length > 50 || data.name.length < 3) {
        return {
          valid: false,
          reason: "Name must be between 3 and 50 characters",
        };
      }
      if (data.symbol.length > 10 || data.symbol.length < 3) {
        return {
          valid: false,
          reason: "Symbol must be between 3 and 10 characters",
        };
      }
      return {
        valid: true,
      };
    },
    pollForLockEvents: async (_, cb, cbLe) => {
      serverLinkHandler
        ? pollForLockEvents(chainIdent, cbLe, cb, em, serverLinkHandler, logger)
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
      addSelfAsValidator(
        bc,
        chainID,
        storage,
        signer,
        provider,
        logger,
        staking,
        validatorAddress,
      ),
    listenForLockEvents: (builder, cb) =>
      listenForLockEvents(
        builder,
        cb,
        lastBlock,
        bridge,
        // gateway,
        provider,
        gatewayURL,
        em,
        logger,
      ),
    nftData: (tid, ctr) => nftData(tid, ctr, provider, gatewayURL, logger),
    signClaimData: (data) => signClaimData(data, signer),
    decimals: BigInt(10 ** decimals),
  };
}
