/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ERC721Royalty,
  ERC721RoyaltyInterface,
} from "../../contracts/ERC721Royalty";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "royalty",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "royalityReciever",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
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
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052346200038257620014b0803803806200001d8162000387565b9283398101604082820312620003825781516001600160401b0392908381116200038257826200004f918301620003ad565b906020928382015185811162000382576200006b9201620003ad565b9281518181116200036c576000938454916001948584811c9416801562000361575b838510146200034d578190601f94858111620002fa575b508390858311600114620002965788926200028a575b5050600019600383901b1c191690851b1785555b8551928311620002765783548481811c911680156200026b575b8282101462000257578281116200020f575b5080918311600114620001a957508394829394926200019d575b5050600019600383901b1c191690821b1790555b3315620001855760078054336001600160a01b031982168117909255604051926001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a36110909081620004208239f35b60249060405190631e4fbdf760e01b82526004820152fd5b01519050388062000114565b90601f198316958486528286209286905b888210620001f75750508385969710620001dd575b505050811b01905562000128565b015160001960f88460031b161c19169055388080620001cf565b808785968294968601518155019501930190620001ba565b8486528186208380860160051c8201928487106200024d575b0160051c019085905b82811062000241575050620000fa565b87815501859062000231565b9250819262000228565b634e487b7160e01b86526022600452602486fd5b90607f1690620000e8565b634e487b7160e01b85526041600452602485fd5b015190503880620000ba565b8880528489208894509190601f1984168a5b87828210620002e35750508411620002c9575b505050811b018555620000ce565b015160001960f88460031b161c19169055388080620002bb565b8385015186558b97909501949384019301620002a8565b9091508780528388208580850160051c82019286861062000343575b918991869594930160051c01915b82811062000334575050620000a4565b8a815585945089910162000324565b9250819262000316565b634e487b7160e01b87526022600452602487fd5b93607f16936200008d565b634e487b7160e01b600052604160045260246000fd5b600080fd5b6040519190601f01601f191682016001600160401b038111838210176200036c57604052565b919080601f84011215620003825782516001600160401b0381116200036c57602090620003e3601f8201601f1916830162000387565b92818452828287010111620003825760005b8181106200040b57508260009394955001015290565b8581018301518482018401528201620003f556fe6080604081815260048036101561001557600080fd5b600092833560e01c90816301ffc9a714610af85750806306fdde0314610a66578063081812fc14610a2b578063095ea7b31461094f57806323b872dd146109375780632a55205a146108c157806342842e0e146108985780634bd297fd146105995780636352211e1461056857806370a0823114610513578063715018a6146104b65780638da5cb5b1461048d57806395d89b41146103c0578063a22cb46514610323578063b88d4fde146102bc578063c87b56dd146101c7578063e985e9c5146101755763f2fde38b146100e957600080fd5b3461017157602036600319011261017157610102610bbe565b9061010b610cc8565b6001600160a01b0391821692831561015b575050600780546001600160a01b031981168417909155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b51631e4fbdf760e01b8152908101849052602490fd5b8280fd5b5050346101c357806003193601126101c35760ff81602093610195610bbe565b61019d610bd9565b6001600160a01b0391821683526005875283832091168252855220549151911615158152f35b5080fd5b50903461017157602091826003193601126102b857356101e68161101f565b5083526006825280832092815180948290805461020281610cf4565b91828552600191888382169182600014610291575050600114610253575b50505061024f939291610234910386610c55565b815161023f81610c24565b5251928284938452830190610b7e565b0390f35b8552868520879350859291905b828410610279575050508201018161023461024f610220565b8054848b018601528995508894909301928101610260565b60ff19168782015293151560051b86019093019350849250610234915061024f9050610220565b8380fd5b8382346101c35760803660031901126101c3576102d7610bbe565b6102df610bd9565b906064356001600160401b03811161031f573660238201121561031f5761031c9381602461031293369301359101610c91565b9160443591610ed0565b80f35b8480fd5b50903461017157806003193601126101715761033d610bbe565b906024359182151580930361031f576001600160a01b03169283156103ab5750338452600560205280842083855260205280842060ff1981541660ff8416179055519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b836024925191630b61174360e31b8352820152fd5b82843461048a578060031936011261048a5781519182826001938454946103e686610cf4565b91828552602096878382169182600014610463575050600114610426575b50505061024f9291610417910385610c55565b51928284938452830190610b7e565b91908693508083528383205b82841061044b575050508201018161041761024f610404565b8054848a018601528895508794909301928101610432565b60ff19168782015293151560051b86019093019350849250610417915061024f9050610404565b80fd5b5050346101c357816003193601126101c35760075490516001600160a01b039091168152602090f35b833461048a578060031936011261048a576104cf610cc8565b600780546001600160a01b0319811690915581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b50913461048a57602036600319011261048a576001600160a01b03610536610bbe565b169283156105535750806020938392526003845220549051908152f35b91516322718ad960e21b815291820152602490fd5b50913461048a57602036600319011261048a57506105886020923561101f565b90516001600160a01b039091168152f35b50823461048a5760a036600319011261048a576105b4610bbe565b602493909260443591906001600160a01b039060643582811691883591839003610894576001600160401b036084358181116108905736602382011215610890576106079036908c818601359101610c91565b98610610610cc8565b612710881161085b5785169485156108455788999a847fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef98999a528885888d60209b8c96600288528583205416918215159586610812575b84825260038952808220805460019081019091558683526002909952812080546001600160a01b0319908116909e17905580a46107fe57848b5260068852888b20938c519384116107ed5750506106bf8354610cf4565b601f81116107a7575b50869a601f83116001146107435782918b9c839260099b9c9d94610738575b50501b916000199060031b1c19161790555b7ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7848751838152a1875260088352848720918254161790555282205580f35b015192508d806106e7565b838b52878b20601f1984169c92939290918c8e5b811061079157508360099b9c9d9e10610778575b505050811b0190556106f9565b015160001960f88460031b161c191690558b808061076b565b81830151845592850192918a01918a018e610757565b838b52878b20601f840160051c8101918985106107e3575b601f0160051c019082905b8281106107d85750506106c8565b8c81550182906107ca565b90915081906107bf565b634e487b7160e01b8c52604190528afd5b88516339e3563760e11b81528085018c9052fd5b600086815260046020526040902080546001600160a01b0319169055838252600389528082208054600019019055610668565b8651633250574960e11b81528084018a90528b90fd5b865162461bcd60e51b81526020818501526010818d01526f0a4def2c2d8e8f240e8dede40d0d2ced60831b6044820152606490fd5b8880fd5b8680fd5b5050346101c35761031c906108ac36610bef565b919251926108b984610c24565b858452610ed0565b50913461048a578160031936011261048a576024359183358252600860205260018060a01b03818320541691600960205281812054938481029481860414901517156109245781516001600160a01b038416815261271085046020820152604090f35b634e487b7160e01b815260118552602490fd5b833461048a5761031c61094936610bef565b91610d2e565b509034610171578060031936011261017157610969610bbe565b916024356109768161101f565b33151580610a18575b806109ef575b6109d9576001600160a01b039485169482918691167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258880a48452602052822080546001600160a01b031916909117905580f35b835163a9fbf51f60e01b81523381850152602490fd5b506001600160a01b03811686526005602090815284872033885290528386205460ff1615610985565b506001600160a01b03811633141561097f565b503461017157602036600319011261017157918260209335610a4c8161101f565b50825283528190205490516001600160a01b039091168152f35b82843461048a578060031936011261048a5781519182828354610a8881610cf4565b90818452602095600191878382169182600014610463575050600114610abb5750505061024f9291610417910385610c55565b91908693508280528383205b828410610ae0575050508201018161041761024f610404565b8054848a018601528895508794909301928101610ac7565b92505034610171576020366003190112610171573563ffffffff60e01b81168091036101715760209250632483248360e11b8114908115610b3b575b5015158152f35b6380ac58cd60e01b811491508115610b6d575b8115610b5c575b5038610b34565b6301ffc9a760e01b14905038610b55565b635b5e139f60e01b81149150610b4e565b919082519283825260005b848110610baa575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201610b89565b600435906001600160a01b0382168203610bd457565b600080fd5b602435906001600160a01b0382168203610bd457565b6060906003190112610bd4576001600160a01b03906004358281168103610bd457916024359081168103610bd4579060443590565b602081019081106001600160401b03821117610c3f57604052565b634e487b7160e01b600052604160045260246000fd5b90601f801991011681019081106001600160401b03821117610c3f57604052565b6001600160401b038111610c3f57601f01601f191660200190565b929192610c9d82610c76565b91610cab6040519384610c55565b829481845281830111610bd4578281602093846000960137010152565b6007546001600160a01b03163303610cdc57565b60405163118cdaa760e01b8152336004820152602490fd5b90600182811c92168015610d24575b6020831014610d0e57565b634e487b7160e01b600052602260045260246000fd5b91607f1691610d03565b6001600160a01b039182169290918315610eb757600092828452826020956002875260409684888820541696879133151580610e1e575b509060027fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9284610deb575b858352600381528b8320805460010190558683525289812080546001600160a01b0319168517905580a41692838303610dca5750505050565b6064945051926364283d7b60e01b8452600484015260248301526044820152fd5b600087815260046020526040902080546001600160a01b0319169055848352600381528b83208054600019019055610d91565b91939450915080610e76575b15610e3a57859291879138610d65565b878688610e57576024915190637e27328960e01b82526004820152fd5b905163177e802f60e01b81523360048201526024810191909152604490fd5b503387148015610e9b575b80610e2a5750858252600481523385898420541614610e2a565b5086825260058152878220338352815260ff8883205416610e81565b604051633250574960e11b815260006004820152602490fd5b610edb838383610d2e565b813b610ee8575b50505050565b604051630a85bd0160e11b8082523360048301526001600160a01b03928316602483015260448201949094526080606482015260209592909116939092908390610f36906084830190610b7e565b039285816000958187895af1849181610fdf575b50610faa575050503d600014610fa2573d610f6481610c76565b90610f726040519283610c55565b81528091843d92013e5b80519283610f9d57604051633250574960e11b815260048101849052602490fd5b019050fd5b506060610f7c565b919450915063ffffffff60e01b1603610fc7575038808080610ee2565b60249060405190633250574960e11b82526004820152fd5b9091508681813d8311611018575b610ff78183610c55565b8101031261031f57516001600160e01b03198116810361031f579038610f4a565b503d610fed565b6000818152600260205260409020546001600160a01b0316908115611042575090565b60249060405190637e27328960e01b82526004820152fdfea2646970667358221220a854aab815c0d2e51f827e7b356d06b3990c46dd55cd052e81215cf8b48303c964736f6c63430008150033";

type ERC721RoyaltyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721RoyaltyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Royalty__factory extends ContractFactory {
  constructor(...args: ERC721RoyaltyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override deploy(
    name: string,
    symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name, symbol, overrides || {}) as Promise<
      ERC721Royalty & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721Royalty__factory {
    return super.connect(runner) as ERC721Royalty__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721RoyaltyInterface {
    return new Interface(_abi) as ERC721RoyaltyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC721Royalty {
    return new Contract(address, _abi, runner) as unknown as ERC721Royalty;
  }
}
