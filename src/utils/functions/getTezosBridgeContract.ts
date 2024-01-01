import { IBridge, ITezosChainConfigAndTezosWallet } from "@src/types";
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { BridgeContractType } from "@src/contractsTypes/tezosContractTypes/Bridge.types";
import { tas } from "@src/contractsTypes/tezosContractTypes/type-aliases";
import {
    b58cencode,
    prefix,
    b58cdecode
} from '@taquito/utils';
import { hash } from '@stablelib/blake2b';

const getTezosBridgeContract = ({ tezosChainConfig, tezosWallet }: ITezosChainConfigAndTezosWallet): IBridge => {

    const getBridgeInstance = async () => {
        const Tezos = new TezosToolkit(tezosChainConfig.rpcURL);
        const tezosSigner = await InMemorySigner.fromSecretKey(tezosWallet.secretKey);
        Tezos.setProvider({ signer: tezosSigner });
        const bridge = await Tezos.contract.at<BridgeContractType>(tezosChainConfig.contractAddress);
        return bridge
    }

    return {
        validators: async (address: string) => {
            const bridge = await getBridgeInstance();
            const storage = await bridge.storage();
            return { added: !!(await storage.validators.get(tas.address(address))) };
        },
        validatorsCount: async () => {
            const bridge = await getBridgeInstance();
            const storage = await bridge.storage();
            return BigInt(storage.validators_count.toString())
        },
        addValidator: async (publicKeyHash: string, signatures: {
            signerAddress: string;
            signature: string
        }[]) => {
            const bridge = await getBridgeInstance();

            const tx = await bridge.methods
                .add_validator(
                    tas.address(publicKeyHash),
                    signatures.map(item => {
                        const addr = tas.address(b58cencode(
                            hash(
                                new Uint8Array(b58cdecode(item.signerAddress, prefix.edpk)),
                                20
                            ),
                            prefix.tz1
                        ));
                        const sig = tas.signature(Buffer.from(item.signature.replace("0x", ""), "hex").toString());
                        return {
                            addr,
                            sig,
                            signer: tas.key(item.signerAddress),
                        }
                    }))
                .send();

            return {
                hash: tx.hash,
                wait: async () => {
                    return
                }
            }
        }
    }
}

export default getTezosBridgeContract