import { ethers } from "ethers";

import { IEvmChainConfigAndEvmWallet } from "../types";
import { BridgeStorage, BridgeStorage__factory } from "../../contractsTypes";


const getStorageContract = ({ evmChainConfig, evmWallet }: IEvmChainConfigAndEvmWallet): BridgeStorage => {
    const opProvider = new ethers.JsonRpcProvider(evmChainConfig.rpc);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);
    return BridgeStorage__factory.connect(evmChainConfig.contractAddress, opWallet);
}

export default getStorageContract