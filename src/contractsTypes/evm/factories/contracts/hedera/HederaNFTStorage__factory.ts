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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  HederaNFTStorage,
  HederaNFTStorageInterface,
} from "../../../contracts/hedera/HederaNFTStorage";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_collectionAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
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
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "CallResponseEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "int64",
        name: "tokenId",
        type: "int64",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "claimContract",
    outputs: [
      {
        internalType: "contract INFTClaim",
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
        internalType: "int64",
        name: "serialNum",
        type: "int64",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "claimNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collectionAddress",
    outputs: [
      {
        internalType: "address",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "depositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
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
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "encodedFunctionSelector",
        type: "bytes",
      },
    ],
    name: "redirectForToken",
    outputs: [
      {
        internalType: "int256",
        name: "responseCode",
        type: "int256",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "int64",
        name: "responseCode",
        type: "int64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "transferFromNFT",
    outputs: [
      {
        internalType: "int64",
        name: "responseCode",
        type: "int64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "unlockToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040908082523461012d5781816111b580380380916100208285610132565b83398101031261012d5760206100358261016b565b916001600160a01b0391829161004b910161016b565b169160018060a01b0319926020836000938493878554161784551680866001541617600155600487518094819363053aa6f360e11b83525af18015610123576100f5575b5083516106b5808201906001600160401b038211838310176100e157908291610b008339039082f09081156100d65750169060025416176002555161098090816101808239f35b8451903d90823e3d90fd5b634e487b7160e01b84526041600452602484fd5b602090813d811161011c575b61010b8183610132565b81010312610119573861008f565b80fd5b503d610101565b85513d84823e3d90fd5b600080fd5b601f909101601f19168101906001600160401b0382119082101761015557604052565b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b038216820361012d5756fe608060408181526004918236101561001657600080fd5b600092833560e01c91826315dacbea146106c357508163618dc65e1461054c5781636215be771461050457816366345da4146104db5781636aa00371146104b25781637326afe0146102915781637ad4362914610159575080638da5cb5b1461013257639b23d3d91461008857600080fd5b3461012e5781806020936100f16100e36100a136610739565b8951639b23d3d960e01b8c82019081526001600160a01b03958616602483015293851660448201529390911660648401526084830152929091829060a4820190565b03601f1981018352826107a4565b5190826101675af1610101610867565b9150156101255780838061011a93518301019101610897565b905b519060030b8152f35b5060159061011c565b5080fd5b503461012e578160031936011261012e57905490516001600160a01b039091168152602090f35b90503461028d578160031936011261028d578035918260070b928381036102895761018261071e565b60025486906001600160a01b0316803b1561012e5784516301dab85560e11b8152338188019081526001600160a01b0385166020820152600786900b60408201529091839183919082908490829060600103925af1801561027f57610267575b50506016916101f491339030906108b0565b0361022457505033307fcef55929759435389feb62e3ad30d90911d061d3eb8f8e3ead60622531745cc18480a480f35b906020606492519162461bcd60e51b8352820152601860248201527f4661696c656420746f207472616e7366657220746f6b656e00000000000000006044820152fd5b6102709061077a565b61027b5785386101e2565b8580fd5b85513d84823e3d90fd5b8480fd5b8280fd5b9190503461028d578060031936011261028d578135916102af61071e565b845490936001600160a01b0391821633036104615781600154169084516331a9108f60e11b81528185820152602081602481865afa908115610457578891610419575b5083309116036103c1579161031d8695949267ffffffffffffffff89951660070b96879130906108b0565b9560b88714610337575b8361033460168914610822565b80f35b8160025416916001541692823b156102895785516313b87c7360e01b81526001600160a01b0392831691810191825291909316602084015260079590950b6040830152849182908490829060600103925af19081156103b857506103a0575b8083818080610327565b61033491926103b060169261077a565b929150610396565b513d85823e3d90fd5b845162461bcd60e51b8152602081860152602c60248201527f5468697320636f6e7472616374206973206e6f7420746865206f776e6572206f60448201526b33103a3434b9903a37b5b2b760a11b6064820152608490fd5b90506020813d821161044f575b81610433602093836107a4565b8101031261044b5751838116810361044b57386102f2565b8780fd5b3d9150610426565b86513d8a823e3d90fd5b835162461bcd60e51b8152602081850152602560248201527f4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e60448201526431ba34b7b760d91b6064820152608490fd5b50503461012e578160031936011261012e5760015490516001600160a01b039091168152602090f35b50503461012e578160031936011261012e5760025490516001600160a01b039091168152602090f35b83903461012e57602036600319011261012e5760015461033491601691610546913567ffffffffffffffff1660070b90309033906001600160a01b03166108b0565b14610822565b8284346106c057816003193601126106c05782356001600160a01b038116929083900361012e576024359267ffffffffffffffff908185116106bc57366023860112156106bc57848601356105a0816107c6565b906105ad855192836107a4565b80825260209636602483830101116106b85761060287949293858a86829760246100e39701838601378301015287519283918b8301956330c6e32f60e11b8752602484015289604484015260648301906107e2565b5190826101675af192610613610867565b937f4af4780e06fe8cb9df64b0794fa6f01399af979175bb988e35e0e57e594567bc8451821515815285888201528061064e878201896107e2565b0390a11561067e57505061067a91929350601692905b80805195869560030b86528501528301906107e2565b0390f35b8251935090848401908111848210176106a55761067a939495508252835260159290610664565b634e487b7160e01b825260418652602482fd5b8680fd5b8380fd5b80fd5b9150503461028d579180806100e3856100f16020976106e136610739565b630aed65f560e11b858e019081526001600160a01b03948516602487015292841660448601529216606484015260848301919091529360a4820190565b602435906001600160a01b038216820361073457565b600080fd5b6080906003190112610734576001600160a01b0360043581811681036107345791602435828116810361073457916044359081168103610734579060643590565b67ffffffffffffffff811161078e57604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff82111761078e57604052565b67ffffffffffffffff811161078e57601f01601f191660200190565b919082519283825260005b84811061080e575050826000602080949584010152601f8019910116010190565b6020818301810151848301820152016107ed565b1561082957565b60405162461bcd60e51b815260206004820152601660248201527511985a5b1959081d1bc81d1c985b9cd9995c8813919560521b6044820152606490fd5b3d15610892573d90610878826107c6565b9161088660405193846107a4565b82523d6000602084013e565b606090565b9081602091031261073457518060030b81036107345790565b604051635cfc901160e01b602082019081526001600160a01b03928316602483015292821660448201529216606483015260079290920b60848083019190915281529060c082019067ffffffffffffffff82118383101761078e5760009283926040525190826101675af1610923610867565b9015610942578060208061093c93518301019101610897565b60030b90565b50601561093c56fea2646970667358221220c32474f17254aa7c7a2432efc9aad917993404f88a0f1ce5232e645d31ba7fda64736f6c634300081500336080806040523461007a5733156100645760008054336001600160a01b03198216811783556040519290916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a361063590816100808239f35b631e4fbdf760e01b815260006004820152602490fd5b600080fdfe604060808152600436101561001357600080fd5b600090813560e01c806303b570aa146103155780630b5d6cab146102225780630e44263a146101ea57806313b87c7314610178578063715018a61461011b5780638da5cb5b146100f45763f2fde38b1461006c57600080fd5b346100f05760203660031901126100f0576100856103d1565b61008d61042b565b6001600160a01b039081169182156100d9575082546001600160a01b0319811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b51631e4fbdf760e01b815260048101849052602490fd5b5080fd5b50346100f057816003193601126100f057905490516001600160a01b039091168152602090f35b823461017557806003193601126101755761013461042b565b80546001600160a01b03198116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b80fd5b50346100f0576101c29061018b366103ec565b93909261019661042b565b60018060a01b0380931692838752600160205281872094169384875260205285209360070b809461058c565b507f44b4992efa0f4a2ef0ab6c12e382a8912e85b95be1d0c1ef675f3ec8eb4c072f8480a480f35b50903461017557602036600319011261017557506004356bffffffffffffffffffffffff8251918060601c83521660070b6020820152f35b50346100f057806003193601126100f05761023b6103d1565b6001600160a01b036024358181169290839003610311571683526001926020918483528382209082528252828120918351918183818654918281520190819684528284209089855b8281106102fc5750505050849003601f01601f1916840195905067ffffffffffffffff8611848710176102e85792869284878096528186019282875251809352850195925b8281106102d55785870386f35b83518752958101959281019284016102c8565b634e487b7160e01b82526041600452602482fd5b83548552879590940193928101928101610283565b8480fd5b50346100f057610324366103ec565b90919261032f61042b565b60018060a01b0380941693848652600160205281862093169283865260205261036581862067ffffffffffffffff841690610485565b15610396575060070b917fb07fa4a51e7b16a069203e783265a3ef2a613ec877f5c502ffd9694079204ac18480a480f35b5162461bcd60e51b815260206004820152601560248201527410d85b9b9bdd0818db185a5b481d1a1a5cc81b999d605a1b6044820152606490fd5b600435906001600160a01b03821682036103e757565b600080fd5b60609060031901126103e7576001600160a01b039060043582811681036103e7579160243590811681036103e757906044358060070b81036103e75790565b6000546001600160a01b0316330361043f57565b60405163118cdaa760e01b8152336004820152602490fd5b805482101561046f5760005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b9060018201906000928184528260205260408420549081151560001461058557600019918083018181116105715782549084820191821161055d57818103610511575b505050805480156104fd578201916104e08383610457565b909182549160031b1b191690555582526020526040812055600190565b634e487b7160e01b86526031600452602486fd5b6105486105216105319386610457565b90549060031b1c92839286610457565b819391549060031b91821b91600019901b19161790565b905586528460205260408620553880806104c8565b634e487b7160e01b88526011600452602488fd5b634e487b7160e01b87526011600452602487fd5b5050505090565b919060018301600090828252806020526040822054156000146105f957845494680100000000000000008610156105e557836105d5610531886001604098999a01855584610457565b9055549382526020522055600190565b634e487b7160e01b83526041600452602483fd5b5092505056fea264697066735822122033c61da5cd9ec57c395528bcd889dac8d27e1b4941089542732fedb9b8add18264736f6c63430008150033";

type HederaNFTStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HederaNFTStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HederaNFTStorage__factory extends ContractFactory {
  constructor(...args: HederaNFTStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _collectionAddress: AddressLike,
    _owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _collectionAddress,
      _owner,
      overrides || {}
    );
  }
  override deploy(
    _collectionAddress: AddressLike,
    _owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_collectionAddress, _owner, overrides || {}) as Promise<
      HederaNFTStorage & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): HederaNFTStorage__factory {
    return super.connect(runner) as HederaNFTStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HederaNFTStorageInterface {
    return new Interface(_abi) as HederaNFTStorageInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): HederaNFTStorage {
    return new Contract(address, _abi, runner) as unknown as HederaNFTStorage;
  }
}
