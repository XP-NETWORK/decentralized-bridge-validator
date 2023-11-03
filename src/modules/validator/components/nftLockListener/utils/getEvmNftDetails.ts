import { getEvmMultiNftContract, getEvmSingleNftContract } from "@src/utils";
import { IGetEvmNftDetails } from "./types";

const getEvmNftDetails = async ({ sourceNftContractAddress, sourceChainRpcURL, evmWallet, tokenId, nftType }: IGetEvmNftDetails) => {

    const salePriceToGetTotalRoyalityPercentage = 10000;

    let royalty = String(BigInt("0")); // set default royalty 0
    let royaltyReceiver = "0x0000000000000000000000000000000000000000"; // set default reciever none
    let metadata = ""; // set default matadata empty
    let name = "" // set empty default name
    let symbol = "" // set empty default symbol

    const evmSingleNftContract = getEvmSingleNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChainRpcURL }, evmWallet })
    const evmMultiNftContract = getEvmMultiNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChainRpcURL }, evmWallet })

    try {
        name = await evmSingleNftContract.name(); // name of NFT collection
    } catch (e) {
        console.info("Name not found")
    }

    try {
        symbol = await evmSingleNftContract.symbol(); // symbol of nft collection
    } catch (e) {
        console.info("symbol not found")
    }

    try {
        [royaltyReceiver, royalty] = (await evmSingleNftContract.royaltyInfo(tokenId, BigInt(salePriceToGetTotalRoyalityPercentage))).map(String); // royality of nft collection
    } catch (e) {
        console.info("Royalty not found")
    }



    // This is the only function thats different for singular and multi nft contracts in evm

    if (nftType === "multiple") {
        try {
            metadata = await evmMultiNftContract.uri(tokenId);
        } catch (e) {
            console.info("Meta data not found");
        }
    } else {
        try {
            metadata = await evmSingleNftContract.tokenURI(tokenId);
        } catch (e) {
            console.info("Meta data not found");
        }
    }



    return { royalty, royaltyReceiver, name, symbol, metadata }

}

export default getEvmNftDetails