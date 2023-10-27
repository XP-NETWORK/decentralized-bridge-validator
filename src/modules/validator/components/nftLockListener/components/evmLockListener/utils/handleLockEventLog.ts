import { IBridgeConfig, IChainConfig, IEvmChainConfig, IEvmWallet } from "@src/types";
import getLockEventDecodedLog from "./getLockEventDecodedLog";
import { LogEntry } from "@src/modules/validator/utils/evmContractListener/types";
import { getEvmBridgeContract, getStorageContract } from "@src/utils";
import { getNftDetails } from "./getNftDetails";
import { INftTransferDetailsObject } from "../types";
import { approveEvmDestinationLock } from "../components";

const handleLockEventLog = ({ config, evmChainConfig, evmWallet }: {  config: IBridgeConfig, evmChainConfig: IEvmChainConfig, evmWallet: IEvmWallet }) => {


    const bridgeContract = getEvmBridgeContract({ evmChainConfig, evmWallet });
    const storageContract = getStorageContract({ evmChainConfig: config.storageConfig, evmWallet });
    const { topicHash } = bridgeContract.interface.getEvent("Locked");

    const handleLog = async ({ log }: { log: LogEntry }) => {
        // if its not the lock nft event we early return
        if (typeof log === "string" || !log.topics.includes(topicHash)) return;

        const {
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
        } = getLockEventDecodedLog({ log })
        const destChain: IChainConfig = config.bridgeChains.find(chainConfig => chainConfig.chain === destinationChain);

        // if user gives a destination chain which is not registered with us, we early return
        if (!destChain.chain) return;

        const transactionHash = log.transactionHash; // Transaction hash of the transfer on the source chain
        const sourceChainRpcURL = config.bridgeChains.find(item => item.chain === sourceChain).rpcURL;

        const fee = String(await storageContract.chainFee(destinationChain)) // Required fee for claming nft on target chain

        const { royalty, royaltyReceiver, name, symbol, metadata } = await getNftDetails({
            sourceNftContractAddress, sourceChainRpcURL, evmWallet, tokenId, nftType
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


        if (destChain.chainType === "evm") {
            await approveEvmDestinationLock({ nftTransferDetailsObject, evmWallet, storageContract })
        }
    }

    return handleLog

};

export default handleLockEventLog