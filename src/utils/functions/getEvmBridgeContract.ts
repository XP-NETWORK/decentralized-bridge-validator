import { BytesLike, ethers } from 'ethers';
import { Bridge, Bridge__factory } from '../../contractsTypes';
import { IBridge, IEvmChainConfigAndEvmWallet } from '@src/types';
import { SupportedChains } from '@src/config/chainSpecs';

export type EvmLockArgs = [
    sourceNftContractAddress: string,
    tokenId: string,
    destinationChain: SupportedChains,
    address: string,
];

const getEvmBridgeContract = ({
    evmChainConfig,
    evmWallet,
}: IEvmChainConfigAndEvmWallet): IBridge<
    EvmLockArgs,
    Bridge.ClaimDataStruct,
    BytesLike
> => {
    const provider = new ethers.JsonRpcProvider(evmChainConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    return Bridge__factory.connect(evmChainConfig.contractAddress, wallet);
};

export default getEvmBridgeContract;
