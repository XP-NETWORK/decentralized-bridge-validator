import { ethers } from 'ethers';
import { Bridge, Bridge__factory } from '../../contractsTypes';
import { IEvmChainConfigAndEvmWallet } from '@src/types';

const getEvmBridgeContract = ({
    evmChainConfig,
    evmWallet,
}: IEvmChainConfigAndEvmWallet): Bridge => {
    const provider = new ethers.JsonRpcProvider(evmChainConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    return Bridge__factory.connect(evmChainConfig.contractAddress, wallet);
};

export default getEvmBridgeContract;
