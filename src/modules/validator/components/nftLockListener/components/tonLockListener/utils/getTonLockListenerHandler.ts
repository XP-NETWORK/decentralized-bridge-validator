import { IChainConfig } from "@src/types";
import { getStorageContract } from "@src/utils";
import { getNftDetails } from "../../../utils";
import { approveLock } from "../..";
import { INftTransferDetailsObject } from "../../types";
import { Message } from "@ton/ton";
import { loadLockedEvent } from "@src/contractsTypes/contracts/tonBridge";
import { ITonLockListener } from "../../../types";

const getTonLockListenerHandler = ({ config, tonChainConfig, wallets }: ITonLockListener) => {


    const storageContract = getStorageContract({ evmChainConfig: config.storageConfig, evmWallet: wallets.evmWallet });

    const handleLog = async ({ log, hash }: { log: Message, hash: string }) => {
        console.log("------------------", log.body.asSlice().loadUint(32), hash)
        // if its not the lock nft event we early return
        if (log.body.asSlice().loadUint(32) !== 3571773646) {
            return
        }

        const {
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
        } = loadLockedEvent(log.body.asSlice());

        console.log({
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
        })

        const destinationChainObject: IChainConfig = config.bridgeChains.find(chainConfig => chainConfig.chain === destinationChain);

        // if user gives a destination chain which is not registered with us, we early return
        if (!destinationChainObject) return;
        const transactionHash = hash; // Transaction hash of the transfer on the source chain

        const sourceChainObject = config.bridgeChains.find(item => item.chain === sourceChain);

        if (sourceChainObject) {

            const fee = String(await storageContract.chainFee(destinationChain)) // Required fee for claming nft on target chain
            const royaltyReceiver = await storageContract.chainRoyalty(destinationChain);

            const getSourceNftContractAddress = () => {
                try {
                    return sourceNftContractAddress.asSlice().loadAddress().toString()
                } catch (e) {
                    return sourceNftContractAddress.asSlice().loadStringTail()
                }
            }

            const { royalty, name, symbol, metadata } = await getNftDetails({
                sourceNftContractAddress: getSourceNftContractAddress(),
                sourceChain: sourceChainObject,
                evmWallet: wallets.evmWallet,
                tokenId: tokenId.toString(),
                nftType,
                chainType: sourceChainObject.chainType
            })



            const nftTransferDetailsObject: INftTransferDetailsObject = {
                tokenId: tokenId.toString(),
                sourceChain,
                destinationChain,
                destinationUserAddress,
                sourceNftContractAddress: getSourceNftContractAddress(),
                name,
                symbol,
                royalty,
                royaltyReceiver,
                metadata,
                transactionHash,
                tokenAmount: tokenAmount.toString(),
                nftType,
                fee,
            };
            console.log({
                nftTransferDetailsObject
            })

            await approveLock({ nftTransferDetailsObject, wallets, storageContract, txChain: tonChainConfig.chain, destinationChainObject })
        }
    }

    return handleLog

};

export default getTonLockListenerHandler