import { IBridge, ITezosChainConfigAndTezosWallet } from '@src/types';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { BridgeContractType } from '@src/contractsTypes/tezosContractTypes/Bridge.types';
import {
    address,
    key,
    signature,
    tas,
} from '@src/contractsTypes/tezosContractTypes/type-aliases';
import { b58cencode, prefix, b58cdecode } from '@taquito/utils';
import { hash } from '@stablelib/blake2b';
import { SupportedChains } from '@src/config/chainSpecs';

export type TezosLockArgs = [
    sourceNftContractAddress: string,

    destinationChain: SupportedChains,
    address: string,
    tokenId: string,
];

const getTezosBridgeContract = ({
    tezosChainConfig,
    tezosWallet,
}: ITezosChainConfigAndTezosWallet): IBridge<
    TezosLockArgs,
    Record<string, unknown>,
    {
        signer: key;
        sig: signature;
        addr: address;
    }
> => {
    const getBridgeInstance = async () => {
        const Tezos = new TezosToolkit(tezosChainConfig.rpcURL);
        const tezosSigner = await InMemorySigner.fromSecretKey(
            tezosWallet.secretKey,
        );
        Tezos.setProvider({ signer: tezosSigner });
        const bridge = await Tezos.contract.at<BridgeContractType>(
            tezosChainConfig.contractAddress,
        );
        return bridge;
    };

    return {
        lock721: async () => {
            throw new Error('Not implemented');
        },
        claimNFT721: async () => {
            throw new Error('Not implemented');
        },
        validators: async (address: string) => {
            const bridge = await getBridgeInstance();
            const storage = await bridge.storage();
            return {
                added: !!(await storage.validators.get(tas.address(address))),
            };
        },
        validatorsCount: async () => {
            const bridge = await getBridgeInstance();
            const storage = await bridge.storage();
            return BigInt(storage.validators_count.toString());
        },
        addValidator: async (
            publicKeyHash: string,
            signatures: {
                signerAddress: string;
                signature: string;
            }[],
        ) => {
            const bridge = await getBridgeInstance();

            const tx = await bridge.methods
                .add_validator(
                    tas.address(publicKeyHash),
                    signatures.map((item) => {
                        const addr = tas.address(
                            b58cencode(
                                hash(
                                    new Uint8Array(
                                        b58cdecode(
                                            item.signerAddress,
                                            prefix.edpk,
                                        ),
                                    ),
                                    20,
                                ),
                                prefix.tz1,
                            ),
                        );
                        const sig = tas.signature(
                            Buffer.from(
                                item.signature.replace('0x', ''),
                                'hex',
                            ).toString(),
                        );
                        return {
                            addr,
                            sig,
                            signer: tas.key(item.signerAddress),
                        };
                    }),
                )
                .send();

            return {
                hash: tx.hash,
                wait: async () => {
                    await tx.confirmation(1);
                },
            };
        },
    };
};

export default getTezosBridgeContract;
