import Web3 from "web3";
import { evmBridgeABI } from "../../../../../../../abi";
import { LogObject } from "../../../../../utils/evmContractListener/types";

const getLockEventDecodedLog = ({ log }: { log: LogObject }) => {

    const web3 = new Web3();  // Not connected to any node
    const lockEventAbi = evmBridgeABI.find(abi => abi.name === "Locked" && abi.type === "event");

    const decodedLog = web3.eth.abi.decodeLog(
        lockEventAbi.inputs,
        log.data,
        [...log.topics.slice(1)]
    );

    const [
        tokenId, // Unique ID for the NFT transfer
        destinationChain, // Chain to where the NFT is being transferred
        destinationUserAddress, // User's address in the destination chain
        sourceNftContractAddress, // Address of the NFT contract in the source chain
        tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
        nftType, // Sigular or multiple ( 721 / 1155)
        sourceChain, // Source chain of NFT
    ] = [
        decodedLog.tokenId,
        decodedLog.destinationChain,
        decodedLog.destinationUserAddress,
        decodedLog.sourceNftContractAddress,
        decodedLog.tokenAmount,
        decodedLog.nftType,
        decodedLog.sourceChain
    ].map(String);

    return {
        tokenId,
        destinationChain,
        destinationUserAddress,
        sourceNftContractAddress,
        tokenAmount,
        nftType,
        sourceChain,
    }
}

export default getLockEventDecodedLog