import { Contract, ethers } from "ethers";
import { bridgeStorageAbi } from "../../abi";
import { IGetStorageContract } from "../types";


const getStorageContract = ({ storageChainConfig, evmWallet }: IGetStorageContract): Contract => {
    const opProvider = new ethers.JsonRpcProvider(storageChainConfig.rpc);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);
    return new ethers.Contract(storageChainConfig.contractAddress, bridgeStorageAbi, opWallet);
}

export default getStorageContract