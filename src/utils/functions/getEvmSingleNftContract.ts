import { ERC721Royalty__factory } from '../../contractsTypes';
import { IEvmContractConfig, INftContract } from '@src/types';
import { SalePriceToGetTotalRoyalityPercentage } from '../constants/salePriceToGetTotalRoyalityPercentage';
import { JsonRpcProvider } from 'ethers';

const getEvmSingleNftContract = (contractConfig: IEvmContractConfig): INftContract => {
    const provider = new JsonRpcProvider(contractConfig.rpcURL)
    const erc721Contract = ERC721Royalty__factory.connect(
        contractConfig.contractAddress,
        provider
    );
    return {
        name: async () => {
            return await erc721Contract.name();
        },
        symbol: async () => {
            return await erc721Contract.symbol();
        },
        royaltyInfo: async (tokenId: bigint) => {
            try {
                const [, royaltyAmount] = await erc721Contract.royaltyInfo(
                    tokenId,
                    SalePriceToGetTotalRoyalityPercentage,
                );
                return String(royaltyAmount);
            } catch (error) {
                return '0';
            }
        },
        tokenURI: async (tokenId: bigint) => {
            return await erc721Contract.tokenURI(tokenId);
        },
    };
};

export default getEvmSingleNftContract;
