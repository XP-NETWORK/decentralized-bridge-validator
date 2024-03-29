/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
    Contract,
    ContractFactory,
    ContractTransactionResponse,
    Interface,
} from 'ethers';
import type { Signer, ContractDeployTransaction, ContractRunner } from 'ethers';
import type { NonPayableOverrides } from './../common';
import type {
    RoyaltyInfoProxy,
    RoyaltyInfoProxyInterface,
} from './RoyaltyInfoProxy';

const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'CallResponseEvent',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'bytes',
                name: 'encodedFunctionSelector',
                type: 'bytes',
            },
        ],
        name: 'redirectForToken',
        outputs: [
            {
                internalType: 'int256',
                name: 'responseCode',
                type: 'int256',
            },
            {
                internalType: 'bytes',
                name: 'response',
                type: 'bytes',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'int64',
                name: 'serialNumber',
                type: 'int64',
            },
        ],
        name: 'royaltyInfo',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
            {
                components: [
                    {
                        components: [
                            {
                                components: [
                                    {
                                        internalType: 'string',
                                        name: 'name',
                                        type: 'string',
                                    },
                                    {
                                        internalType: 'string',
                                        name: 'symbol',
                                        type: 'string',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'treasury',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'string',
                                        name: 'memo',
                                        type: 'string',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'tokenSupplyType',
                                        type: 'bool',
                                    },
                                    {
                                        internalType: 'int64',
                                        name: 'maxSupply',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'freezeDefault',
                                        type: 'bool',
                                    },
                                    {
                                        components: [
                                            {
                                                internalType: 'uint256',
                                                name: 'keyType',
                                                type: 'uint256',
                                            },
                                            {
                                                components: [
                                                    {
                                                        internalType: 'bool',
                                                        name: 'inheritAccountKey',
                                                        type: 'bool',
                                                    },
                                                    {
                                                        internalType: 'address',
                                                        name: 'contractId',
                                                        type: 'address',
                                                    },
                                                    {
                                                        internalType: 'bytes',
                                                        name: 'ed25519',
                                                        type: 'bytes',
                                                    },
                                                    {
                                                        internalType: 'bytes',
                                                        name: 'ECDSA_secp256k1',
                                                        type: 'bytes',
                                                    },
                                                    {
                                                        internalType: 'address',
                                                        name: 'delegatableContractId',
                                                        type: 'address',
                                                    },
                                                ],
                                                internalType:
                                                    'struct IHederaTokenService.KeyValue',
                                                name: 'key',
                                                type: 'tuple',
                                            },
                                        ],
                                        internalType:
                                            'struct IHederaTokenService.TokenKey[]',
                                        name: 'tokenKeys',
                                        type: 'tuple[]',
                                    },
                                    {
                                        components: [
                                            {
                                                internalType: 'int64',
                                                name: 'second',
                                                type: 'int64',
                                            },
                                            {
                                                internalType: 'address',
                                                name: 'autoRenewAccount',
                                                type: 'address',
                                            },
                                            {
                                                internalType: 'int64',
                                                name: 'autoRenewPeriod',
                                                type: 'int64',
                                            },
                                        ],
                                        internalType:
                                            'struct IHederaTokenService.Expiry',
                                        name: 'expiry',
                                        type: 'tuple',
                                    },
                                ],
                                internalType:
                                    'struct IHederaTokenService.HederaToken',
                                name: 'token',
                                type: 'tuple',
                            },
                            {
                                internalType: 'int64',
                                name: 'totalSupply',
                                type: 'int64',
                            },
                            {
                                internalType: 'bool',
                                name: 'deleted',
                                type: 'bool',
                            },
                            {
                                internalType: 'bool',
                                name: 'defaultKycStatus',
                                type: 'bool',
                            },
                            {
                                internalType: 'bool',
                                name: 'pauseStatus',
                                type: 'bool',
                            },
                            {
                                components: [
                                    {
                                        internalType: 'int64',
                                        name: 'amount',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'tokenId',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'useHbarsForPayment',
                                        type: 'bool',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'useCurrentTokenForPayment',
                                        type: 'bool',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'feeCollector',
                                        type: 'address',
                                    },
                                ],
                                internalType:
                                    'struct IHederaTokenService.FixedFee[]',
                                name: 'fixedFees',
                                type: 'tuple[]',
                            },
                            {
                                components: [
                                    {
                                        internalType: 'int64',
                                        name: 'numerator',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'int64',
                                        name: 'denominator',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'int64',
                                        name: 'minimumAmount',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'int64',
                                        name: 'maximumAmount',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'netOfTransfers',
                                        type: 'bool',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'feeCollector',
                                        type: 'address',
                                    },
                                ],
                                internalType:
                                    'struct IHederaTokenService.FractionalFee[]',
                                name: 'fractionalFees',
                                type: 'tuple[]',
                            },
                            {
                                components: [
                                    {
                                        internalType: 'int64',
                                        name: 'numerator',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'int64',
                                        name: 'denominator',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'int64',
                                        name: 'amount',
                                        type: 'int64',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'tokenId',
                                        type: 'address',
                                    },
                                    {
                                        internalType: 'bool',
                                        name: 'useHbarsForPayment',
                                        type: 'bool',
                                    },
                                    {
                                        internalType: 'address',
                                        name: 'feeCollector',
                                        type: 'address',
                                    },
                                ],
                                internalType:
                                    'struct IHederaTokenService.RoyaltyFee[]',
                                name: 'royaltyFees',
                                type: 'tuple[]',
                            },
                            {
                                internalType: 'string',
                                name: 'ledgerId',
                                type: 'string',
                            },
                        ],
                        internalType: 'struct IHederaTokenService.TokenInfo',
                        name: 'tokenInfo',
                        type: 'tuple',
                    },
                    {
                        internalType: 'int64',
                        name: 'serialNumber',
                        type: 'int64',
                    },
                    {
                        internalType: 'address',
                        name: 'ownerId',
                        type: 'address',
                    },
                    {
                        internalType: 'int64',
                        name: 'creationTime',
                        type: 'int64',
                    },
                    {
                        internalType: 'bytes',
                        name: 'metadata',
                        type: 'bytes',
                    },
                    {
                        internalType: 'address',
                        name: 'spenderId',
                        type: 'address',
                    },
                ],
                internalType: 'struct IHederaTokenService.NonFungibleTokenInfo',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [
            {
                internalType: 'int64',
                name: 'responseCode',
                type: 'int64',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'serialNumber',
                type: 'uint256',
            },
        ],
        name: 'transferFromNFT',
        outputs: [
            {
                internalType: 'int64',
                name: 'responseCode',
                type: 'int64',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;

const _bytecode =
    '0x6080806040523461001657611480908161001c8239f35b600080fdfe60e080604052600436101561001357600080fd5b60003560e01c90816315dacbea1461111657508063618dc65e14610f8c5780639b23d3d914610efe5763e79342ce1461004b57600080fd5b34610b88576040366003190112610b885761006461114c565b602435908160070b809203610b885761007b611294565b50610084611294565b5060405163050fc3b560e31b602082019081526001600160a01b03909216602482015260448082019390935291825260808201906001600160401b03821183831017610ee15760009283926040525190826101675af16100e2611356565b60a0526100ed611294565b9015610ef7575060a0515160a0510160c052604060a05160c0510312610b885761011b602060a05101611386565b604060a05101516080526001600160401b0360805111610b885760c060805160a0510181510312610b885760405190610153826111a3565b602060805160a0510101516001600160401b038111610b88576101208160805160a051010160c0510312610b88576040519061018e826111be565b60208160805160a051010101516001600160401b038111610b8857610160818360805160a05101010160c0510312610b8857604051906101cd826111be565b6020818460805160a05101010101516001600160401b038111610b88576102089060208060c0510191848760805160a0510101010101611394565b82526040818460805160a05101010101516001600160401b038111610b88576102459060208060c0510191848760805160a0510101010101611394565b60208301526102606060828560805160a051010101016113d9565b604083015260808184825160a05101010101516001600160401b038111610b885761029f9060208060c0510191848760805160a0510101010101611394565b60608301526102b960a082856080518351010101016113ed565b60808301526102d460c0828560805160a051010101016113fa565b60a08301526102ef60e0828560805160a051010101016113ed565b60c0830152610100818460805160a05101010101516001600160401b038111610b8857602060c05101603f82848760805160a05101010101011215610b8857602081838660805160a0510101010101519061034982611408565b916103576040519384611210565b80835260208301602060c0510160408360051b85888b60805160a05101010101010111610b8857604083868960805160a0510101010101905b60408360051b85888b60805160a0510101010101018210610d1e575050505060e0830152606060ff19828560805160a05101010160c051030112610b8857610426610160604051926103e1846111f5565b6103f8610120828860805160a051010101016113fa565b8452610411610140828860805160a051010101016113d9565b60208501528560805160a051010101016113fa565b6040820152610100820152825261044760408260805160a0510101016113fa565b602083015261046060608260805160a0510101016113ed565b6040830152610478608082815160a0510101016113ed565b606083015261049060a08260805182510101016113ed565b608083015260c08160805160a051010101516001600160401b038111610b8857602060c05101603f828460805160a051010101011215610b88576020818360805160a0510101010151906104e382611408565b916104f16040519384611210565b8083526020830191602060c05101604060a08402838860805160a051010101010111610b8857916040838660805160a05101010101925b604060a08402828860805160a05101010101018410610ca3575050505060a083015260e08160805160a051010101516001600160401b038111610b8857602060c05101603f828460805160a051010101011215610b88576020818360805160a05101010101519061059882611408565b916105a66040519384611210565b8083526020830191602060c05101604060c08402838860805160a051010101010111610b8857916040838660805160a05101010101925b604060c08402828860805160a05101010101018410610c18575050505060c08301526101008160805160a051010101516001600160401b038111610b8857602060c05101603f828460805160a051010101011215610b88576020818360805160a05101010101519061064e82611408565b9161065c6040519384611210565b8083526020830191602060c05101604060c08402838860805160a051010101010111610b8857916040838660805160a05101010101925b604060c08402828860805160a05101010101018410610b8d575050505060e08301526101208160805160a05101010151906001600160401b038211610b885760206106ed928160c051019260805160a05101010101611394565b6101008201528252610707604060805160a05101016113fa565b602083015261071e606060805160a05101016113d9565b60408301526107346080805160a05101016113fa565b606083015260a060805181510101516001600160401b038111610b885761076b9060208060c051019160805160a051010101611394565b608083015261078260c060805160a05101016113d9565b60a08301525b6040519060030b81526040602082015281519160c060408301528251926101206101008401526108116107e56107cd865161016061022088015261038087019061126f565b602087015186820361021f190161024088015261126f565b60408601516001600160a01b0316610260860152606086015185820361021f190161028087015261126f565b93608081015115156102a085015260a081015160070b6102c085015260c081015115156102e085015260e08101519461021f1985820301610300860152855180825260208201916020808360051b8301019801926000915b838310610af85750505050506101006040910151805160070b61032086015260018060a01b03602082015116610340860152015160070b610360840152602081015160070b61012084015260408101511515610140840152606081015115156101608401526080810151151561018084015260a08101519360ff19848203016101a08501526020808651928381520195019060005b818110610aa25750505060c08101519360ff19848203016101c08501526020808651928381520195019060005b818110610a415750505060e08101519360ff19848203016101e08501526020808651928381520195019060005b8181106109dc5750505061098283946101006109c493015160ff198683030161020087015261126f565b602083015160070b606085015260018060a01b036040840151166080850152606083015160070b60a08501526080830151603f198583030160c086015261126f565b60a0909101516001600160a01b031660e08301520390f35b909195602060c06001928951805160070b82528381015160070b84830152604081015160070b6040830152848060a01b03606082015116606083015260808101511515608083015260a08580821b039101511660a08201520197019101919091610958565b909195602060c06001928951805160070b82528381015160070b84830152604081015160070b6040830152606081015160070b606083015260808101511515608083015260a08580821b039101511660a0820152019701910191909161092b565b8251805160070b88526020818101516001600160a01b03908116828b01526040808401511515908b01526060808401511515908b0152608092830151169189019190915260a090970196909201916001016108fe565b9091929398602080600192601f19858203018652818d5180518352015190604083820152815115156040820152848060a01b038383015116606082015260c0610b69610b53604085015160a0608086015260e085019061126f565b6060850151848203603f190160a086015261126f565b926080878060a01b03910151169101529b019301930191939290610869565b600080fd5b60c06020858251030112610b885760c08060206040948551610bae816111a3565b610bb7896113fa565b8152610bc4838a016113fa565b83820152610bd3878a016113fa565b87820152610be360608a016113d9565b6060820152610bf460808a016113ed565b6080820152610c0560a08a016113d9565b60a0820152815201950194925050610693565b60c06020858251030112610b885760c08060206040948551610c39816111a3565b610c42896113fa565b8152610c4f838a016113fa565b83820152610c5e878a016113fa565b87820152610c6e60608a016113fa565b6060820152610c7f60808a016113ed565b6080820152610c9060a08a016113d9565b60a08201528152019501949250506105dd565b60a060208560c051030112610b885760a08060206040948551610cc5816111da565b610cce896113fa565b8152610cdb838a016113d9565b83820152610cea878a016113ed565b87820152610cfa60608a016113ed565b6060820152610d0b60808a016113d9565b6080820152815201950194925050610528565b8151906001600160401b038211610b88576040601f1983878a8d60805160a051010101010160c051030112610b8857604051908160408101106001600160401b03604084011117610ee15760408201604052604083878a8d60805160a051010101010101518252606083878a8d60805160a05101010101010151906001600160401b038211610b885760a08b83868a8d601f1994608051875101010101010160c051030112610b88578a92608083868a8d60405198610ddc8a6111da565b610df7604086868686868c5160a051010101010101016113ed565b8a52610e14606086868686868c5160a051010101010101016113d9565b60208b0152855160a05101010101010101516001600160401b038111610b885783868a8f8e90610e6060a0966040602060c051019188888888886080518f510101010101010101611394565b60408b015260805186510101010101010151936001600160401b038511610b8857610ecb60c0602096958f988c8f60409b610eb48c9b8e8d89510191888888888860805160a0510101010101010101611394565b606089015260805160a051010101010101016113d9565b6080820152838201528152019201919050610390565b634e487b7160e01b600052604160045260246000fd5b6015610788565b34610b8857600080610f47610f39610f1536611162565b6040959395949194519485936020850197639b23d3d960e01b89526024860161141f565b03601f198101835282611210565b5190826101675af1610f57611356565b9015610f8257602081805181010312610b8857610f776020809201611386565b6040519060030b8152f35b5060206015610f77565b34610b88576040366003190112610b8857610fa561114c565b6001600160401b03602435818111610b885736602382011215610b8857806004013592610fd184611231565b90610fdf6040519283611210565b8482526020943660248286010111610b885761104360009493858884610f399560248499018386013783010152604080516330c6e32f60e11b8a82019081526001600160a01b0390961660248201526044810191909152928391606483019061126f565b5190826101675af190611054611356565b917f4af4780e06fe8cb9df64b0794fa6f01399af979175bb988e35e0e57e594567bc604051821515815260408682015280611092604082018761126f565b0390a1156110f1578151820190604083830312610b88576110b4848401611386565b926040810151918211610b8857846110d492816110ed9501920101611394565b6040805194859460030b8552840152604083019061126f565b0390f35b604051915082820190811182821017610ee157604052600081526110ed6015916110d4565b34610b88576000610f3982610f47839461112f36611162565b630aed65f560e11b6020860190815297939092906024860161141f565b600435906001600160a01b0382168203610b8857565b6080906003190112610b88576001600160a01b036004358181168103610b8857916024358281168103610b8857916044359081168103610b88579060643590565b60c081019081106001600160401b03821117610ee157604052565b61012081019081106001600160401b03821117610ee157604052565b60a081019081106001600160401b03821117610ee157604052565b606081019081106001600160401b03821117610ee157604052565b90601f801991011681019081106001600160401b03821117610ee157604052565b6001600160401b038111610ee157601f01601f191660200190565b60005b83811061125f5750506000910152565b818101518382015260200161124f565b906020916112888151809281855285808601910161124c565b601f01601f1916010190565b6040908151916112a3836111a3565b60a08382516112b1816111be565b83516112bc816111be565b606094859283835283602084015260009683888481960152818082015284608082015284888201528460c08201528160e08201526101009084516112ff816111f5565b86815286602082015286868201528282015283528460208401528484840152848284015284608084015281888401528160c08401528160e08401528201528452816020850152830152838183015260808201520152565b3d15611381573d9061136782611231565b916113756040519384611210565b82523d6000602084013e565b606090565b51908160030b8203610b8857565b81601f82011215610b885780516113aa81611231565b926113b86040519485611210565b81845260208284010111610b88576113d6916020808501910161124c565b90565b51906001600160a01b0382168203610b8857565b51908115158203610b8857565b51908160070b8203610b8857565b6001600160401b038111610ee15760051b60200190565b6001600160a01b0391821681529181166020830152909116604082015260608101919091526080019056fea2646970667358221220f280be1220d335bedcfae3a53dc043a668d7411464fe1ed7c9087254d7c71d0564736f6c63430008150033';

type RoyaltyInfoProxyConstructorParams =
    | [signer?: Signer]
    | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
    xs: RoyaltyInfoProxyConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RoyaltyInfoProxy__factory extends ContractFactory {
    constructor(...args: RoyaltyInfoProxyConstructorParams) {
        if (isSuperArgs(args)) {
            super(...args);
        } else {
            super(_abi, _bytecode, args[0]);
        }
    }

    override getDeployTransaction(
        overrides?: NonPayableOverrides & { from?: string },
    ): Promise<ContractDeployTransaction> {
        return super.getDeployTransaction(overrides || {});
    }
    override deploy(overrides?: NonPayableOverrides & { from?: string }) {
        return super.deploy(overrides || {}) as Promise<
            RoyaltyInfoProxy & {
                deploymentTransaction(): ContractTransactionResponse;
            }
        >;
    }
    override connect(runner: ContractRunner | null): RoyaltyInfoProxy__factory {
        return super.connect(runner) as RoyaltyInfoProxy__factory;
    }

    static readonly bytecode = _bytecode;
    static readonly abi = _abi;
    static createInterface(): RoyaltyInfoProxyInterface {
        return new Interface(_abi) as RoyaltyInfoProxyInterface;
    }
    static connect(
        address: string,
        runner?: ContractRunner | null,
    ): RoyaltyInfoProxy {
        return new Contract(
            address,
            _abi,
            runner,
        ) as unknown as RoyaltyInfoProxy;
    }
}
