import { ethers } from 'ethers';
import { erc20ABI } from '../../abi';


const getCurrentEvmBalance = async (configs: IEvmChainConfigAndEvmWallet | IStakingChainConfigAndEvmWallet): Promise<bigint> => {
    try {
        const rpc = "stakingChainConfig" in configs ? configs.stakingChainConfig.rpcURL : configs.evmChainConfig.rpcURL;
        const provider = new ethers.JsonRpcProvider(rpc);
        if ("stakingChainConfig" in configs) {
            const contract = new ethers.Contract(configs.stakingChainConfig.coinAddress, erc20ABI, provider);
            const rawBalance = await contract.balanceOf(configs.evmWallet.address);
            return BigInt(rawBalance.toString());
        }

        const rawBalance = await provider.getBalance(configs.evmWallet.address);
        return BigInt(rawBalance.toString());
    } catch (e) {
        console.error("RPC issue:", { configs })
        throw ("Error while getCurrentEvmBalance")
    }
}

export default getCurrentEvmBalance;