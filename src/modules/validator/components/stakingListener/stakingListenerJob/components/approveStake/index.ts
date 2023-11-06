import Web3 from "web3";
import { IApproveStake } from "./types";
import { UserSigner } from "@multiversx/sdk-wallet/out";

const approveStake = async ({ wallets, stakerAddress, storageContract, otherChains }: IApproveStake) => {

    const web3 = new Web3()
    const signedStakerAddress = web3.eth.accounts
        .privateKeyToAccount(wallets.evmWallet.privateKey)
        .sign(web3.utils.keccak256(web3.eth.abi.encodeParameters(
            ["address"],
            [stakerAddress]
        )));

    const signer = UserSigner.fromWallet(wallets.multiversXWallet.userWallet, wallets.multiversXWallet.password)



    const evmSingerAndSignature = {
        signerAddress: wallets.evmWallet.address,
        signature: signedStakerAddress.signature
    }

    const multiversXSingerAndSignature = {
        signerAddress: wallets.multiversXWallet.userWallet.bech32,
        signature: (await signer.sign(Buffer.from(
            otherChains.find(item => item.chainSymbol === "multiversX").validatorAddress
        ))).toString()
    }

    try {
        const tx = await storageContract.approveStake(stakerAddress, [
            evmSingerAndSignature,
            multiversXSingerAndSignature
        ]);

        console.info(`Stake Approved Transaction Hash: ${tx.hash}`);
    } catch (e) {
        if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
            throw new Error("Error while processing log")
        }
    }
}

export default approveStake