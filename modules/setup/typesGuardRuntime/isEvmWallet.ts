import { IEvmWallet } from "../types";

function isEvmWallet(object: any): object is IEvmWallet {
    return 'address' in object && 
           typeof object.address === 'string' &&
           'privateKey' in object && 
           typeof object.privateKey === 'string';
}

export default isEvmWallet

