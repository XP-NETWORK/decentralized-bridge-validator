import {
  Address,
  AddressValue,
  BigUIntValue,
  BinaryCodec,
  BytesValue,
  Field,
  Struct,
} from "@multiversx/sdk-core/out";
import { Nonce } from "@multiversx/sdk-network-providers/out/primitives";
import type { UserSigner } from "@multiversx/sdk-wallet/out";
import { keccak256 } from "js-sha3";
import { MXClaimDataSchema } from "../../../contractsTypes/multiversx/schema";
import type { TNftTransferDetailsObject } from "../../types";

export default async function signClaimData(
  buf: TNftTransferDetailsObject,
  signer: UserSigner,
) {
  // Mitigation if destination user address is invalid
  let destinationAddress = new Address(buf.royaltyReceiver);
  try {
    destinationAddress = new Address(buf.destinationUserAddress);
  } catch (e) {
    console.error(
      "wrong destination address, nft sent to royality reciever address",
    );
  }
  const claimDataArgs = new Struct(MXClaimDataSchema, [
    new Field(
      new BytesValue(Buffer.from(new Nonce(Number(buf.tokenId)).hex(), "hex")),
      "token_id",
    ),
    new Field(new BytesValue(Buffer.from(buf.sourceChain)), "source_chain"),
    new Field(
      new BytesValue(Buffer.from(buf.destinationChain)),
      "destination_chain",
    ),
    new Field(new AddressValue(destinationAddress), "destination_user_address"),
    new Field(
      new BytesValue(Buffer.from(buf.sourceNftContractAddress)),
      "source_nft_contract_address",
    ),
    new Field(new BytesValue(Buffer.from(buf.name)), "name"),
    new Field(
      new BytesValue(Buffer.from(`N${buf.sourceChain.toUpperCase()}`)),
      "symbol",
    ),
    new Field(new BigUIntValue(Number(buf.royalty)), "royalty"),
    new Field(
      new AddressValue(new Address(buf.royaltyReceiver)),
      "royalty_receiver",
    ),
    new Field(new BytesValue(Buffer.from(buf.metadata)), "attrs"),
    new Field(
      new BytesValue(Buffer.from(buf.transactionHash)),
      "transaction_hash",
    ),
    new Field(new BigUIntValue(buf.tokenAmount), "token_amount"),
    new Field(new BytesValue(Buffer.from(buf.nftType)), "nft_type"),
    new Field(new BigUIntValue(buf.fee), "fee"),
  ]);

  const data = new BinaryCodec().encodeNested(claimDataArgs);

  const signedData = await signer.sign(Buffer.from(keccak256(data), "hex"));
  return {
    signature: `0x${signedData.toString("hex")}`,
    signer: signer.getAddress().hex(),
  };
}
