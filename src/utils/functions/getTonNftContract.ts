import { NftCollection } from '@src/contractsTypes/contracts/tonNftCollection';
import { NftItem } from '@src/contractsTypes/contracts/tonNftContract';
import { INftContract, ITonContractConfig } from '@src/types';
import { Address, TonClient } from '@ton/ton';
import axios from 'axios';

const getTonNftContract = ({
    rpcURL,
    contractAddress,
}: ITonContractConfig): INftContract => {
    const client = new TonClient({
        endpoint: rpcURL,
        apiKey: 'f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292',
    });
    const nftItem = client.open(
        NftItem.fromAddress(Address.parseFriendly(contractAddress).address),
    );

    const getCollectionMetaData = async () => {
        const nftData = await nftItem.getGetNftData();
        if (nftData.collection_address) {
            const nftCollection = client.open(
                NftCollection.fromAddress(nftData.collection_address),
            );
            const { collection_content } =
                await nftCollection.getGetCollectionData();
            const collectionContentSlice = collection_content.asSlice();
            collectionContentSlice.loadUint(8);
            const metaDataURL = collectionContentSlice.loadStringTail();
            console.log({ metaDataURL });
            return metaDataURL;
        }
        const individualContentSlice = nftData.individual_content.asSlice();
        individualContentSlice.loadBits(8);
        const metaDataURL = individualContentSlice.loadStringTail();
        console.log({ metaDataURL });
        return metaDataURL;
    };

    return {
        name: async () => {
            try {
                const metaData = (
                    await axios.get(await getCollectionMetaData())
                ).data;
                return metaData.name || '';
            } catch (e) {
                return '';
            }
        },
        symbol: async () => {
            return '';
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        royaltyInfo: async (tokenId: bigint) => {
            try {
                const nftData = await nftItem.getGetNftData();
                if (nftData.collection_address) {
                    const nftCollection = client.open(
                        NftCollection.fromAddress(nftData.collection_address),
                    );
                    const royaltyParams =
                        await nftCollection.getRoyaltyParams();
                    const royaltyInNum =
                        royaltyParams.numerator / royaltyParams.denominator;
                    const standardRoyalty = royaltyInNum * BigInt(10);
                    return standardRoyalty.toString();
                }
                return '0';
            } catch (e) {
                return '0';
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tokenURI: async (tokenId: bigint) => {
            try {
                const nftData = await nftItem.getGetNftData();
                const individualContentSlice =
                    nftData.individual_content.asSlice();
                individualContentSlice.loadBits(8);
                const metaDataURL = individualContentSlice.loadStringTail();
                return metaDataURL;
            } catch (e) {
                return '';
            }
        },
    };
};

export default getTonNftContract;
