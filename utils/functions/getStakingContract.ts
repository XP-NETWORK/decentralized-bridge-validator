import { Contract, ethers } from "ethers";

import { IEvmChainConfigAndEvmWallet } from "../types";
import {  ERC20Staking, ERC20Staking__factory } from "../../contractsTypes";


const getStakingContract = ({ evmChainConfig, evmWallet }: IEvmChainConfigAndEvmWallet): ERC20Staking => {
    const opProvider = new ethers.JsonRpcProvider(evmChainConfig.rpc);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);

    return ERC20Staking__factory.connect(evmChainConfig.contractAddress, opWallet);
}

export default getStakingContract