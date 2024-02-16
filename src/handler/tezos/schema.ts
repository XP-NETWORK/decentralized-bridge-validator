import { MichelsonType } from "@taquito/michel-codec";
import { Schema } from "@taquito/michelson-encoder";

export const TezosNftTransferDetailsTypes = {
  prim: "pair",
  args: [
    { prim: "nat", annots: ["%token_id"] },
    { prim: "string", annots: ["%source_chain"] },
    { prim: "string", annots: ["%dest_chain"] },
    { prim: "address", annots: ["%dest_address"] },
    {
      prim: "or",
      args: [
        { prim: "address", annots: ["%addr"] },
        { prim: "string", annots: ["%str"] },
      ],
      annots: ["%source_nft_contract_address"],
    },
    { prim: "string", annots: ["%name"] },
    { prim: "string", annots: ["%symbol"] },
    { prim: "nat", annots: ["%royalty"] },
    { prim: "address", annots: ["%royalty_receiver"] },
    { prim: "string", annots: ["%metadata"] },
    { prim: "string", annots: ["%transaction_hash"] },
    { prim: "nat", annots: ["%token_amount"] },
    { prim: "string", annots: ["%nft_type"] },
    { prim: "mutez", annots: ["%fee"] },
  ],
  annots: ["%data"],
} as MichelsonType;

export const TezosNftTransferDetailsSchema = new Schema(
  TezosNftTransferDetailsTypes,
);
