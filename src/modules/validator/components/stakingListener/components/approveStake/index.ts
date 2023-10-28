import Web3 from "web3";
import { IApproveStake } from "./types";

const approveStake = async ({ wallets, stakerAddress, storageContract }: IApproveStake) => {

    const web3 = new Web3()
    const signedStakerAddress = web3.eth.accounts
        .privateKeyToAccount(wallets.evmWallet.privateKey)
        .sign(web3.utils.keccak256(web3.eth.abi.encodeParameters(
            ["address"],
            [stakerAddress]
        )));

    try {
        const tx = await storageContract.approveStake(stakerAddress, signedStakerAddress.signature);
        console.info(`Stake Approved Transaction Hash: ${tx.hash}`);
    } catch (e) {
        if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
            throw ("Error while processing log")
        }
    }
}

export default approveStake