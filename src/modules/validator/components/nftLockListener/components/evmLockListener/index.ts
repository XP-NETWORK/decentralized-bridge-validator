import Web3 from "web3";
import { LogEntry } from "../../../../utils/evmContractListener/types";
import { bridgeContractAbi } from "../../../../../../abi";
import { createJobWithWorker, evmContractListener } from '../../../../utils';
import { IConfigAndWallets } from "../../../../types";
import { getEvmMultiNftContract, getStorageContract, getEvmSingleNftContract } from "../../../../../../utils";
import { IEvmChainConfigAndEvmWallet } from "../../../../../../utils/types";
import { NftTransferDetailsStruct } from "../../../../../../contractsTypes/contracts/BridgeStorage";
import { getEvmBridgeContract } from "../../../../../../utils/functions";

const evmLockListener = async (configAndWallets: IConfigAndWallets) => {

    const jobFunction = async (data: IEvmChainConfigAndEvmWallet) => {
        const { evmChainConfig, evmWallet } = data
        const contractAddress = evmChainConfig.contractAddress;
        const rpcUrl = evmChainConfig.rpc;
        const lastBlock_ = evmChainConfig.lastBlock;
        const chain = evmChainConfig.chain;
        const bridgeContract = getEvmBridgeContract({ evmChainConfig, evmWallet });
        const { topicHash } = bridgeContract.interface.getEvent("Locked");
        const salePriceToGetTotalRoyalityPercentage = 10000; 
        const web3 = new Web3(evmChainConfig.rpc);

        const lockEventAbi = bridgeContractAbi.find(abi => abi.name === "Locked" && abi.type === "event");

        const storageContract = getStorageContract({ evmChainConfig: configAndWallets.config.optimismChain, evmWallet });

        const handleLog = async ({ log }: { log: LogEntry; }) => {

            if (typeof log !== "string" && log.topics.includes(topicHash)) {
                const topicToIgnore = 1;
                const decodedLog = web3.eth.abi.decodeLog(
                    lockEventAbi.inputs,
                    log.data,
                    log.topics.slice(topicToIgnore)
                );

                const tokenId = String(decodedLog.tokenId); // Unique ID for the NFT transfer
                const destinationChain = String(decodedLog.destinationChain); // Chain to where the NFT is being transferred
                const destinationUserAddress = String(decodedLog.destinationUserAddress); // User's address in the destination chain
                const sourceNftContractAddress = String(decodedLog.sourceNftContractAddress); // Address of the NFT contract in the source chain
                const tokenAmount = String(decodedLog.tokenAmount);
                const nftType = String(decodedLog.nftType);
                const sourceChain = String(decodedLog.sourceChain); // Source chain of NFT

                const sourceChainRpcURL = configAndWallets.config.bridgeChains.find(item => item.chain === sourceChain).rpc;

                const evmSingleNftContract = getEvmSingleNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChainRpcURL }, evmWallet })
                const evmMultiNftContract = getEvmMultiNftContract({ contractConfig: { contractAddress: sourceNftContractAddress, rpcURL: sourceChainRpcURL }, evmWallet })

                const name = await evmSingleNftContract.name(); // name of NFT collection
                const symbol = await evmSingleNftContract.symbol(); // symbol of nft collection

                let royalty : bigint | string = BigInt("0");
                let royaltyReceiver = "0x000000000";

                let metadata = "";

                if (nftType === "multiple") {
                    try {
                        [royaltyReceiver, royalty] = await evmMultiNftContract.royaltyInfo(tokenId, BigInt(salePriceToGetTotalRoyalityPercentage)); // royality of nft collection
                        royalty = String(royalty);
                    } catch (e) {
                        console.log("Royalty not found")
                    }
                    metadata = await evmMultiNftContract.uri(tokenId);
                } else {
                    try {
                        [royaltyReceiver, royalty] = await evmSingleNftContract.royaltyInfo(tokenId, BigInt(salePriceToGetTotalRoyalityPercentage)); // royality of nft collection
                        royalty = String(royalty);
                    } catch (e) {
                        console.log("Royalty not found")
                    }
                    metadata = await evmSingleNftContract.tokenURI(tokenId); // Metadata related to the NFT being transferred
                }

                const transactionHash = log.transactionHash; // Transaction hash of the transfer on the source chain
                const fee = String(await storageContract.chainFee(evmChainConfig.chain)) // Required fee for claming nft on target chain

                const nftTransferDetailsStruct_: NftTransferDetailsStruct = {
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
                }
                   
                const nftTransferDetails = Object.values(nftTransferDetailsStruct_);

                const nftTransferDetailsTypes = [
                    "uint256",
                    "string",
                    "string",
                    "address",
                    "address",
                    "string",
                    "string",
                    "uint256",
                    "address",
                    "string",
                    "string",
                    "uint256",
                    "string",
                    "uint256",

                ]
                console.log(nftTransferDetails)



                const signedNftTransferDetails = web3.eth.accounts
                    .privateKeyToAccount( evmWallet.privateKey)
                    .sign(web3.utils.keccak256(
                        web3.eth.abi.encodeParameters(
                            nftTransferDetailsTypes,
                            nftTransferDetails
                        )));


                try {
                    console.log({nftTransferDetailsStruct_, sig: signedNftTransferDetails.signature});
                    
                    const tx = await storageContract.approveLockNft(nftTransferDetailsStruct_, signedNftTransferDetails.signature);
                    console.log(`Lock Approved Transaction Hash: ${tx.hash}`);

                } catch (e) {
                    if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
                        throw ("Error while processing log")
                    }
                }
            }
        };

        try {
            await evmContractListener({ contractAddress, rpcUrl, lastBlock_, chain, handleLog });
        } catch (e) {
            console.error("Error Staking listner", e)
        }
    }

    for (const chainConfig of configAndWallets.config.bridgeChains) {
        if (chainConfig.chainType === "evm") {
            const jobData: IEvmChainConfigAndEvmWallet = { evmChainConfig: chainConfig, evmWallet: configAndWallets.wallets.evmWallet }
            const jobName: string = `evmLockedEventListener_${chainConfig.chain}`
            await createJobWithWorker<IEvmChainConfigAndEvmWallet>({ jobData, jobName, jobFunction })
        }
    }
}


export default evmLockListener;
