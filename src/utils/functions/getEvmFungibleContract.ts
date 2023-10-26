import { ethers } from "ethers";

import { ERC20Token, ERC20Token__factory } from "../../contractsTypes";
import { IStakingChainConfigAndEvmWallet } from "@src/types";


const getEvmFungibleContract = ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): ERC20Token => {
    const opProvider = new ethers.JsonRpcProvider(stakingChainConfig.rpcURL);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);

    return ERC20Token__factory.connect(stakingChainConfig.contractAddress, opWallet);
}

export default getEvmFungibleContract