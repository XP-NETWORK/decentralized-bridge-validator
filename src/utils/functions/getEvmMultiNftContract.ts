import { ethers } from 'ethers';
import { ERC1155Royalty, ERC1155Royalty__factory } from '../../contractsTypes';
import { IEvmContractConfigAndEvmWallet, INftContract } from '@src/types';
import { SalePriceToGetTotalRoyalityPercentage } from '../constants/salePriceToGetTotalRoyalityPercentage';

interface IExtendedERC1155Royalty extends ERC1155Royalty {
    name?: () => Promise<string>;
    symbol?: () => Promise<string>;
}

const getEvmMultiNftContract = ({
    contractConfig,
    evmWallet,
}: IEvmContractConfigAndEvmWallet): INftContract => {
    const opProvider = new ethers.JsonRpcProvider(contractConfig.rpcURL);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);
    const erc1155Contract: IExtendedERC1155Royalty =
        ERC1155Royalty__factory.connect(
            contractConfig.contractAddress,
            opWallet,
        );

    return {
        name: async () => {
            try {
                return await erc1155Contract.name();
            } catch (error) {
                console.error(
                    "The contract does not have a 'name' function.",
                );
                return '';
            }
        },
        symbol: async () => {
            try {
                return await erc1155Contract.symbol();
            } catch (error) {
                console.error(
                    "The contract does not have a 'symbol' function.",
                );
                return '';
            }
        },
        royaltyInfo: async (tokenId: bigint) => {
            try {
                const [, royaltyAmount] = await erc1155Contract.royaltyInfo(
                    tokenId,
                    SalePriceToGetTotalRoyalityPercentage,
                );
                return String(royaltyAmount);
            } catch (error) {
                return '0';
            }
        },
        tokenURI: async (tokenId: bigint) => {
            return await erc1155Contract.uri(tokenId);
        },
    };
};

export default getEvmMultiNftContract;
