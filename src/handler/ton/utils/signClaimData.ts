import { Address, beginCell } from "@ton/core";
import { WalletContractV4 } from "@ton/ton";

import { sign } from "ton-crypto";
import TonWeb from "tonweb";
import {
  ClaimData,
  storeClaimData,
} from "../../../contractsTypes/ton/tonBridge";
import { TNftTransferDetailsObject } from "../../types";
import TonLog from "./log";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  secretKey: string,
  signer: WalletContractV4,
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
    TonLog("Not Native TON Address");
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
      metadata,
      royaltyReceiver: Address.parseFriendly(royaltyReceiver).address,
      sourceNftContractAddress: sourceNftContractAddress_,
    },
    data4: {
      $$type: "ClaimData4",
      newContent: beginCell()
        .storeInt(0x01, 8)
        .storeStringRefTail(metadata)
        .endCell(),
      royalty: {
        $$type: "RoyaltyParams",
        denominator: BigInt(10000),
        numerator: BigInt(royalty),
        destination: Address.parseFriendly(royaltyReceiver).address,
      },
      transactionHash,
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
