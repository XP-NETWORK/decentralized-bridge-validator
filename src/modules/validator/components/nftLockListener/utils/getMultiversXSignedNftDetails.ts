import { UserSigner } from "@multiversx/sdk-wallet/out";
import { INftTransferDetailsObject } from "../components/types";
import { IMultiversXWallet } from "@src/types";
import { Address, AddressType, AddressValue, BigUIntType, BigUIntValue, BinaryCodec, BytesType, BytesValue, Field, FieldDefinition, Struct, StructType } from "@multiversx/sdk-core/out";
import { keccak256 } from 'js-sha3';


const structClaimData = new StructType('ClaimData', [
    new FieldDefinition('token_id', 'name of the nft', new BytesType()),
    new FieldDefinition('source_chain', 'attributes of the nft', new BytesType()),
    new FieldDefinition('destination_chain', 'attributes of the nft', new BytesType()),
    new FieldDefinition('destination_user_address', 'attributes of the nft', new AddressType()),
    new FieldDefinition('source_nft_contract_address', 'attributes of the nft', new BytesType()),
    new FieldDefinition('name', 'attributes of the nft', new BytesType()),
    new FieldDefinition('symbol', 'attributes of the nft', new BytesType()),
    new FieldDefinition('royalty', 'attributes of the nft', new BigUIntType()),
    new FieldDefinition('royalty_receiver', 'attributes of the nft', new AddressType()),
    new FieldDefinition('attrs', 'attributes of the nft', new BytesType()),
    new FieldDefinition('transaction_hash', 'attributes of the nft', new BytesType()),
    new FieldDefinition('token_amount', 'attributes of the nft', new BigUIntType()),
    new FieldDefinition('nft_type', 'attributes of the nft', new BytesType()),
    new FieldDefinition('fee', 'attributes of the nft', new BigUIntType()),
]);

const getMultiversXSignedNftDetails = async ({ nftTransferDetailsObject, multiversXWallet }: {
    nftTransferDetailsObject: INftTransferDetailsObject,
    multiversXWallet: IMultiversXWallet
}) => {

    const signer = UserSigner.fromWallet(multiversXWallet.userWallet, multiversXWallet.password)

    const claimDataArgs = new Struct(structClaimData, [
        new Field(new BytesValue(Buffer.from(Number(nftTransferDetailsObject.tokenId).toString(16), "hex")), 'token_id'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.sourceChain)), 'source_chain'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.destinationChain)), 'destination_chain'),
        new Field(new AddressValue(new Address(nftTransferDetailsObject.destinationUserAddress)), 'destination_user_address'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.sourceNftContractAddress)), 'source_nft_contract_address'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.name)), 'name'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.symbol)), 'symbol'),
        new Field(new BigUIntValue(nftTransferDetailsObject.royalty), 'royalty'),
        new Field(new AddressValue(new Address(nftTransferDetailsObject.royaltyReceiver)), 'royalty_receiver'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.metadata)), 'attrs'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.transactionHash)), 'transaction_hash'),
        new Field(new BigUIntValue(nftTransferDetailsObject.tokenAmount), 'token_amount'),
        new Field(new BytesValue(Buffer.from(nftTransferDetailsObject.nftType)), 'nft_type'),
        new Field(new BigUIntValue(nftTransferDetailsObject.fee), 'fee')
    ]);

    const data = new BinaryCodec().encodeNested(claimDataArgs)

    const signedData = await signer.sign(Buffer.from(keccak256(data), "hex"));

    return { publicAddress: multiversXWallet.userWallet.address, signature: "0x"+signedData.toString("hex") }
}

export default getMultiversXSignedNftDetails