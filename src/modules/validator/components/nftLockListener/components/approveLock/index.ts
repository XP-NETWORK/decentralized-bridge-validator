import { getEvmSignedNftDetails, getMultiversXSignedNftDetails, getTonSignedNftDetails } from "../../utils";
import { IApproveLock } from "./types";


const approveLock = async ({ nftTransferDetailsObject, wallets, destinationChainObject, storageContract, txChain }: IApproveLock) => {

    let publicAddress = "", signature = "";
    if (destinationChainObject.chainType === "evm") {
        ({ publicAddress, signature } = getEvmSignedNftDetails({ nftTransferDetailsObject, evmWallet: wallets.evmWallet }))
    } else if (destinationChainObject.chainType === "multiversX") {
        ({ publicAddress, signature } = await getMultiversXSignedNftDetails({ nftTransferDetailsObject, multiversXWallet: wallets.multiversXWallet }))
    } else if (destinationChainObject.chainType === "ton") {
        ({ publicAddress, signature } = getTonSignedNftDetails({ nftTransferDetailsObject, tonWallet: wallets.tonWallet }))
    }

    try {
        console.info({ nftTransferDetailsObject, sig: signature });

        const tx = await storageContract.approveLockNft(
            nftTransferDetailsObject.transactionHash,
            txChain,
            signature,
            publicAddress
        );
        await tx.wait();
        console.info(`Lock Approved Transaction Hash: ${tx.hash}`);

    } catch (e) {
        console.error(e)
        if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
            throw new Error("Error while processing log")
        } else {
            console.log("Transaction already processed")
        }
    }
}

export default approveLock