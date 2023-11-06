import { getEvmMultiNftContract, getEvmSingleNftContract } from "@src/utils";
import { IGetEvmNftDetails } from "./types";
import { INftContract } from "@src/types";
import getMultiversXNftContract from "@src/utils/functions/getMultiversXNftContract";

const getNftDetails = async ({ sourceNftContractAddress, sourceChain, evmWallet, tokenId, nftType }: IGetEvmNftDetails) => {

    let royalty = String(BigInt("0")); // set default royalty 0
    const royaltyReceiver = "0x0000000000000000000000000000000000000000"; // set default reciever none
    let metadata = ""; // set default matadata empty
    let name = "" // set empty default name
    let symbol = "" // set empty default symbol
    let nftContract: INftContract;

    if (sourceChain.chainType === "evm") {
        if (nftType === "singular") {
            nftContract = getEvmSingleNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChain.rpcURL }, evmWallet })
        } else if (nftType === "multiple") {
            nftContract = getEvmMultiNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChain.rpcURL }, evmWallet })
        }
    } else if (sourceChain.chainType === "multiversX") {
        nftContract = getMultiversXNftContract({ gatewayURL: sourceChain.gatewayURL, contractAddress: sourceNftContractAddress })
    }


    name = await nftContract.name(); // name of NFT collection
    symbol = await nftContract.symbol(); // symbol of nft collection
    royalty = await nftContract.royaltyInfo(BigInt(tokenId)); // royality of nft collection
    metadata = await nftContract.tokenURI(BigInt(tokenId));

    return { royalty, royaltyReceiver, name, symbol, metadata }

}

export default getNftDetails