import { ethers } from "ethers";

import { ERC20Staking, ERC20Staking__factory } from "../../contractsTypes";
import { IStakingChainConfigAndEvmWallet } from "@src/types";


const getStakingContract = ({ stakingChainConfig, evmWallet }: IStakingChainConfigAndEvmWallet): ERC20Staking => {
    const opProvider = new ethers.JsonRpcProvider(stakingChainConfig.rpcURL);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);

    return ERC20Staking__factory.connect(stakingChainConfig.contractAddress, opWallet);
}

export default getStakingContract