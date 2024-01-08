import { ERC721Royalty__factory } from '../../contractsTypes';
import { IEvmContractConfig, INftContract } from '@src/types';
import { SalePriceToGetTotalRoyalityPercentage } from '../constants/salePriceToGetTotalRoyalityPercentage';
import { JsonRpcProvider, ethers } from 'ethers';
import { HederaNft__factory } from '@src/contractsTypes/factories/contracts/HederaNft__factory';

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
            const xpnft = HederaNft__factory.connect("0x61edf979e0997de99a543e1c0f556bfa65339985", provider);
            const packed = ethers.solidityPacked(
                ["uint160", "int96"],
                ["0x00000000000000000000000000000000006caf64", "1"]
            )
            const res: [string, bigint] = await xpnft.royaltyInfo.staticCall(packed, 10000);
            return (Number(res[1]) / 10000).toString()
        },
        tokenURI: async (tokenId: bigint) => {
            return await erc721Contract.tokenURI(tokenId);
        },
    };
};

export default getEvmSingleNftContract;
