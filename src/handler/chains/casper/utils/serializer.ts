import {
  CLAccountHash,
  CLAccountHashBytesParser,
  CLString,
  CLStringBytesParser,
  CLU512,
  CLU512BytesParser,
} from "casper-js-sdk";
import type { TCasperClaimArgs } from "../types";

export function Serializer() {
  const u512Serializer = new CLU512BytesParser();
  const stringSerializer = new CLStringBytesParser();
  const accountHashSerializer = new CLAccountHashBytesParser();
  return {
    claimNft(args: TCasperClaimArgs) {
      const tokenIdentifier = stringSerializer
        .toBytes(new CLString(args.token_id_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize token_id_arg to bytes.",
        );

      const source_chain = stringSerializer
        .toBytes(new CLString(args.source_chain_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize source_chain_arg to bytes.",
        );

      const destination_chain = stringSerializer
        .toBytes(new CLString(args.destination_chain_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize destination_chain_arg to bytes.",
        );

      const destination_user_address = accountHashSerializer
        .toBytes(
          new CLAccountHash(
            Buffer.from(args.destination_user_address_arg, "hex"),
          ),
        )
        .expect(
          "Serialize(ClaimArgs): Failed to serialize destination_user_address_arg to bytes.",
        );

      const source_nft_contract_address = stringSerializer
        .toBytes(new CLString(args.source_nft_contract_address_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize source_nft_contract_address_arg to bytes.",
        );

      const name = stringSerializer
        .toBytes(new CLString(args.name_arg))
        .expect("Serialize(ClaimArgs): Failed to serialize name_arg to bytes.");

      const symbol = stringSerializer
        .toBytes(new CLString(args.symbol_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize symbol_arg to bytes.",
        );

      const royalty = u512Serializer
        .toBytes(new CLU512(args.royalty_arg))
        .expect(
          "Serialize(WithdrawFeeData): Failed to serialize royalty_arg to bytes.",
        );

      const royalty_receiver = accountHashSerializer
        .toBytes(
          new CLAccountHash(Buffer.from(args.royalty_receiver_arg, "hex")),
        )
        .expect(
          "Serialize(ClaimArgs): Failed to serialize royalty_receiver_arg to bytes.",
        );

      const metadata = stringSerializer
        .toBytes(new CLString(args.metadata_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize metadata_arg to bytes.",
        );

      const transaction_hash = stringSerializer
        .toBytes(new CLString(args.transaction_hash_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize transaction_hash_arg to bytes.",
        );

      const token_amount = u512Serializer
        .toBytes(new CLU512(args.token_amount_arg))
        .expect(
          "Serialize(WithdrawFeeData): Failed to serialize token_amount_arg to bytes.",
        );

      const nft_type = stringSerializer
        .toBytes(new CLString(args.nft_type_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize nft_type_arg to bytes.",
        );

      const fee = u512Serializer
        .toBytes(new CLU512(args.fee_arg))
        .expect(
          "Serialize(WithdrawFeeData): Failed to serialize fee_arg to bytes.",
        );

      const lock_tx_chain = stringSerializer
        .toBytes(new CLString(args.lock_tx_chain_arg))
        .expect(
          "Serialize(ClaimArgs): Failed to serialize lock_tx_chain_arg to bytes.",
        );
      return Buffer.concat([
        tokenIdentifier,
        source_chain,
        destination_chain,
        destination_user_address,
        source_nft_contract_address,
        name,
        symbol,
        royalty,
        royalty_receiver,
        metadata,
        transaction_hash,
        token_amount,
        nft_type,
        fee,
        lock_tx_chain,
      ]);
    },
  };
}
