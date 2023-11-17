import { Bridge, NewValidator, SignerAndSignature } from "@src/contractsTypes/contracts/tonBridge";
import { IBridge, ITonChainConfigAndTonWallet } from "@src/types";
import { Address, Dictionary, beginCell, toNano } from "@ton/core"
import { TonClient, WalletContractV4 } from "@ton/ton";
import { ProcessDelayMilliseconds } from "../constants/processDelayMilliseconds";
import waitForMSWithMsg from "./waitForMSWithMsg";

const getTonBridgeContract = ({ tonChainConfig, tonWallet }: ITonChainConfigAndTonWallet): IBridge => {

    const client = new TonClient({ endpoint: tonChainConfig.rpcURL });
    const wallet = WalletContractV4.create({ publicKey: Buffer.from(tonWallet.publicKey, "hex"), workchain: 0 });
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(Buffer.from(tonWallet.secretKey, "hex"));
    const bridge = client.open(Bridge.fromAddress(Address.parseFriendly(tonChainConfig.contractAddress).address))

    return {
        validators: async (address: string) => {
            const newValidatorPublicKey = Buffer.from(address, "hex");
            const newValidatorPublicKeyBigInt = beginCell().storeBuffer(newValidatorPublicKey).endCell().beginParse().loadUintBig(256);
            return await bridge.getGetValidator(newValidatorPublicKeyBigInt)
        },
        validatorsCount: async () => {
            return await bridge.getGetValidatorsCount()
        },
        addValidator: async (validatorAddress: string, signatures: {
            signerAddress: string;
            signature: string
        }[]) => {
            const seqno = await walletContract.getSeqno();
            const newValidatorPublicKey = Buffer.from(validatorAddress, "hex");
            const newValidatorPublicKeyBigInt = beginCell().storeBuffer(newValidatorPublicKey).endCell().beginParse().loadUintBig(256);
            const newValidator: NewValidator = {
                $$type: "NewValidator",
                key: newValidatorPublicKeyBigInt
            }

            const sigs = Dictionary.empty<bigint, SignerAndSignature>();
            signatures.forEach((item, index) => {
                const signerPublicKey = Buffer.from(item.signerAddress, "hex");
                const signerPublicKeyBigInt = beginCell().storeBuffer(signerPublicKey).endCell().beginParse().loadUintBig(256);

                const sig: SignerAndSignature = {
                    $$type: 'SignerAndSignature',
                    key: signerPublicKeyBigInt,
                    signature: beginCell().storeBuffer(Buffer.from(item.signature, "hex")).endCell()
                };
                sigs.set(BigInt(index), sig)
            })


            await bridge.send(
                walletSender,
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'AddValidator',
                    newValidatorPublicKey: newValidator,
                    sigs,
                    len: beginCell().storeUint(sigs.keys.length, 256).endCell().beginParse().loadUintBig(256),
                }
            );
            return {
                hash: "",
                wait: async () => {
                    let currentSeqno = await walletContract.getSeqno();
                    while (currentSeqno == seqno) {
                        await waitForMSWithMsg(ProcessDelayMilliseconds, "waiting for transaction to confirm...");
                        currentSeqno = await walletContract.getSeqno();
                    }
                }
            }
        }
    }
}

export default getTonBridgeContract