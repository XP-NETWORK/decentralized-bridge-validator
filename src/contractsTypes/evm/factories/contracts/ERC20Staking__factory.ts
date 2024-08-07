/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ERC20Staking,
  ERC20StakingInterface,
} from "../../contracts/ERC20Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakingAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_ERC20Token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "validatorAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "chainType",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct ValidatorAddressAndChainType[]",
        name: "validatorAddressAndChainType",
        type: "tuple[]",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    inputs: [],
    name: "ERC20Token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "validatorAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "chainType",
            type: "string",
          },
        ],
        internalType: "struct ValidatorAddressAndChainType[]",
        name: "_validatorAddressAndChainType",
        type: "tuple[]",
      },
    ],
    name: "addNewChains",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "validatorAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "chainType",
            type: "string",
          },
        ],
        internalType: "struct ValidatorAddressAndChainType[]",
        name: "_validatorAddressAndChainType",
        type: "tuple[]",
      },
    ],
    name: "stakeERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60803461007e57601f61060738819003918201601f19168301916001600160401b0383118484101761008357808492604094855283398101031261007e5780516020909101516001600160a01b038116919082900361007e57600055600180546001600160a01b03191691909117905560405161056d908161009a8239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060409080825260048036101561001657600080fd5b600091823560e01c90816361b8b5dc1461028457508063739a3e02146102675780637a80760e1461023e5780637ca41e37146100f55763f6215e091461005b57600080fd5b346100f15761006936610350565b90338352600260205283832054156100b5575081926100af7ff6f745aefa7fce6b76ac5309c1cf0d4c5c42a9107f80667e6cc03d1f5a854bed93549151928392836104ac565b0390a180f35b606490602085519162461bcd60e51b83528201526016602482015275596f75206861766520746f207374616b65206f6e636560501b6044820152fd5b5080fd5b5091346100f15761010536610350565b90338352602060028152818420546101fc57838160018060a01b036001541660648354865194859384926323b872dd60e01b8452338d85015230602485015260448401525af180156101f2576101b7575b5060028454913386525281842080549182018092116101a4577ff6f745aefa7fce6b76ac5309c1cf0d4c5c42a9107f80667e6cc03d1f5a854bed949550556100af84549151928392836104ac565b634e487b7160e01b855260118652602485fd5b8181813d83116101eb575b6101cc81836102bc565b810103126101e75751801515036101e35738610156565b8380fd5b8480fd5b503d6101c2565b83513d87823e3d90fd5b8490606492519162461bcd60e51b8352820152601760248201527f596f752063616e206f6e6c79207374616b65206f6e63650000000000000000006044820152fd5b8284346100f157816003193601126100f15760015490516001600160a01b039091168152602090f35b8284346100f157816003193601126100f157602091549051908152f35b91849150346101e35760203660031901126101e357356001600160a01b038116908190036101e3579260209381526002845220548152f35b90601f8019910116810190811067ffffffffffffffff8211176102de57604052565b634e487b7160e01b600052604160045260246000fd5b81601f8201121561034b5780359067ffffffffffffffff82116102de5760405192610329601f8401601f1916602001856102bc565b8284526020838301011161034b57816000926020809301838601378301015290565b600080fd5b60208060031983011261034b5760049182359067ffffffffffffffff9081831161034b578060238401121561034b578285013594602490838711610459578660051b926040928351986103a58987018b6102bc565b895280888a01958801019682881161034b57818101955b8887106103d0575050505050505050505090565b863588811161034b5782019086602319838703011261034b578651908782018281108b821117610444578852848301358a811161034b578686610415928601016102f4565b82526044830135918a831161034b5761043587878f9695879601016102f4565b838201528152019601956103bc565b634e487b7160e01b6000908152604189528690fd5b604190634e487b7160e01b600052526000fd5b919082519283825260005b848110610498575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201610477565b9060409182810191815260209083828201528451809352606081018260608560051b8401019601946000925b8584106104e9575050505050505090565b909192939495968580610526600193605f198682030188528b51908361051683518a84528a84019061046c565b920151908481840391015261046c565b9901940194019295949391906104d856fea264697066735822122087fd3f7862d6426bc1dbfbc32a81c16fbcc1fce15f695445f710afaaf50409b664736f6c63430008150033";

type ERC20StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Staking__factory extends ContractFactory {
  constructor(...args: ERC20StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _stakingAmount: BigNumberish,
    _ERC20Token: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _stakingAmount,
      _ERC20Token,
      overrides || {}
    );
  }
  override deploy(
    _stakingAmount: BigNumberish,
    _ERC20Token: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _stakingAmount,
      _ERC20Token,
      overrides || {}
    ) as Promise<
      ERC20Staking & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20Staking__factory {
    return super.connect(runner) as ERC20Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20StakingInterface {
    return new Interface(_abi) as ERC20StakingInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC20Staking {
    return new Contract(address, _abi, runner) as unknown as ERC20Staking;
  }
}
