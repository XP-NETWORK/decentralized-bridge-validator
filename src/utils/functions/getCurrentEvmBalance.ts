import { ethers } from 'ethers';
import { erc20ABI } from '../../abi';
import { IGetCurrentEvmBalance } from '../types';


const getCurrentEvmBalance = async ({ rpc, coinAddress, accAddress }: IGetCurrentEvmBalance): Promise<bigint> => {
    try {
        const provider = new ethers.JsonRpcProvider(rpc);

        if (coinAddress) {
            const contract = new ethers.Contract(coinAddress, erc20ABI, provider);
            const rawBalance = await contract.balanceOf(accAddress);
            return BigInt(rawBalance.toString());
        }

        const rawBalance = await provider.getBalance(accAddress || "0x00");
        return BigInt(rawBalance.toString());
    } catch (e) {
        console.error("RPC issue:", rpc )
        throw ("Error while getCurrentEvmBalance")
    }
}

export default getCurrentEvmBalance;