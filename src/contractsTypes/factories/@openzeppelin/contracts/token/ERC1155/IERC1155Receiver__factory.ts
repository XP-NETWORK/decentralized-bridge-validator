/* Autogenerated file. Do not edit manually. */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers';
import type {
    IERC1155Receiver,
    IERC1155ReceiverInterface,
} from '../../../../../@openzeppelin/contracts/token/ERC1155/IERC1155Receiver';

const _abi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'uint256[]',
                name: 'ids',
                type: 'uint256[]',
            },
            {
                internalType: 'uint256[]',
                name: 'values',
                type: 'uint256[]',
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'onERC1155BatchReceived',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'onERC1155Received',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'interfaceId',
                type: 'bytes4',
            },
        ],
        name: 'supportsInterface',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
] as const;

export class IERC1155Receiver__factory {
    static readonly abi = _abi;
    static createInterface(): IERC1155ReceiverInterface {
        return new Interface(_abi) as IERC1155ReceiverInterface;
    }
    static connect(
        address: string,
        runner?: ContractRunner | null,
    ): IERC1155Receiver {
        return new Contract(
            address,
            _abi,
            runner,
        ) as unknown as IERC1155Receiver;
    }
}
