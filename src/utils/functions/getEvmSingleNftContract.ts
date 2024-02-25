import { ERC721Royalty__factory } from '../../contractsTypes';
import { IEvmContractConfig, INftContract } from '@src/types';
import { SalePriceToGetTotalRoyalityPercentage } from '../constants/salePriceToGetTotalRoyalityPercentage';
import { JsonRpcProvider, Signer } from 'ethers';

const getEvmSingleNftContract = (
    contractConfig: IEvmContractConfig,
    wallet?: Signer,
): INftContract => {
    const provider = new JsonRpcProvider(contractConfig.rpcURL);
    const erc721Contract = ERC721Royalty__factory.connect(
        contractConfig.contractAddress,
        provider,
    );
    return {
        name: async () => {
            return await erc721Contract.name();
        },
        symbol: async () => {
            return await erc721Contract.symbol();
        },
        royaltyInfo: async (tokenId) => {
            try {
                const [, royaltyAmount] = await erc721Contract.royaltyInfo(
                    tokenId!,
                    SalePriceToGetTotalRoyalityPercentage,
                );
                return String(royaltyAmount);
            } catch (error) {
                return '0';
            }
        },
        async approve(tokenId, to) {
            if (!wallet) throw new Error('Wallet is not connected');
            const contractWithSigner = erc721Contract.connect(wallet);
            const tx = await contractWithSigner.approve(to, tokenId);
            return tx.hash;
        },
        tokenURI: async (tokenId) => {
            return await erc721Contract.tokenURI(tokenId);
        },
    };
};

export default getEvmSingleNftContract;
