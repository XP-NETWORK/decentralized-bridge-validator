import { NFTContractType } from "@src/contractsTypes/tezosContractTypes/NFT.types";
import { tas } from "@src/contractsTypes/tezosContractTypes/type-aliases";
import { INftContract } from "@src/types";
import { TezosToolkit } from "@taquito/taquito";
import { Tzip16Module, tzip16 } from "@taquito/tzip16";


const URLCanParse = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

const getTezosNftContract = ({ rpcURL, contractAddress }): INftContract => {

    const getNftTokenMetaData = async (tokenId: bigint) => {
        const Tezos = new TezosToolkit(rpcURL);
        const nftContract = await Tezos.contract.at<NFTContractType>(contractAddress);
        const tokenMetaData = await (
            await nftContract.storage()
        ).token_metadata.get(tas.nat(tokenId.toString()));
        const metaData = tokenMetaData.token_info.keys().next();
        return metaData.value;

    }

    return {
        name: async () => {
            try {
                const Tezos = new TezosToolkit(rpcURL);
                Tezos.addExtension(new Tzip16Module());
                const nftContract = await Tezos.contract.at(contractAddress, tzip16);
                const md = nftContract.tzip16()
                return (await md.metadataName()) ?? "";
            } catch (e) {
                console.log("error getting name Tezos", e)
                return ""
            }
        },
        symbol: async (tokenId: bigint) => {
            try {
                const metaDataOrURL = await getNftTokenMetaData(tokenId);
                const isUrl = URLCanParse(metaDataOrURL);
                if (isUrl) {
                    const metaData: { symbol?: string } = await fetch(metaDataOrURL).then((res) => res.json());
                    return metaData.symbol;
                }
                return JSON.parse(metaDataOrURL)["symbol"];
            } catch (e) {
                console.log("error getting symbol Tezos", e)
                return ""
            }
        },
        royaltyInfo: async (tokenId?: bigint) => {
            try {
                const metaDataOrURL = await getNftTokenMetaData(tokenId);
                const isUrl = URLCanParse(metaDataOrURL);
                let metaData: {
                    royalties: {
                        decimals: number,
                        shares: {
                            [key: string]: number
                        }
                    }
                };

                if (isUrl) {
                    metaData = await fetch(metaDataOrURL).then((res) => res.json());
                }

                metaData = JSON.parse(metaDataOrURL)
                const decimal_places_in_rates = metaData.royalties.decimals
                const max_percentage = Number('1' + '0'.repeat(decimal_places_in_rates))
                const rate = Object.values(metaData.royalties.shares)[0]
                const royalty = rate / max_percentage * 10000
                return String(royalty)

            } catch (e) {
                console.log("Error getting royalty Tezos", e)
                return "0"
            }
        },
        tokenURI: async (tokenId: bigint) => {
            try {
                const metaDataOrURL = await getNftTokenMetaData(tokenId);
                console.log({ metaDataOrURL })
                return URLCanParse(metaDataOrURL) ? metaDataOrURL : JSON.parse(metaDataOrURL)["image"];
            } catch (e) {
                console.log("Error getting tokenURI Tezos", e)
                return ""
            }
        },
    }
}

export default getTezosNftContract;

