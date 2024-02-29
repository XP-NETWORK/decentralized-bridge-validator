import { packDataBytes } from "@taquito/michel-codec";
import { Signer } from "@taquito/taquito";
import { validateAddress } from "@taquito/utils";
import { keccak256 } from "ethers";
import {
  TezosNftTransferDetailsSchema,
  TezosNftTransferDetailsTypes,
} from "../../../contractsTypes/tezos/schema";
import { TNftTransferDetailsObject } from "../../types";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  signer: Signer,
) {
  // Mitigation if destination user address is invalid
  const destionationUserAddress =
    validateAddress(data.destinationUserAddress) === 3
      ? data.destinationUserAddress
      : data.royaltyReceiver;

  const isTezosAddr = validateAddress(data.sourceNftContractAddress) === 3;

  const sourceNftContractAddress = isTezosAddr
    ? {
        addr: data.sourceNftContractAddress,
      }
    : {
        str: data.sourceNftContractAddress,
      };

  const encoded = TezosNftTransferDetailsSchema.Encode({
    token_id: data.tokenId,
    source_chain: data.sourceChain,
    dest_chain: data.destinationChain,
    dest_address: destionationUserAddress,
    source_nft_contract_address: sourceNftContractAddress,
    name: data.name,
    symbol: data.symbol,
    royalty: data.royalty,
    royalty_receiver: data.royaltyReceiver,
    metadata: data.metadata,
    transaction_hash: data.transactionHash,
    token_amount: data.tokenAmount,
    nft_type: data.nftType,
    fee: data.fee,
  });

  const packedData = packDataBytes(encoded, TezosNftTransferDetailsTypes);
  const packeyBytes = packedData.bytes;
  const hashedBytes = keccak256(Buffer.from(packeyBytes, "hex"));
  const signature = `0x${Buffer.from(
    (await signer.sign(hashedBytes)).sig,
  ).toString("hex")}`;
  return {
    signature: signature,
    signer: await signer.publicKey(),
  };
}
