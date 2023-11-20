import { IChainConfig } from "@src/types";
import { getStorageContract } from "@src/utils";
import { IMultiversXLockListener } from "../types";
import { getLockEventDecodedLog } from ".";
import { getNftDetails } from "../../../utils";
import { approveLock } from "../..";
import { INftTransferDetailsObject } from "../../types";
import { IHandleLog } from "@src/modules/validator/utils/multiversXContractListener/components/types";

const getMultiversXLockListenerHandler = ({ config, multiversXChainConfig, wallets }: IMultiversXLockListener) => {


    const storageContract = getStorageContract({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet });

    const handleLog: IHandleLog = async ({ log }) => {

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

            await approveLock({ nftTransferDetailsObject, wallets, storageContract, txChain: multiversXChainConfig.chain, destinationChainObject })
        }
    }

    return handleLog

};

export default getMultiversXLockListenerHandler