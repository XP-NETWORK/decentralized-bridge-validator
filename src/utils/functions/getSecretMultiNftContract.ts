import { INftContract, ISecretContractConfig } from '@src/types';
import { SecretNetworkClient } from 'secretjs';

const getSecretMultiNftContract = (
    { rpcURL, chainId, contractAddress }: ISecretContractConfig,
    wallet?: SecretNetworkClient,
): INftContract => {
    const secretjs = new SecretNetworkClient({
        url: rpcURL,
        chainId: chainId,
    });
    type secretResponse = {
        token_id_public_info: {
            token_id_info: {
                token_id: string;
                name: string;
                symbol: string;
                public_metadata: {
                    extension: {
                        media: [{ url: string }];
                    };
                };
            };
        };
    };

    return {
        name: async (tokenId) => {
            const name = (
                (await secretjs.query.compute.queryContract({
                    contract_address: contractAddress,
                    query: {
                        token_id_public_info: { token_id: tokenId!.toString() },
                    },
                })) as secretResponse
            ).token_id_public_info.token_id_info.name;
            return name;
        },
        async approve(tokenId, to) {
            if (!wallet) throw new Error('Wallet is not connected');

            const res = await wallet.tx.compute.executeContract(
                {
                    sender: wallet.address,
                    contract_address: contractAddress,
                    msg: {
                        give_permission: {
                            allowed_address: to,
                            token_id: tokenId,
                            view_balance: true,
                            transfer: 1,
                        },
                    },
                },
                {
                    waitForCommit: true,
                    gasLimit: 250_000,
                },
            );
            return res.transactionHash;
        },
        symbol: async (tokenId) => {
            const symbol = (
                (await secretjs.query.compute.queryContract({
                    contract_address: contractAddress,
                    query: {
                        token_id_public_info: { token_id: tokenId!.toString() },
                    },
                })) as secretResponse
            ).token_id_public_info.token_id_info.symbol;
            return symbol;
        },
        royaltyInfo: async () => {
            return String('0');
        },
        tokenURI: async (tokenId: bigint) => {
            const tokenIdInfo = (
                (await secretjs.query.compute.queryContract({
                    contract_address: contractAddress,
                    query: {
                        token_id_public_info: { token_id: tokenId.toString() },
                    },
                })) as secretResponse
            ).token_id_public_info.token_id_info;
            const tokenURI =
                tokenIdInfo?.public_metadata?.extension?.media[0]?.url || '';
            return tokenURI;
        },
    };
};

export default getSecretMultiNftContract;
