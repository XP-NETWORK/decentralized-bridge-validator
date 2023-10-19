import { Contract, ethers } from "ethers";
import { bridgeContractAbi } from "../../abi";
import { IGetEvmBridgeContract } from "../types";

const getEvmBridgeContract = ({ evmChainConfig, evmWallet }: IGetEvmBridgeContract): Contract => {
    const provider = new ethers.JsonRpcProvider(evmChainConfig.rpc);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    return new ethers.Contract(evmChainConfig.contractAddress, bridgeContractAbi, wallet);
}

export default getEvmBridgeContract