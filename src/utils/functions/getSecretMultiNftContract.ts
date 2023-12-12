import { INftContract, ISecretContractConfig } from "@src/types";
import { SecretNetworkClient } from "secretjs";


const getSecretMultiNftContract = ({ rpcURL, chainId, contractAddress }: ISecretContractConfig): INftContract => {

    const secretjs = new SecretNetworkClient({
        url: rpcURL,
        chainId: chainId,
    });
    type secretResponse = {
        token_id_public_info:
        {
            token_id_info: {
                token_id: string,
                name: string,
                symbol: string,
                public_metadata: {
                    extension: {
                        media: [{ url: string }]
                    }
                }
            },
        }
    }

    return {
        name: async (tokenId: bigint) => {
            const name = ((await secretjs.query.compute.queryContract({
                contract_address: contractAddress,
                query: { token_id_public_info: { token_id: tokenId.toString() } }
            })) as secretResponse).token_id_public_info.token_id_info.name
            return name
        },
        symbol: async (tokenId: bigint) => {
            const symbol = ((await secretjs.query.compute.queryContract({
                contract_address: contractAddress,
                query: { token_id_public_info: { token_id: tokenId.toString() } }
            })) as secretResponse).token_id_public_info.token_id_info.symbol
            return symbol
        },
        royaltyInfo: async () => {
            return String("0")
        },
        tokenURI: async (tokenId: bigint) => {
            const tokenIdInfo = ((await secretjs.query.compute.queryContract({
                contract_address: contractAddress,
                query: { token_id_public_info: { token_id: tokenId.toString() } }
            })) as secretResponse).token_id_public_info.token_id_info
            const tokenURI = tokenIdInfo?.public_metadata?.extension?.media[0]?.url || ""
            return tokenURI
        }
    }
}

export default getSecretMultiNftContract;

