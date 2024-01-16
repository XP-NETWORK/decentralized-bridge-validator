import Web3 from 'web3';
import { IApproveStake } from './types';
import { UserSigner } from '@multiversx/sdk-wallet/out';
import { beginCell } from '@ton/ton';
import { sign } from 'ton-crypto';
import {
    NewValidator,
    storeNewValidator,
} from '@src/contractsTypes/contracts/tonBridge';
import { sha256 } from '@noble/hashes/sha256';
import { encodeSecp256k1Pubkey } from 'secretjs/dist/wallet_amino';
import * as secp256k1 from '@noble/secp256k1';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { tas } from '@src/contractsTypes/tezosContractTypes/type-aliases';
import { b58cencode, prefix, b58cdecode } from '@taquito/utils';
import { hash } from '@stablelib/blake2b';

const approveStake = async ({
    wallets,
    validatorAddressAndChainType,
    storageContract,
}: IApproveStake) => {
    const web3 = new Web3();

    const newEvmValidator = validatorAddressAndChainType.find(
        (item) => item.chainType === 'evm',
    )!;
    const newMultiversXValidator = validatorAddressAndChainType.find(
        (item) => item.chainType === 'multiversX',
    )!;
    const newTonValidator = validatorAddressAndChainType.find(
        (item) => item.chainType === 'ton',
    )!;
    const newSecretValidator = validatorAddressAndChainType.find(
        (item) => item.chainType === 'scrt',
    )!;
    const newTezosValidator = validatorAddressAndChainType.find(
        (item) => item.chainType === 'tezos',
    )!;
    const newTezosPublicKeyHash = tas.address(
        b58cencode(
            hash(
                new Uint8Array(
                    b58cdecode(newTezosValidator.validatorAddress, prefix.edpk),
                ),
                20,
            ),
            prefix.tz1,
        ),
    );

    // Evm Signature
    const evmSignature = web3.eth.accounts
        .privateKeyToAccount(wallets.evmWallet.privateKey)
        .sign(
            web3.utils.keccak256(
                web3.eth.abi.encodeParameters(
                    ['address'],
                    [newEvmValidator.validatorAddress],
                ),
            ),
        ).signature;

    // MultiversX Signature
    const multiversXSigner = UserSigner.fromWallet(
        wallets.multiversXWallet.userWallet,
        wallets.multiversXWallet.password,
    );
    const multiversXSignature =
        '0x' +
        (
            await multiversXSigner.sign(
                Buffer.from(newMultiversXValidator.validatorAddress, 'hex'),
            )
        ).toString('hex');

    // Ton Signature
    const newValidatorPublicKey = Buffer.from(
        newTonValidator.validatorAddress,
        'hex',
    );
    const newValidatorPublicKeyBigInt = beginCell()
        .storeBuffer(newValidatorPublicKey)
        .endCell()
        .beginParse()
        .loadUintBig(256);
    const secretKey = Buffer.from(wallets.tonWallet.secretKey, 'hex');
    const newValidator: NewValidator = {
        $$type: 'NewValidator',
        key: newValidatorPublicKeyBigInt,
    };
    const tonSignature =
        '0x' +
        sign(
            beginCell().store(storeNewValidator(newValidator)).endCell().hash(),
            secretKey,
        ).toString('hex');

    // Secret Signature
    const messageHash = sha256(
        encodeSecp256k1Pubkey(
            Buffer.from(newSecretValidator.validatorAddress, 'hex'),
        ).value,
    );
    const secretSignature =
        '0x' +
        Buffer.from(
            await secp256k1.sign(messageHash, wallets.secretWallet.privateKey, {
                extraEntropy: true,
                der: false,
            }),
        ).toString('hex');

    // Tezos Signature
    const Tezos = new TezosToolkit('');
    const signer = await InMemorySigner.fromSecretKey(
        wallets.tezosWallet.secretKey,
    );
    Tezos.setProvider({
        signer,
    });
    const packer = new MichelCodecPacker();
    const packed = await packer.packData({
        data: {
            string: newTezosPublicKeyHash,
        },
        type: {
            prim: 'address',
        },
    });

    const tezosSignature =
        '0x' +
        Buffer.from((await signer.sign(packed.packed)).sig).toString('hex');

    const evmSingerAndSignature = {
        validatorAddress: newEvmValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.evmWallet.address,
            signature: evmSignature,
        },
    };

    const multiversXSingerAndSignature = {
        validatorAddress: newMultiversXValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.multiversXWallet.userWallet.address,
            signature: multiversXSignature,
        },
    };

    const tonSingerAndSignature = {
        validatorAddress: newTonValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.tonWallet.publicKey,
            signature: tonSignature,
        },
    };

    const secretSingerAndSignature = {
        validatorAddress: newSecretValidator.validatorAddress,
        signerAndSignature: {
            signerAddress: wallets.secretWallet.publicKey,
            signature: secretSignature,
        },
    };

    const tezosSingerAndSignature = {
        validatorAddress: newTezosPublicKeyHash,
        signerAndSignature: {
            signerAddress: wallets.tezosWallet.publicKey,
            signature: tezosSignature,
        },
    };

    try {
        const tx = await storageContract.approveStake(
            newEvmValidator.validatorAddress,
            [
                evmSingerAndSignature,
                multiversXSingerAndSignature,
                tonSingerAndSignature,
                secretSingerAndSignature,
                tezosSingerAndSignature,
            ],
        );
        console.info(`Stake Approved Transaction Hash: ${tx.hash}`);
    } catch (e) {
        console.log({
            evmSingerAndSignature,
            multiversXSingerAndSignature,
            tonSingerAndSignature,
        });
        console.log(e);
        if (
            !(
                hasShortMessage(e) &&
                e.shortMessage ===
                    `execution reverted: "Signature already used"`
            )
        ) {
            throw new Error('Error while processing log');
        }
    }
};
function hasShortMessage(e: unknown): e is { shortMessage: string } {
    return typeof e === 'object' && e !== null && 'shortMessage' in e;
}

export default approveStake;
