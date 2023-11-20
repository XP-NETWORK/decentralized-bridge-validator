import { NftCollection } from "@src/contractsTypes/contracts/tonNftCollection";
import { NftItem } from "@src/contractsTypes/contracts/tonNftContract";
import { INftContract, ITonContractConfig } from "@src/types";
import { Address, TonClient } from "@ton/ton";
import axios from "axios";



const getTonNftContract = ({ rpcURL, contractAddress }: ITonContractConfig): INftContract => {


    const client = new TonClient({ endpoint: rpcURL });
    const nftItem = client.open(NftItem.fromAddress(Address.parseFriendly(contractAddress).address));

    const getCollectionMetaData = async () => {
        const nftData = await nftItem.getGetNftData()
        if (nftData.collection_address) {
            const nftCollection = client.open(NftCollection.fromAddress(nftData.collection_address))
            const { collection_content } = await nftCollection.getGetCollectionData()
            const collectionContentSlice = collection_content.asSlice()
            collectionContentSlice.loadUint(8)
            const metaDataURL = collectionContentSlice.loadStringRefTail()
            return metaDataURL
        }
        const individualContentSlice = nftData.individual_content.asSlice();
        individualContentSlice.loadUint(8);
        const metaDataURL = individualContentSlice.loadStringRefTail();
        return metaDataURL
    }

    return {
        name: async () => {

            const metaData = (await axios.get(await getCollectionMetaData())).data
            return metaData.name
        },
        symbol: async () => {
            return ""
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        royaltyInfo: async (tokenId: bigint) => {
            const nftData = await nftItem.getGetNftData();
            if (nftData.collection_address) {
                const nftCollection = client.open(NftCollection.fromAddress(nftData.collection_address))
                const royaltyParams = await nftCollection.getRoyaltyParams();
                const royaltyInNum = royaltyParams.numerator / royaltyParams.denominator
                const standardRoyalty = royaltyInNum * BigInt(10)
                return standardRoyalty.toString()
            }
            return "0"
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tokenURI: async (tokenId: bigint) => {
            const nftData = await nftItem.getGetNftData()
            const individualContentSlice = nftData.individual_content.asSlice();
            individualContentSlice.loadUint(8);
            const metaDataURL = individualContentSlice.loadStringRefTail();
            return metaDataURL
        }
    }
}

export default getTonNftContract;

