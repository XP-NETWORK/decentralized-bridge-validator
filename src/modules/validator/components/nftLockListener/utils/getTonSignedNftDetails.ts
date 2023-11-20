import { INftTransferDetailsObject } from "../components/types";
import { ITonWallet } from "@src/types";
import { ClaimData, storeClaimData } from "@src/contractsTypes/contracts/tonBridge";
import { Address, beginCell } from "@ton/core";
import { sign } from "@ton/crypto";

const getTonSignedNftDetails = ({ nftTransferDetailsObject, tonWallet }: { nftTransferDetailsObject: INftTransferDetailsObject, tonWallet: ITonWallet }) => {
    const secretKey = Buffer.from(tonWallet.secretKey, "hex");
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
        fee
    } = nftTransferDetailsObject;

    const claimData: ClaimData = {
        $$type: "ClaimData",
        tokenId: BigInt(tokenId),
        sourceChain,
        destinationChain,
        destinationUserAddress: Address.parseFriendly(destinationUserAddress).address,
        sourceNftContractAddress,
        name,
        symbol,
        royalty: BigInt(royalty) / BigInt(10), // Ton standard royalty 100 percent => 1_000, where as rest of chains have 10_000
        royaltyReceiver: Address.parseFriendly(royaltyReceiver).address,
        metadata,
        transactionHash,
        tokenAmount: BigInt(tokenAmount),
        nftType,
        fee: BigInt(fee),
    }
    const tonSignature = sign(beginCell().store(storeClaimData(claimData)).endCell().hash(), secretKey).toString("hex");


    return { publicAddress: tonWallet.publicKey, signature: tonSignature }
}

export default getTonSignedNftDetails