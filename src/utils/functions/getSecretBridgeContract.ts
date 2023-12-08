/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBridge, ISecretChainConfigAndSecretWallet } from "@src/types";
import { SecretNetworkClient } from "secretjs";

const getSecretBridgeContract = ({ secretChainConfig, secretWallet }: ISecretChainConfigAndSecretWallet): IBridge => {

    const secretjs = new SecretNetworkClient({
        url: secretChainConfig.rpcURL,
        chainId: secretChainConfig.chainId,
    });


    return {
        validators: async (address: string) => {
            return { added: false }
        },
        validatorsCount: async () => {
            return BigInt(1)
        },
        addValidator: async (validatorAddress: string, signatures: {
            signerAddress: string;
            signature: string
        }[]) => {
           
            return {
                hash: "",
                wait: async () => {
                     
                    
                }
            }
        }
    }
}

export default getSecretBridgeContract