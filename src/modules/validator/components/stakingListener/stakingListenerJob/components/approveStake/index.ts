import Web3 from "web3";
import { IApproveStake } from "./types";
import { UserSigner } from "@multiversx/sdk-wallet/out";

const approveStake = async ({ wallets, validatorAddressAndChainType, storageContract }: IApproveStake) => {

    const web3 = new Web3()

    const newEvmValidator = validatorAddressAndChainType.find(item => item.chainType === "evm");
    const newMultiversXValidator = validatorAddressAndChainType.find(item => item.chainType === "multiversX");

    const signedStakerAddress = web3.eth.accounts
        .privateKeyToAccount(wallets.evmWallet.privateKey)
        .sign(web3.utils.keccak256(web3.eth.abi.encodeParameters(
            ["address"],
            [newEvmValidator.validatorAddress]
        )));

    const signer = UserSigner.fromWallet(wallets.multiversXWallet.userWallet, wallets.multiversXWallet.password)



    const evmSingerAndSignature = {
        validatorAddress: newEvmValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.evmWallet.address,
            signature: signedStakerAddress.signature
        }
    }

    const multiversXSingerAndSignature = {
        validatorAddress: newMultiversXValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.multiversXWallet.userWallet.address,
            signature: (await signer.sign(Buffer.from(
                newMultiversXValidator.validatorAddress
            ))).toString("hex"),
        }
    }

    try {
        const tx = await storageContract.approveStake(newEvmValidator.validatorAddress, [
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