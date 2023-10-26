import { getEvmMultiNftContract, getEvmSingleNftContract } from "../../../../../../../utils";
import { IGetNftDetails } from "./types";

const getNftDetails = async ({ sourceNftContractAddress, sourceChainRpcURL, evmWallet, tokenId, nftType }: IGetNftDetails) => {

    const salePriceToGetTotalRoyalityPercentage = 10000;

    let royalty: string = String(BigInt("0")); // set default royalty 0
    let royaltyReceiver = "0x0000000000000000000000000000000000000000"; // set default reciever none
    let metadata = ""; // set default matadata empty
    let name = "" // set empty default name
    let symbol = "" // set empty default symbol

    const evmSingleNftContract = getEvmSingleNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChainRpcURL }, evmWallet })
    const evmMultiNftContract = getEvmMultiNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChainRpcURL }, evmWallet })

    try {
        symbol = await evmSingleNftContract.symbol(); // symbol of nft collection
        name = await evmSingleNftContract.name(); // name of NFT collection
    } catch (e) {
        console.info("Name or symbol not found")
    }


    // Try to get royality if exists
    if (nftType === "multiple") {
        try {
            [royaltyReceiver, royalty] = (await evmMultiNftContract.royaltyInfo(tokenId, BigInt(salePriceToGetTotalRoyalityPercentage))).map(String); // royality of nft collection
        } catch (e) {
            console.info("Royalty not found")
        }
        metadata = await evmMultiNftContract.uri(tokenId);
    } else {
        try {
            [royaltyReceiver, royalty] = (await evmSingleNftContract.royaltyInfo(tokenId, BigInt(salePriceToGetTotalRoyalityPercentage))).map(String); // royality of nft collection
        } catch (e) {
            console.info("Royalty not found")
        }
        metadata = await evmSingleNftContract.tokenURI(tokenId); // Metadata related to the NFT being transferred
    }


    return { royalty, royaltyReceiver, name, symbol, metadata }

}

export { getNftDetails }