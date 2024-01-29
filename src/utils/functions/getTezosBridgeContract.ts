import { IBridge, ITezosChainConfigAndTezosWallet } from '@src/types';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { validateAddress } from '@taquito/utils';
import { BridgeContractType } from '@src/contractsTypes/tezosContractTypes/Bridge.types';
import {
    address,
    mutez,
    nat,
    tas,
} from '@src/contractsTypes/tezosContractTypes/type-aliases';
import { b58cencode, prefix, b58cdecode } from '@taquito/utils';
import { hash } from '@stablelib/blake2b';
import { SupportedChains } from '@src/config/chainSpecs';

export type TezosLockArgs = {
    sourceNftContractAddress: string;
    destinationChain: SupportedChains;
    address: string;
    tokenId: string;
};

export type TezosClaimArgs = {
    token_id: nat;
    source_chain: string;
    dest_chain: string;
    dest_address: address;
    source_nft_contract_address: string;
    name: string;
    symbol: string;
    royalty: nat;
    royalty_receiver: address;
    metadata: string;
    transaction_hash: string;
    token_amount: nat;
    nft_type: string;
    fee: mutez;
};

const getTezosBridgeContract = ({
    tezosChainConfig,
    tezosWallet,
}: ITezosChainConfigAndTezosWallet): IBridge<TezosLockArgs, TezosClaimArgs> => {
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
        lock721: async ({
            sourceNftContractAddress,
            destinationChain,
            address,
            tokenId,
        }) => {
            const bridge = await getBridgeInstance();
            const tx = await bridge.methods
                .lock_nft(tas.nat(tokenId), destinationChain, address, {
                    addr: tas.address(sourceNftContractAddress),
                })
                .send();

            return {
                hash: tx.hash,
                wait: async () => {
                    await tx.confirmation(1);
                },
            };
        },
        claimNFT721: async (data, sigs) => {
            const isTezosAddr =
                validateAddress(data.source_nft_contract_address) === 3;

            const sourceNftContractAddress = isTezosAddr
                ? {
                      addr: tas.address(data.source_nft_contract_address),
                  }
                : {
                      str: data.source_nft_contract_address,
                  };
            const bridge = await getBridgeInstance();

            const tx = await bridge.methodsObject
                .claim_nft({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    data: {
                        dest_address: data.dest_address,
                        dest_chain: data.dest_chain,
                        fee: data.fee,
                        metadata: data.metadata,
                        name: data.name,
                        nft_type: data.nft_type,
                        royalty: data.royalty,
                        royalty_receiver: data.royalty_receiver,
                        source_chain: data.source_chain,
                        symbol: data.symbol,
                        token_amount: data.token_amount,
                        token_id: tas.nat(data.token_id),
                        transaction_hash: data.transaction_hash,
                        source_nft_contract_address: sourceNftContractAddress,
                    },
                    sigs: sigs.map((e) => {
                        console.log(e);
                        const addr = tas.address(
                            b58cencode(
                                hash(
                                    new Uint8Array(
                                        b58cdecode(e.signer, prefix.edpk),
                                    ),
                                    20,
                                ),
                                prefix.tz1,
                            ),
                        );
                        return {
                            addr,
                            sig: tas.signature(
                                Buffer.from(
                                    e.signature.replace('0x', ''),
                                    'hex',
                                ).toString(),
                            ),
                            signer: tas.key(e.signer),
                        };
                    }),
                })
                .send({
                    amount: data.fee.toNumber(),
                    mutez: true,
                    fee: data.fee.toNumber(),
                });
            return {
                hash: tx.hash,
                wait: async () => {
                    await tx.confirmation(1);
                },
                block: tx.includedInBlock,
            };
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
