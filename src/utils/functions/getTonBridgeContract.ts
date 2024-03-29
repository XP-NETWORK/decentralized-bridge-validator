import {
    Bridge,
    NewValidator,
    SignerAndSignature,
} from '@src/contractsTypes/contracts/tonBridge';
import { IBridge, ITonChainConfigAndTonWallet } from '@src/types';
import { Address, Dictionary, beginCell, toNano } from '@ton/core';
import { WalletContractV4, TonClient } from '@ton/ton';
import { ProcessDelayMilliseconds } from '../constants/processDelayMilliseconds';
import waitForMSWithMsg from './waitForMSWithMsg';
import TonWeb from 'tonweb';

const getTonBridgeContract = ({
    tonChainConfig,
    tonWallet,
}: ITonChainConfigAndTonWallet): IBridge => {
    const client = new TonClient({
        endpoint: tonChainConfig.rpcURL,
        apiKey: 'f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292',
    });
    const wallet = WalletContractV4.create({
        publicKey: Buffer.from(tonWallet.publicKey, 'hex'),
        workchain: 0,
    });

    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(
        Buffer.from(tonWallet.secretKey, 'hex'),
    );
    const bridge = client.open(
        Bridge.fromAddress(
            Address.parseFriendly(tonChainConfig.contractAddress).address,
        ),
    );

    const tonweb = new TonWeb(new TonWeb.HttpProvider(tonChainConfig.rpcURL));

    return {
        validators: async (address: string) => {
            const newValidatorPublicKey = Buffer.from(address, 'hex');
            const newValidatorPublicKeyBigInt = beginCell()
                .storeBuffer(newValidatorPublicKey)
                .endCell()
                .beginParse()
                .loadUintBig(256);
            const res = await tonweb.provider.call(
                tonChainConfig.contractAddress,
                'Validator',
                [['num', newValidatorPublicKeyBigInt.toString()]],
            );
            return { added: !!res.stack[0][1].elements.length };
        },
        validatorsCount: async () => {
            return (await bridge.getValidatorsCount()) ?? 0n;
        },
        addValidator: async (
            validatorAddress: string,
            signatures: {
                signerAddress: string;
                signature: string;
            }[],
        ) => {
            const seqno = await walletContract.getSeqno();
            const newValidatorPublicKey = Buffer.from(validatorAddress, 'hex');
            const newValidatorPublicKeyBigInt = beginCell()
                .storeBuffer(newValidatorPublicKey)
                .endCell()
                .beginParse()
                .loadUintBig(256);
            const newValidator: NewValidator = {
                $$type: 'NewValidator',
                key: newValidatorPublicKeyBigInt,
            };

            const sigs = Dictionary.empty<bigint, SignerAndSignature>();
            signatures.forEach((item, index) => {
                const signerPublicKey = Buffer.from(item.signerAddress, 'hex');
                const signerPublicKeyBigInt = beginCell()
                    .storeBuffer(signerPublicKey)
                    .endCell()
                    .beginParse()
                    .loadUintBig(256);

                const sig: SignerAndSignature = {
                    $$type: 'SignerAndSignature',
                    key: signerPublicKeyBigInt,
                    signature: beginCell()
                        .storeBuffer(Buffer.from(item.signature, 'hex'))
                        .endCell(),
                };
                sigs.set(BigInt(index), sig);
            });

            await bridge.send(
                walletSender,
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'AddValidator',
                    newValidatorPublicKey: newValidator,
                    newValidatorAddress:
                        Address.parseFriendly(validatorAddress).address,
                    sigs,
                    len: beginCell()
                        .storeUint(sigs.keys.length, 256)
                        .endCell()
                        .beginParse()
                        .loadUintBig(256),
                },
            );
            return {
                hash: '',
                wait: async () => {
                    let currentSeqno = await walletContract.getSeqno();
                    while (currentSeqno == seqno) {
                        await waitForMSWithMsg(
                            ProcessDelayMilliseconds,
                            'waiting for transaction to confirm...',
                        );
                        currentSeqno = await walletContract.getSeqno();
                    }
                },
            };
        },
    };
};

export default getTonBridgeContract;
