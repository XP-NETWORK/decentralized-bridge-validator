import { INftContract, ISecretContractConfig } from "@src/types";
import { SecretNetworkClient } from "secretjs";


const getSecretNftContract = ({ rpcURL, chainId, contractAddress }: ISecretContractConfig): INftContract => {

    const secretjs = new SecretNetworkClient({
        url: rpcURL,
        chainId: chainId,
    });

    console.log(secretjs, contractAddress)

    return {
        name: async () => {

            return ""
        },
        symbol: async () => {
            return ""
        },
        royaltyInfo: async (tokenId: bigint) => {
            return tokenId.toString()
        },
        tokenURI: async (tokenId: bigint) => {
            return tokenId.toString()
        }
    }
}

export default getSecretNftContract;

