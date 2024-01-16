import { TChain } from '@src/types';
import { ILog } from '@src/modules/validator/utils/tezosContractListener/types';
import { getStorageContract } from '@src/utils';
import { ITezosLockListener } from '../../../types';
import { getNftDetails } from '../../../utils';
import { approveLock } from '../..';
import { INftTransferDetailsObject } from '../../types';

const extractStrOrAddr = (addr: { str: string } | { addr: string }): string => {
    if ('str' in addr) return addr.str;
    return addr.addr;
};

const getTezosLockListenerHandler = ({
    config,
    tezosChainConfig,
    wallets,
}: ITezosLockListener) => {
    const storageContract = getStorageContract({
        evmChainConfig: config.storageConfig,
        evmWallet: wallets.evmWallet,
    });

    const handleLog = async (log: ILog & { transaction_hash: string }) => {
        // Tezos returns the address as { addr: "0x123" } or { str: "0x123" } so we just extract the string value from the obj regardless of the key.
        const sourceNftContractAddress = extractStrOrAddr(
            log.source_nft_address,
        );
        // if its not the lock nft event we early return

        const {
            token_id: tokenId, // Unique ID for the NFT transfer
            dest_chain: destinationChain, // Chain to where the NFT is being transferred
            dest_address: destinationUserAddress, // User's address in the destination chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
            transaction_hash: transactionHash,
        } = log;

        const destinationChainObject: TChain = config.bridgeChains.find(
            (chainConfig) => chainConfig.chain === destinationChain,
        );

        // if user gives a destination chain which is not registered with us, we early return
        if (!destinationChainObject) return;

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

            await approveLock({
                nftTransferDetailsObject,
                wallets,
                storageContract,
                txChain: tezosChainConfig.chain,
                destinationChainObject,
            });
        }
    };

    return handleLog;
};

export default getTezosLockListenerHandler;
