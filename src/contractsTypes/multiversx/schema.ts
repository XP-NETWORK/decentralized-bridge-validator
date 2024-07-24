import {
  AddressType,
  BigUIntType,
  BytesType,
  FieldDefinition,
  StructType,
} from "@multiversx/sdk-core/out";

export const MXClaimDataSchema = new StructType("ClaimData", [
  new FieldDefinition("token_id", "name of the nft", new BytesType()),
  new FieldDefinition("source_chain", "attributes of the nft", new BytesType()),
  new FieldDefinition(
    "destination_chain",
    "attributes of the nft",
    new BytesType(),
  ),
  new FieldDefinition(
    "destination_user_address",
    "attributes of the nft",
    new AddressType(),
  ),
  new FieldDefinition(
    "source_nft_contract_address",
    "attributes of the nft",
    new BytesType(),
  ),
  new FieldDefinition("name", "attributes of the nft", new BytesType()),
  new FieldDefinition("symbol", "attributes of the nft", new BytesType()),
  new FieldDefinition("royalty", "attributes of the nft", new BigUIntType()),
  new FieldDefinition(
    "royalty_receiver",
    "attributes of the nft",
    new AddressType(),
  ),
  new FieldDefinition("attrs", "attributes of the nft", new BytesType()),
  new FieldDefinition(
    "transaction_hash",
    "attributes of the nft",
    new BytesType(),
  ),
  new FieldDefinition(
    "token_amount",
    "attributes of the nft",
    new BigUIntType(),
  ),
  new FieldDefinition("nft_type", "attributes of the nft", new BytesType()),
  new FieldDefinition("fee", "attributes of the nft", new BigUIntType()),
       new FieldDefinition(
          "lock_tx_chain",
          "Chain identifier on which nft was locked",
          new BytesType(),
        ),
]);
