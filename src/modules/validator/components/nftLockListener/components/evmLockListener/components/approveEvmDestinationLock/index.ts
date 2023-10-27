import Web3 from "web3";
import { IApproveEvmDestinationLock } from "./types";


const approveEvmDestinationLock = async ({ nftTransferDetailsObject, evmWallet, storageContract }: IApproveEvmDestinationLock) => {
    const web3 = new Web3();
    const nftTransferDetailsValues = Object.values(nftTransferDetailsObject);

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

    const signedNftTransferDetails = web3.eth.accounts
        .privateKeyToAccount(evmWallet.privateKey)
        .sign(web3.utils.keccak256(
            web3.eth.abi.encodeParameters(
                nftTransferDetailsTypes,
                nftTransferDetailsValues
            )));


    try {
        console.info({ nftTransferDetailsObject, sig: signedNftTransferDetails.signature });

        const tx = await storageContract.approveLockNft(
            nftTransferDetailsObject.transactionHash,
            nftTransferDetailsObject.sourceChain,
            signedNftTransferDetails.signature
        );
        await tx.wait();
        console.info(`Lock Approved Transaction Hash: ${tx.hash}`);

    } catch (e) {
        if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
            throw new Error("Error while processing log")
        }
    }
}

export default approveEvmDestinationLock