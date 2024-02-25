import { SupportedChains } from '@src/config/chainSpecs';
import { AddValidatorType } from '@src/contractsTypes/contracts/secretBridge';
import { IBridge, ISecretChainConfigAndSecretWallet } from '@src/types';
import { SecretNetworkClient, Wallet, pubkeyToAddress } from 'secretjs';
import {
    encodeSecp256k1Pubkey,
    encodeSecp256k1Signature,
} from 'secretjs/dist/wallet_amino';

export type CodeInfo = {
    code_id: number;
    code_hash: string;
};

export type SecretLockArgs = {
    destinationChain: SupportedChains;
    address: string;
    sourceNftContractAddress: string;
    collectionCodeInfo: CodeInfo;
    tokenId: string;
};

export type SecretClaimData = {
    token_id: string;
    source_chain: string;
    destination_chain: string;
    destination_user_address: string;
    source_nft_contract_address: string;
    name: string;
    symbol: string;
    royalty: number;
    royalty_receiver: string;
    metadata: string;
    transaction_hash: string;
    token_amount: string;
    nft_type: string;
    fee: string;
};

const getSecretBridgeContract = ({
    secretChainConfig,
    secretWallet,
}: ISecretChainConfigAndSecretWallet): IBridge<
    SecretLockArgs,
    SecretClaimData
> => {
    const wallet = new Wallet(secretWallet.privateKey);
    const secretjs = new SecretNetworkClient({
        url: secretChainConfig.rpcURL,
        chainId: secretChainConfig.chainId,
        wallet: wallet,
        walletAddress: wallet.address,
    });
    console.log(wallet.address);
    const bridgeContractCodeHash =
        secretjs.query.compute.codeHashByContractAddress({
            contract_address: secretChainConfig.contractAddress,
        });

    return {
        lock721: async ({
            collectionCodeInfo,
            destinationChain,
            address,
            sourceNftContractAddress,
            tokenId,
        }) => {
            const tx = await secretjs.tx.compute.executeContract(
                {
                    contract_address: secretChainConfig.contractAddress,
                    msg: {
                        lock721: {
                            data: {
                                destination_chain: destinationChain,
                                destination_user_address: address,
                                source_nft_contract_address:
                                    sourceNftContractAddress,
                                collection_code_info: collectionCodeInfo,
                                token_id: tokenId,
                            },
                        },
                    },
                    code_hash: (await bridgeContractCodeHash).code_hash,
                    sender: secretjs.address,
                },
                {
                    gasLimit: 200_000,
                },
            );
            return { hash: tx.transactionHash, wait: async () => {} };
        },
        claimNFT721: async (data, signatures) => {
            const claim721 = {
                claim721: {
                    data: {
                        data,
                        signatures: signatures.map((e) => {
                            return {
                                signature: encodeSecp256k1Signature(
                                    Buffer.from(secretWallet.publicKey, 'hex'),
                                    Buffer.from(
                                        e.signature.replace('0x', ''),
                                        'hex',
                                    ),
                                ).signature,
                                signer_address: encodeSecp256k1Pubkey(
                                    Buffer.from(secretWallet.publicKey, 'hex'),
                                ).value,
                            };
                        }),
                    },
                },
            };
            console.log(JSON.stringify(claim721));
            const tx = await secretjs.tx.compute.executeContract(
                {
                    contract_address: secretChainConfig.contractAddress,
                    msg: claim721,
                    code_hash: (await bridgeContractCodeHash).code_hash,
                    sender: secretjs.address,
                    sent_funds: [
                        { amount: data.fee.toString(), denom: 'uscrt' },
                    ],
                },
                {
                    gasLimit: 300_000,
                },
            );
            console.log(tx);
            return { hash: tx.transactionHash, wait: async () => {} };
        },
        async lock1155({
            amt,
            collectionCodeInfo,
            destinationChain,
            address,
            sourceNftContractAddress,
            tokenId,
        }) {
            const tx = await secretjs.tx.compute.executeContract(
                {
                    contract_address: secretChainConfig.contractAddress,
                    msg: {
                        destination_chain: destinationChain,
                        destination_user_address: address,
                        source_nft_contract_address: sourceNftContractAddress,
                        collection_code_info: collectionCodeInfo,
                        token_id: tokenId,
                        token_amount: amt.toString(),
                    },
                    code_hash: (await bridgeContractCodeHash).code_hash,
                    sender: secretjs.address,
                },
                {
                    gasLimit: 200_000,
                },
            );

            return { hash: tx.transactionHash, wait: async () => {} };
        },
        async claimNFT1155(nftTransferData, sigs) {
            const claim721 = {
                claim1155: {
                    data: {
                        data: nftTransferData,
                        signatures: sigs,
                    },
                },
            };
            const tx = await secretjs.tx.compute.executeContract(
                {
                    contract_address: secretChainConfig.contractAddress,
                    msg: claim721,
                    code_hash: (await bridgeContractCodeHash).code_hash,
                    sender: secretjs.address,
                    sent_funds: [{ amount: '1', denom: 'uscrt' }],
                },
                {
                    gasLimit: 300_000,
                },
            );
            return { hash: tx.transactionHash, wait: async () => {} };
        },
        validators: async (address: string) => {
            const res = (await secretjs.query.compute.queryContract({
                contract_address: secretChainConfig.contractAddress,
                code_hash: (await bridgeContractCodeHash).code_hash,
                query: {
                    get_validator: {
                        address: Buffer.from(address, 'hex').toString('base64'),
                    },
                },
            })) as { validator: { data: { added: boolean } } };
            return { added: res.validator.data.added };
        },
        validatorsCount: async () => {
            const res = (await secretjs.query.compute.queryContract({
                contract_address: secretChainConfig.contractAddress,
                code_hash: (await bridgeContractCodeHash).code_hash,
                query: {
                    get_validators_count: {},
                },
            })) as { validator_count_response: { count: number } };
            return BigInt(res.validator_count_response.count);
        },
        addValidator: async (
            validatorToAddPublicKey: string,
            signatures: {
                signerAddress: string;
                signature: string;
            }[],
        ) => {
            const validatorToAddPublicKeyUint8 = Buffer.from(
                validatorToAddPublicKey,
                'hex',
            );
            const msg: AddValidatorType = {
                add_validator: {
                    data: {
                        validator: [
                            encodeSecp256k1Pubkey(validatorToAddPublicKeyUint8)
                                .value,
                            pubkeyToAddress(validatorToAddPublicKeyUint8),
                        ],
                        signatures: signatures.map((item) => {
                            return {
                                signature: Buffer.from(
                                    item.signature.replace('0x', ''),
                                    'hex',
                                ).toString('base64'),
                                signer_address: item.signerAddress,
                            };
                        }),
                    },
                },
            };

            const tx = await secretjs.tx.compute.executeContract(
                {
                    contract_address: secretChainConfig.contractAddress,
                    msg,
                    code_hash: (await bridgeContractCodeHash).code_hash,
                    sender: pubkeyToAddress(
                        Buffer.from(secretWallet.publicKey, 'hex'),
                    ),
                },
                {
                    gasLimit: 200_000,
                },
            );

            return {
                hash: tx.transactionHash,
                wait: async () => {
                    return;
                },
            };
        },
    };
};

export default getSecretBridgeContract;
