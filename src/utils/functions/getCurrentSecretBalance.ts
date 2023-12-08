import { ISecretChainConfigAndSecretWallet } from '@src/types';
import { SecretNetworkClient } from 'secretjs';


const getCurrentSecretBalance = async (configs: ISecretChainConfigAndSecretWallet): Promise<bigint> => {
    try {

        const secretjs = new SecretNetworkClient({
            url: configs.secretChainConfig.rpcURL,
            chainId: configs.secretChainConfig.chainId,
        });

        const { balance } = await secretjs.query.bank.balance({
            address: configs.secretWallet.publicKey,
            denom: "uscrt",
        });
        
        return BigInt(balance.amount);
    } catch (e) {
        console.error("RPC issue:", { configs })
        throw ("Error while getCurrentSecretBalance")
    }
}

export default getCurrentSecretBalance;