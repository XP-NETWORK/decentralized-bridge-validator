import { IMultiversXContractConfig, INftContract } from "@src/types";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";



const getMultiversXNftContract = ({ gatewayURL, contractAddress }: IMultiversXContractConfig): INftContract => {


    const proxyNetworkProvider = new ProxyNetworkProvider(gatewayURL);

    return {
        name: async () => {
            const nftDetails = await proxyNetworkProvider.getDefinitionOfTokenCollection(contractAddress);
            return nftDetails.name
        },
        symbol: async () => {
            const nftDetails = await proxyNetworkProvider.getDefinitionOfTokenCollection(contractAddress);
            return nftDetails.ticker
        },
        royaltyInfo: async (tokenId: bigint) => {
            const nftDetails = await proxyNetworkProvider.getNonFungibleToken(contractAddress, Number(tokenId))
            const royalities = nftDetails.royalties;
            return String(royalities)
        },
        tokenURI: async (tokenId: bigint) => {
            const nftDetails = await proxyNetworkProvider.getNonFungibleToken(contractAddress, Number(tokenId))
            const tokenURI = nftDetails.attributes[1];
            return String(tokenURI)
        }
    }
}

export default getMultiversXNftContract;

