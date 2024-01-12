import { ethers } from 'ethers';
import { erc20ABI } from '../../abi';
import {
    IEvmChainConfigAndEvmWallet,
    IHederaChainConfigAndEvmWallet,
    IStakingChainConfigAndEvmWallet,
} from '@src/types';

const getCurrentHederaBalance = async (
    configs: IHederaChainConfigAndEvmWallet | IStakingChainConfigAndEvmWallet,
): Promise<bigint> => {
    try {
        const rpc =
            'stakingChainConfig' in configs
                ? configs.stakingChainConfig.rpcURL
                : configs.hederaChainConfig.rpcURL;
        const provider = new ethers.JsonRpcProvider(rpc);
        if ('stakingChainConfig' in configs) {
            const contract = new ethers.Contract(
                configs.stakingChainConfig.coinAddress,
                erc20ABI,
                provider,
            );
            const rawBalance = await contract.balanceOf(
                configs.evmWallet.address,
            );
            return BigInt(rawBalance.toString());
        }

        const rawBalance = await provider.getBalance(configs.evmWallet.address);
        return BigInt(rawBalance.toString());
    } catch (e) {
        console.error('RPC issue:', { configs });
        throw 'Error while getCurrentEvmBalance';
    }
};

export default getCurrentHederaBalance;
