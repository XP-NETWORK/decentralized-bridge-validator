import { TChain } from '@src/types';
import { getStorageContract } from '@src/utils';
import { getNftDetails } from '../../../utils';
import { approveLock } from '../..';
import { INftTransferDetailsObject } from '../../types';
import { ISecretLockListener } from '../../../types';

const getSecretLockListenerHandler = ({
    config,
    secretChainConfig,
    wallets,
}: ISecretLockListener) => {
    const storageContract = getStorageContract({
        evmChainConfig: config.storageConfig,
        evmWallet: wallets.evmWallet,
    });

    const handleLog = async ({ log, hash }: { log: string; hash: string }) => {
        const {
            token_id: tokenId, // Unique ID for the NFT transfer
            destination_chain: destinationChain, // Chain to where the NFT is being transferred
            destination_user_address: destinationUserAddress, // User's address in the destination chain
            source_nft_contract_address: sourceNftContractAddress, // Address of the NFT contract in the source chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
        } = JSON.parse(log);

        console.log({
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
        });

        const destinationChainObject: TChain = config.bridgeChains.find(
            (chainConfig) => chainConfig.chain === destinationChain,
        );

        // if user gives a destination chain which is not registered with us, we early return
        if (!destinationChainObject) return;
        const transactionHash = hash; // Transaction hash of the transfer on the source chain

        const sourceChainObject = config.bridgeChains.find(
            (item) => item.chain === sourceChain,
        );

        if (sourceChainObject) {
            const fee = String(
                await storageContract.chainFee(destinationChain),
            ); // Required fee for claming nft on target chain
            const royaltyReceiver =
                await storageContract.chainRoyalty(destinationChain);

            const { royalty, name, symbol, metadata } = await getNftDetails({
                sourceNftContractAddress,
                sourceChain: sourceChainObject,
                tokenId,
                nftType,
            });

            const nftTransferDetailsObject: INftTransferDetailsObject = {
                tokenId,
                sourceChain,
                destinationChain,
                destinationUserAddress,
                sourceNftContractAddress,
                name,
                symbol,
                royalty,
                royaltyReceiver,
                metadata,
                transactionHash,
                tokenAmount,
                nftType,
                fee,
            };
            console.log({
                nftTransferDetailsObject,
            });

            await approveLock({
                nftTransferDetailsObject,
                wallets,
                storageContract,
                txChain: secretChainConfig.chain,
                destinationChainObject,
            });
        }
    };

    return handleLog;
};

export default getSecretLockListenerHandler;
