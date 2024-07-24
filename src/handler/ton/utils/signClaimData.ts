import { Address, beginCell } from "@ton/core";
import type { WalletContractV4 } from "@ton/ton";

import { sign } from "ton-crypto";
import TonWeb from "tonweb";
import {
  type ClaimData,
  storeClaimData,
} from "../../../contractsTypes/ton/tonBridge";
import type { LogInstance, TNftTransferDetailsObject } from "../../types";
import { buildJettonContent } from "./tep64";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  secretKey: string,
  signer: WalletContractV4,
  logger: LogInstance,
) {
  const sk = Buffer.from(secretKey, "hex");
  const {
    tokenId,
    sourceChain,
    destinationChain,
    destinationUserAddress,
    sourceNftContractAddress,
    name,
    symbol,
    royalty,
    royaltyReceiver,
    metadata,
    transactionHash,
    tokenAmount,
    nftType,
    fee,
    lockTxChain,
  } = data;
  // Mitigation if destination user address is invalid
  let destinationAddress: Address;
  try {
    destinationAddress = Address.parseFriendly(destinationUserAddress).address;
  } catch (e) {
    destinationAddress = Address.parseFriendly(royaltyReceiver).address;
  }
  let sourceNftContractAddress_ = beginCell()
    .storeSlice(
      beginCell().storeStringTail(sourceNftContractAddress).endCell().asSlice(),
    )
    .endCell();
  try {
    sourceNftContractAddress_ = beginCell()
      .storeSlice(
        beginCell()
          .storeAddress(Address.parseFriendly(sourceNftContractAddress).address)
          .endCell()
          .asSlice(),
      )
      .endCell();
  } catch (e) {
    logger.warn("Not Native TON Address");
  }
  const claimData: ClaimData = {
    $$type: "ClaimData",
    data1: {
      $$type: "ClaimData1",
      tokenId: BigInt(tokenId),
      destinationChain,
      destinationUserAddress: destinationAddress,
      sourceChain,
      tokenAmount: BigInt(tokenAmount),
    },
    data2: {
      $$type: "ClaimData2",
      name,
      nftType,
      symbol,
    },
    data3: {
      $$type: "ClaimData3",
      fee: BigInt(fee),
      metadata: beginCell().storeInt(1, 8).storeStringTail(metadata).endCell(),
      royaltyReceiver: Address.parseFriendly(royaltyReceiver).address,
      sourceNftContractAddress: sourceNftContractAddress_,
    },
    data4: {
      $$type: "ClaimData4",
      newContent: buildJettonContent({
        name: name,
        symbol: symbol,
        description: "",
      }),
      royalty: {
        $$type: "RoyaltyParams",
        denominator: BigInt(10000),
        numerator: BigInt(royalty),
        destination: Address.parseFriendly(royaltyReceiver).address,
      },
      transactionHash,
      lockTxChain,
    },
  };
  const signature = `0x${sign(
    beginCell().store(storeClaimData(claimData)).endCell().hash(),
    sk,
  ).toString("hex")}`;

  return {
    signature: signature,
    signer: TonWeb.utils.bytesToHex(signer.publicKey),
  };
}
