import { IBridge, ITezosChainConfigAndTezosWallet } from '@src/types';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { validateAddress } from '@taquito/utils';
import { BridgeContractType } from '@src/contractsTypes/tezosContractTypes/Bridge.types';
import {
    address,
    key,
    mutez,
    nat,
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
}: ITezosChainConfigAndTezosWallet): IBridge<
    TezosLockArgs,
    TezosClaimArgs,
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
        lock721: async (
            sourceNftContractAddress,
            destinationChain,
            destAddress,
            tokenId,
        ) => {
            const bridge = await getBridgeInstance();
            const tx = await bridge.methods
                .lock_nft(tas.nat(tokenId), destinationChain, destAddress, {
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
            const tx = await bridge.methods
                .claim_nft(
                    data.token_id,
                    data.source_chain,
                    data.dest_chain,
                    data.dest_address,
                    sourceNftContractAddress,
                    data.name,
                    data.symbol,
                    data.royalty,
                    data.royalty_receiver,
                    data.metadata,
                    data.transaction_hash,
                    data.token_amount,
                    data.nft_type,
                    data.fee,
                    sigs,
                )
                .send();
            return {
                hash: tx.hash,
                wait: async () => {
                    await tx.confirmation(1);
                },
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
