import {
    getEvmMultiNftContract,
    getEvmSingleNftContract,
    getSecretMultiNftContract,
    getSecretSingleNftContract,
    getTezosNftContract,
    getTonNftContract,
    getHederaSingleNftContract,
} from '@src/utils';
import { IGetEvmNftDetails } from './types';
import { INftContract } from '@src/types';
import getMultiversXNftContract from '@src/utils/functions/getMultiversXNftContract';

const getNftDetails = async ({
    sourceNftContractAddress,
    sourceChain,
    tokenId,
    nftType,
}: IGetEvmNftDetails) => {
    let royalty = String(BigInt('0')); // set default royalty 0
    let metadata = ''; // set default matadata empty
    let name = ''; // set empty default name
    let symbol = ''; // set empty default symbol
    let nftContract: INftContract;

    if (sourceChain.chainType === 'evm') {
        if (nftType === 'singular') {
            nftContract = getEvmSingleNftContract({
                contractAddress: sourceNftContractAddress,
                rpcURL: sourceChain.rpcURL,
            });
        } else if (nftType === 'multiple') {
            nftContract = getEvmMultiNftContract({
                contractAddress: sourceNftContractAddress,
                rpcURL: sourceChain.rpcURL,
            });
        }
    } else if (sourceChain.chainType === 'hedera') {
        nftContract = getHederaSingleNftContract({
            contractAddress: sourceNftContractAddress,
            rpcURL: sourceChain.rpcURL,
            royaltyInfoProxyAddress: sourceChain.royaltyInfoProxyAddress,
        });
    } else if (sourceChain.chainType === 'multiversX') {
        nftContract = getMultiversXNftContract({
            gatewayURL: sourceChain.gatewayURL,
            contractAddress: sourceNftContractAddress,
        });
    } else if (sourceChain.chainType === 'ton') {
        nftContract = getTonNftContract({
            rpcURL: sourceChain.rpcURL,
            contractAddress: sourceNftContractAddress,
        });
    } else if (sourceChain.chainType === 'scrt') {
        if (nftType === 'singular') {
            nftContract = getSecretSingleNftContract({
                rpcURL: sourceChain.rpcURL,
                contractAddress: sourceNftContractAddress,
                chainId: sourceChain.chainId,
            });
        } else if (nftType === 'multiple') {
            nftContract = getSecretMultiNftContract({
                rpcURL: sourceChain.rpcURL,
                contractAddress: sourceNftContractAddress,
                chainId: sourceChain.chainId,
            });
        }
    } else if (sourceChain.chainType === 'tezos') {
        nftContract = getTezosNftContract({
            contractAddress: sourceNftContractAddress,
            rpcURL: sourceChain.rpcURL,
        });
    }

    name = await nftContract.name(); // name of NFT collection
    symbol = await nftContract.symbol(); // symbol of nft collection
    royalty = await nftContract.royaltyInfo(BigInt(tokenId)); // royality of nft collection
    metadata = await nftContract.tokenURI(BigInt(tokenId));

    return { royalty, name, symbol, metadata };
};

export default getNftDetails;
