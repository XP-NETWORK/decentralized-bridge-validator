import { ethers } from "ethers";
import { ERC721Royalty__factory } from "../../contractsTypes";
import { IEvmContractConfigAndEvmWallet, INftContract } from "@src/types";
import { salePriceToGetTotalRoyalityPercentage } from "../constants/salePriceToGetTotalRoyalityPercentage";


const getEvmSingleNftContract = ({ contractConfig, evmWallet }: IEvmContractConfigAndEvmWallet): INftContract => {
    const provider = new ethers.JsonRpcProvider(contractConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    const erc721Contract = ERC721Royalty__factory.connect(contractConfig.contractAddress, wallet);
    return {
        name: async () => {
            return await erc721Contract.name()
        },
        symbol: async () => {
            return await erc721Contract.symbol()
        },
        royaltyInfo: async (tokenId: bigint) => {
            try {
                const [, royaltyAmount] = await erc721Contract.royaltyInfo(tokenId, salePriceToGetTotalRoyalityPercentage);
                return String(royaltyAmount)
            } catch (error) {
                return "0"
            }
        },
        tokenURI: async (tokenId: bigint) => {
            return await erc721Contract.tokenURI(tokenId)
        }
    }
}

export default getEvmSingleNftContract