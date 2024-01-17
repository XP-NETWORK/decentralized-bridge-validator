import { AddValidatorType } from '@src/contractsTypes/contracts/secretBridge';
import { IBridge, ISecretChainConfigAndSecretWallet } from '@src/types';
import { SecretNetworkClient, pubkeyToAddress } from 'secretjs';
import { encodeSecp256k1Pubkey } from 'secretjs/dist/wallet_amino';

const getSecretBridgeContract = ({
    secretChainConfig,
    secretWallet,
}: ISecretChainConfigAndSecretWallet): IBridge<
    unknown[],
    Record<string, unknown>,
    { signer: string; signature: string }
> => {
    const bridgeContractCodeHash =
        'dbccb5a7abf668d050d720cd01ea39d556492456ceb870dcae80dc4ff8572575';
    const secretjs = new SecretNetworkClient({
        url: secretChainConfig.rpcURL,
        chainId: secretChainConfig.chainId,
    });

    return {
        lock721: async () => {
            throw new Error('Not implemented');
        },
        claimNFT721: async () => {
            throw new Error('Not implemented');
        },
        validators: async (address: string) => {
            const res = (await secretjs.query.compute.queryContract({
                contract_address: secretChainConfig.contractAddress,
                code_hash: bridgeContractCodeHash,
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
                code_hash: bridgeContractCodeHash,
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
                    code_hash: bridgeContractCodeHash,
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
