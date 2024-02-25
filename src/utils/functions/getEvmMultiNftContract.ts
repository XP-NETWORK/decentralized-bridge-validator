import { ERC1155Royalty, ERC1155Royalty__factory } from '../../contractsTypes';
import { IEvmContractConfig, INftContract } from '@src/types';
import { SalePriceToGetTotalRoyalityPercentage } from '../constants/salePriceToGetTotalRoyalityPercentage';
import { JsonRpcProvider, Signer } from 'ethers';

type IExtendedERC1155Royalty = {
    name?: () => Promise<string>;
    symbol?: () => Promise<string>;
} & ERC1155Royalty;

const getEvmMultiNftContract = (
    contractConfig: IEvmContractConfig,
    wallet?: Signer,
): INftContract => {
    const provider = new JsonRpcProvider(contractConfig.rpcURL);

    const erc1155Contract: IExtendedERC1155Royalty =
        ERC1155Royalty__factory.connect(
            contractConfig.contractAddress,
            provider,
        );

    return {
        name: async () => {
            try {
                return erc1155Contract.name!();
            } catch (error) {
                console.error("The contract does not have a 'name' function.");
                return '';
            }
        },
        symbol: async () => {
            try {
                return await erc1155Contract.symbol!();
            } catch (error) {
                console.error(
                    "The contract does not have a 'symbol' function.",
                );
                return '';
            }
        },
        royaltyInfo: async (tokenId) => {
            try {
                const [, royaltyAmount] = await erc1155Contract.royaltyInfo(
                    tokenId!,
                    SalePriceToGetTotalRoyalityPercentage,
                );
                return String(royaltyAmount);
            } catch (error) {
                return '0';
            }
        },
        approve: async (_tokenId, to) => {
            if (!wallet) throw new Error('Wallet is not connected');
            const contractWithSigner = erc1155Contract.connect(wallet);
            const tx = await contractWithSigner.setApprovalForAll(to, true);
            return tx.hash;
        },
        tokenURI: async (tokenId: bigint) => {
            return await erc1155Contract.uri(tokenId);
        },
    };
};

export default getEvmMultiNftContract;
