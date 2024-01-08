import { INftTransferDetailsObject } from "../components/types";
import { ITezosWallet } from "@src/types";
import { packDataBytes, MichelsonType } from "@taquito/michel-codec";
import { InMemorySigner } from "@taquito/signer";
import { Schema } from "@taquito/michelson-encoder";
import { validateAddress } from '@taquito/utils';
import { keccak256 } from "ethers";


const getTezosSignedNftDetails = async ({ nftTransferDetailsObject, tezosWallet }: { nftTransferDetailsObject: INftTransferDetailsObject, tezosWallet: ITezosWallet }) => {

    // Mitigation if destination user address is invalid
    if (validateAddress(nftTransferDetailsObject.destinationUserAddress) !== 3) {
        nftTransferDetailsObject.destinationUserAddress = nftTransferDetailsObject.royaltyReceiver
        console.log("Invalid Tezos destination address", nftTransferDetailsObject.destinationUserAddress)
    }

    const nftTransferDetailsTypes = {
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
    const isTezosAddr = validateAddress(nftTransferDetailsObject.sourceNftContractAddress) === 3;

    const sourceNftContractAddress = isTezosAddr ? {
        addr: nftTransferDetailsObject.sourceNftContractAddress
    } : {
        str: nftTransferDetailsObject.sourceNftContractAddress
    }


    const signer = await InMemorySigner.fromSecretKey(tezosWallet.secretKey);
    const schema = new Schema(nftTransferDetailsTypes);
    const encoded = schema.Encode({
        token_id: nftTransferDetailsObject.tokenId,
        source_chain: nftTransferDetailsObject.sourceChain,
        dest_chain: nftTransferDetailsObject.destinationChain,
        dest_address: nftTransferDetailsObject.destinationUserAddress,
        source_nft_contract_address: sourceNftContractAddress,
        name: nftTransferDetailsObject.name,
        symbol: nftTransferDetailsObject.symbol,
        royalty: nftTransferDetailsObject.royalty,
        royalty_receiver: nftTransferDetailsObject.royaltyReceiver,
        metadata: nftTransferDetailsObject.metadata,
        transaction_hash: nftTransferDetailsObject.transactionHash,
        token_amount: nftTransferDetailsObject.tokenAmount,
        nft_type: nftTransferDetailsObject.nftType,
        fee: nftTransferDetailsObject.fee,
    });

    const packedData = packDataBytes(encoded, nftTransferDetailsTypes);
    const packeyBytes = packedData.bytes;
    const hashedBytes = keccak256(Buffer.from(packeyBytes, "hex"))
    const signature = "0x" + Buffer.from((await signer.sign(hashedBytes)).sig).toString("hex");

    return { publicAddress: tezosWallet.publicKey, signature }
}

export default getTezosSignedNftDetails