
interface INftTransferDetailsObject {
    tokenId: string;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddress: string;
    name: string;
    symbol: string;
    royalty: string;
    royaltyReceiver: string;
    metadata: string;
    transactionHash: string;
    tokenAmount: string;
    nftType: string;
    fee: string;
}


export { INftTransferDetailsObject }