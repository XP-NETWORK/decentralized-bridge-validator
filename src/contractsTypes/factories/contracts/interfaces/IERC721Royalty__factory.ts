/* Autogenerated file. Do not edit manually. */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers';
import type {
    IERC721Royalty,
    IERC721RoyaltyInterface,
} from '../../../contracts/interfaces/IERC721Royalty';

const _abi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'royalty',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'royaltyReceiver',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'tokenURI',
                type: 'string',
            },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'salePrice',
                type: 'uint256',
            },
        ],
        name: 'royaltyInfo',
        outputs: [
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'royaltyAmount',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
] as const;

export class IERC721Royalty__factory {
    static readonly abi = _abi;
    static createInterface(): IERC721RoyaltyInterface {
        return new Interface(_abi) as IERC721RoyaltyInterface;
    }
    static connect(
        address: string,
        runner?: ContractRunner | null,
    ): IERC721Royalty {
        return new Contract(address, _abi, runner) as unknown as IERC721Royalty;
    }
}
