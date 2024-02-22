import { Address, Sender, TonClient, WalletContractV4 } from "@ton/ton";
import TonWeb from "tonweb";
import { HttpProvider } from "tonweb/dist/types/providers/http-provider";
import { BridgeStorage } from "../../contractsTypes/evm";
import { Bridge } from "../../contractsTypes/ton/tonBridge";
import { THandler } from "../types";
import {
  addSelfAsValidator,
  generateWallet,
  listenForLockEvents,
  nftData,
  selfIsValidator,
  signClaimData,
} from "./utils";

export function tonHandler(
  client: TonClient,
  provider: HttpProvider,
  signer: WalletContractV4,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  walletSender: Sender,
  secretKey: string,
): THandler {
  const chainIdent = "TON";
  const bc = client.open(
    Bridge.fromAddress(Address.parseFriendly(bridge).address),
  );
  const tonweb = new TonWeb(provider);
  return {
    signClaimData: (d) => signClaimData(d, secretKey, signer),
    addSelfAsValidator: () =>
      addSelfAsValidator(storage, bc, signer, walletSender),
    selfIsValidator: () => selfIsValidator(signer, tonweb, bridge),
    nftData: (_, ctr) => nftData(_, ctr, client),
    chainIdent: chainIdent,
    listenForLockEvents: (builder, cb) =>
      listenForLockEvents(builder, cb, lastBlock_, client, bridge),
    generateWallet: generateWallet,
  };
}

export function raise(msg: string): never {
  throw new Error(msg);
}
