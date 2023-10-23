import {  ethers } from "ethers";
import { IEvmChainConfigAndEvmWallet } from "../types";
import { Bridge, Bridge__factory } from "../../contractsTypes";

const getEvmBridgeContract = ({ evmChainConfig, evmWallet }: IEvmChainConfigAndEvmWallet): Bridge => {
    const provider = new ethers.JsonRpcProvider(evmChainConfig.rpc);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    return Bridge__factory.connect(evmChainConfig.contractAddress, wallet);
}

export default getEvmBridgeContract