import { IChainConfig } from "@src/types";
import { LogEntry } from "@src/modules/validator/utils/evmContractListener/types";
import { getEvmBridgeContract, getStorageContract } from "@src/utils";
import { getLockEventDecodedLog } from ".";
import { IEvmLockListener } from "../../../types";
import { getNftDetails } from "../../../utils";
import { approveLock } from "../..";
import { INftTransferDetailsObject } from "../../types";

const getEvmLockListenerHandler = ({ config, evmChainConfig, wallets }: IEvmLockListener) => {


    const bridgeContract = getEvmBridgeContract({ evmChainConfig, evmWallet: wallets.evmWallet });
    const storageContract = getStorageContract({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet });
    const { topicHash } = bridgeContract.interface.getEvent("Locked");

    const handleLog = async ({ log }: { log: LogEntry }) => {
        // if its not the lock nft event we early return
        if (typeof log === "string" || !log.topics || !log.topics.includes(topicHash)) return;

        const {
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
        } = getLockEventDecodedLog({ log });

        const destinationChainObject: IChainConfig = config.bridgeChains.find(chainConfig => chainConfig.chain === destinationChain);

        // if user gives a destination chain which is not registered with us, we early return
        if (!destinationChainObject) return;
        const transactionHash = log.transactionHash; // Transaction hash of the transfer on the source chain

        const sourceChainObject = config.bridgeChains.find(item => item.chain === sourceChain);

        if (sourceChainObject) {

            const fee = String(await storageContract.chainFee(destinationChain)) // Required fee for claming nft on target chain
            const royaltyReceiver = await storageContract.chainRoyalty(destinationChainObject.chainType);
            
            const { royalty, name, symbol, metadata } = await getNftDetails({
                sourceNftContractAddress,
                sourceChain: sourceChainObject,
                evmWallet: wallets.evmWallet,
                tokenId,
                nftType,
                chainType: sourceChainObject.chainType
            })

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

            await approveLock({ nftTransferDetailsObject, wallets, storageContract, txChain: evmChainConfig.chain, destinationChainObject })
        }
    }

    return handleLog

};

export default getEvmLockListenerHandler