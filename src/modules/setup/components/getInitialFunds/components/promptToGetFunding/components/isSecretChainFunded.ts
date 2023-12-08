import { ISecretChainConfigAndSecretWallet } from "@src/types";
import { getCurrentSecretBalance } from "@src/utils";

 
const formatSecret = (amount : bigint) => {
    return amount / BigInt(1e6)
}


const isSecretChainFunded = async ({ secretChainConfig, secretWallet }: ISecretChainConfigAndSecretWallet): Promise<boolean> => {
    let isFunded = true;
    try {
        const currentBalance = await getCurrentSecretBalance({ secretChainConfig, secretWallet });
        const remainingRaw = BigInt(secretChainConfig.intialFund) - BigInt(currentBalance);

        const remainingFund = formatSecret(remainingRaw)
        if (currentBalance < BigInt(secretChainConfig.intialFund)) {
            isFunded = false
            console.info(`Current balance: ${formatSecret(currentBalance)}; Fund chain your wallet ${secretWallet.publicKey} on ${secretChainConfig.chain} with ${remainingFund} ${secretChainConfig.nativeCoinSymbol}.`);
        }

        return isFunded
    } catch (e) {
        throw (`Error while isSecretChainFunded, orignal error: ${e}`)
    }
}

export default isSecretChainFunded