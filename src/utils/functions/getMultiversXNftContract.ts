import { IMultiversXContractConfig, INftContract } from '@src/types';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/';
import { Nonce } from '@multiversx/sdk-network-providers/out/primitives';
import axios from 'axios';

const getMultiversXNftContract = ({
    gatewayURL,
    contractAddress,
}: IMultiversXContractConfig): INftContract => {
    const proxyNetworkProvider = new ProxyNetworkProvider(gatewayURL);

    const getNonFungibleToken = async (
        collection: string,
        nonce: number,
    ): Promise<{ royalties: number; metaData: string }> => {
        const nonceAsHex = new Nonce(nonce).hex();
        const response = (
            await axios.get(
                `${gatewayURL.replace('gateway', 'api')}/nfts/${collection}-${nonceAsHex}`,
            )
        ).data;
        return {
            metaData: atob(response.uris[1]),
            royalties: response.royalties,
        };
    };
    return {
        name: async () => {
            const nftDetails =
                await proxyNetworkProvider.getDefinitionOfTokenCollection(
                    contractAddress,
                );
            return nftDetails.name;
        },
        symbol: async () => {
            const nftDetails =
                await proxyNetworkProvider.getDefinitionOfTokenCollection(
                    contractAddress,
                );
            return nftDetails.ticker;
        },
        approve: async () => {
            throw new Error('Not implemented');
        },
        royaltyInfo: async (tokenId) => {
            try {
                const nftDetails = await getNonFungibleToken(
                    contractAddress,
                    Number(tokenId),
                );
                const royalities = nftDetails.royalties;
                if (royalities) {
                    const royalities_ = royalities * 100;
                    return String(royalities_);
                } else {
                    return String(0);
                }
            } catch (_) {
                return String(0);
            }
        },
        tokenURI: async (tokenId: bigint) => {
            const nftDetails = await getNonFungibleToken(
                contractAddress,
                Number(tokenId),
            );
            return nftDetails.metaData;
        },
    };
};

export default getMultiversXNftContract;
