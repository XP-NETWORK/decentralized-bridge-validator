import { ERC721Royalty__factory } from '../../contractsTypes';
import { IHederaContractConfig, INftContract } from '@src/types';
import { JsonRpcProvider, Signer } from 'ethers';
import { RoyaltyInfoProxy__factory } from '@src/contractsTypes/Hedera/RoyaltyInfoProxy__factory';

const getHederaSingleNftContract = (
    contractConfig: IHederaContractConfig,
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
                const contract = RoyaltyInfoProxy__factory.connect(
                    contractConfig.royaltyInfoProxyAddress,
                    provider,
                );
                const [result, nftInfo] = await contract.royaltyInfo.staticCall(
                    contractConfig.contractAddress,
                    tokenId ?? 1,
                );
                console.log(result);
                const numerator = nftInfo[0][7][0][0];
                const denominator = nftInfo[0][7][0][1];
                const denominatorNormalized = denominator / BigInt(10000);
                const numeratorNormalized = numerator * denominatorNormalized;
                return numeratorNormalized.toString();
            } catch (e) {
                console.log(e);
                return '0';
            }
        },
        async approve(tokenId, to) {
            if (!wallet) throw new Error('Wallet is not connected');
            const contractWithSigner = erc721Contract.connect(wallet);
            const tx = await contractWithSigner.approve(to, tokenId);
            return tx.hash;
        },
        tokenURI: async (tokenId: bigint) => {
            return await erc721Contract.tokenURI(tokenId);
        },
    };
};

export default getHederaSingleNftContract;
