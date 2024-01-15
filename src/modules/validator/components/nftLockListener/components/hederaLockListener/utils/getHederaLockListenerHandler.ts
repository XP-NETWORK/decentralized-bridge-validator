import { TChain } from "@src/types";
import { LogEntry } from "@src/modules/validator/utils/evmContractListener/types";
import {  getStorageContract } from "@src/utils";
import {  IHederaLockListener } from "../../../types";
import { getNftDetails } from "../../../utils";
import { approveLock } from "../..";
import { INftTransferDetailsObject } from "../../types";
import {getHederaBridgeContract} from "@src/utils/functions/getHederaBridgeContract";
import { getLockEventDecodedLog } from "../../evmLockListener/utils";

const getHederaLockListenerHandler = ({
    config,
    hederaChainConfig,
    wallets,
}: IHederaLockListener) => {
    const bridgeContract = getHederaBridgeContract({
        hederaChainConfig,
        evmWallet: wallets.evmWallet,
    });
    const storageContract = getStorageContract({
        evmChainConfig: config.storageConfig,
        evmWallet: wallets.evmWallet,
    });
    const { topicHash } = bridgeContract.interface.getEvent('Locked');

    const handleLog = async ({ log }: { log: LogEntry }) => {
        // if its not the lock nft event we early return
        if (
            typeof log === 'string' ||
            !log.topics ||
            !log.topics.includes(topicHash)
        )
            return;

        const {
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
        } = getLockEventDecodedLog({ log });

        const destinationChainObject: TChain = config.bridgeChains.find(
            (chainConfig) => chainConfig.chain === destinationChain,
        );

        // if user gives a destination chain which is not registered with us, we early return
        if (!destinationChainObject) return;

        const transactionHash = log.transactionHash; // Transaction hash of the transfer on the source chain

        const sourceChainObject = config.bridgeChains.find(
            (item) => item.chain === sourceChain,
        );
        console.log(sourceChainObject, `sco`);
        if (sourceChainObject) {
            const fee = String(
                await storageContract.chainFee(destinationChain),
            ); // Required fee for claming nft on target chain
            const royaltyReceiver = await storageContract.chainRoyalty(
                destinationChain,
            );

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
                txChain: hederaChainConfig.chain,
                destinationChainObject,
            });
        }
    };

    return handleLog;
};

export { getHederaLockListenerHandler }
