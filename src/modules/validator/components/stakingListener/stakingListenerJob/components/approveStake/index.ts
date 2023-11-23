import Web3 from "web3";
import { IApproveStake } from "./types";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { beginCell } from "@ton/ton";
import { sign } from 'ton-crypto';
import { NewValidator, storeNewValidator } from "@src/contractsTypes/contracts/tonBridge";

const approveStake = async ({ wallets, validatorAddressAndChainType, storageContract }: IApproveStake) => {

    const web3 = new Web3()

    const newEvmValidator = validatorAddressAndChainType.find(item => item.chainType === "evm");
    const newMultiversXValidator = validatorAddressAndChainType.find(item => item.chainType === "multiversX");
    const newTonValidator = validatorAddressAndChainType.find(item => item.chainType === "ton");

    // Evm Signature
    const evmSignature = web3.eth.accounts
        .privateKeyToAccount(wallets.evmWallet.privateKey)
        .sign(web3.utils.keccak256(web3.eth.abi.encodeParameters(
            ["address"],
            [newEvmValidator.validatorAddress]
        ))).signature;

    // MultiversX Signature
    const multiversXSigner = UserSigner.fromWallet(wallets.multiversXWallet.userWallet, wallets.multiversXWallet.password);
    const multiversXSignature = "0x" + (
        (await multiversXSigner.sign(
            Buffer.from(newMultiversXValidator.validatorAddress, "hex")
        )).toString("hex")
    )

    // Ton Signature
    const newValidatorPublicKey = Buffer.from(newTonValidator.validatorAddress, "hex");
    const newValidatorPublicKeyBigInt = beginCell().storeBuffer(newValidatorPublicKey).endCell().beginParse().loadUintBig(256);
    const secretKey = Buffer.from(wallets.tonWallet.secretKey, "hex");
    const newValidator: NewValidator = {
        $$type: "NewValidator",
        key: newValidatorPublicKeyBigInt
    }
    const tonSignature = "0x" + sign(beginCell().store(storeNewValidator(newValidator)).endCell().hash(), secretKey).toString("hex");



    const evmSingerAndSignature = {
        validatorAddress: newEvmValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.evmWallet.address,
            signature: evmSignature
        }
    }

    const multiversXSingerAndSignature = {
        validatorAddress: newMultiversXValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.multiversXWallet.userWallet.address,
            signature: multiversXSignature,
        }
    }

    const tonSingerAndSignature = {
        validatorAddress: newTonValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.tonWallet.publicKey,
            signature: tonSignature
        }
    }


    try {
        const tx = await storageContract.approveStake(newEvmValidator.validatorAddress, [
            evmSingerAndSignature,
            multiversXSingerAndSignature,
            tonSingerAndSignature

        ]);
        console.info(`Stake Approved Transaction Hash: ${tx.hash}`);
    } catch (e) {
        console.log({
            evmSingerAndSignature,
            multiversXSingerAndSignature,
            tonSingerAndSignature
        })
        console.log(e)
        if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
            throw new Error("Error while processing log")
        }
    }
}

export default approveStake