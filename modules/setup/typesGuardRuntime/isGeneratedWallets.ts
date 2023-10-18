import { IGeneratedWallets } from "../types";
import isEvmWallet from "./isEvmWallet";

function isGeneratedWallets(object: any): object is IGeneratedWallets {
    return 'evmWallet' in object && 
           isEvmWallet(object.evmWallet);
}

export default isGeneratedWallets