import { INftTransferDetailsObject } from "../components/types";
import { ITonWallet } from "@src/types";
import { ClaimData, storeClaimData } from "@src/contractsTypes/contracts/tonBridge";
import { Address, beginCell } from "@ton/ton";
import { sign } from "ton-crypto";
import { SalePriceToGetTotalRoyalityPercentage } from "@src/utils/constants/salePriceToGetTotalRoyalityPercentage";

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

    // Mitigation if destination user address is invalid
    let destinationAddress: Address;
    try {
        destinationAddress = Address.parseFriendly(destinationUserAddress).address;
    } catch (e) {
        destinationAddress = Address.parseFriendly(royaltyReceiver).address;
    }

    // off chain condition to store sourceNftContractAddress as string if not native, and address if native
    let sourceNftContractAddress_ = beginCell().storeSlice(beginCell().storeStringTail(sourceNftContractAddress).endCell().asSlice()).endCell()
    try {
        sourceNftContractAddress_ = beginCell().storeSlice(beginCell().storeAddress(Address.parseFriendly(sourceNftContractAddress).address).endCell().asSlice()).endCell()
    } catch (e) {
        console.log("Not Native TON Address")
    }
    const claimData: ClaimData = {
        $$type: "ClaimData",
        data1: {
            $$type: "ClaimData1",
            tokenId: BigInt(tokenId),
            destinationChain,
            destinationUserAddress: destinationAddress,
            sourceChain,
            tokenAmount: BigInt(tokenAmount)
        },
        data2: {
            $$type: "ClaimData2",
            name,
            nftType,
            symbol
        },
        data3: {
            $$type: "ClaimData3",
            fee: BigInt(fee),
            metadata,
            royaltyReceiver: Address.parseFriendly(royaltyReceiver).address,
            sourceNftContractAddress: sourceNftContractAddress_
        },
        data4: {
            $$type: "ClaimData4",
            newContent: beginCell().storeInt(0x01, 8).storeStringRefTail(metadata).endCell(),
            royalty: {
                $$type: "RoyaltyParams",
                numerator: BigInt(SalePriceToGetTotalRoyalityPercentage),
                denominator: BigInt(royalty),
                destination: Address.parseFriendly(royaltyReceiver).address,
            },
            transactionHash
        }
    }
    const tonSignature = "0x" + sign(beginCell().store(storeClaimData(claimData)).endCell().hash(), secretKey).toString("hex");


    return { publicAddress: tonWallet.publicKey, signature: tonSignature }
}

export default getTonSignedNftDetails