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
import type { NonPayableOverrides } from "../../common";
import type {
  BridgeStorage,
  BridgeStorageInterface,
  ChainFeeStruct,
} from "../../contracts/BridgeStorage";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_bootstrapValidator",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "chain",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        internalType: "struct ChainFee[]",
        name: "_bootstrapChainFee",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_transactionHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_chain",
        type: "string",
      },
      {
        internalType: "string",
        name: "_signature",
        type: "string",
      },
    ],
    name: "approveLockNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakerAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_signature",
        type: "string",
      },
    ],
    name: "approveStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "chainEpoch",
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
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "chainFee",
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
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "chainFeeVoted",
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
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "chainFeeVotes",
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
        internalType: "string",
        name: "_chain",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "changeChainFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_validatorAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "changeValidatorStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "transactionHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "chain",
        type: "string",
      },
    ],
    name: "getLockNftSignatures",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "publicAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "signature",
            type: "string",
          },
        ],
        internalType: "struct SignerAndSignature[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "transactionHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "chain",
        type: "string",
      },
    ],
    name: "getLockNftSignaturesCount",
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
        name: "stakerAddress",
        type: "address",
      },
    ],
    name: "getStakingSignatures",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "publicAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "signature",
            type: "string",
          },
        ],
        internalType: "struct SignerAndSignature[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "stakerAddress",
        type: "address",
      },
    ],
    name: "getStakingSignaturesCount",
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
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lockSignatures",
    outputs: [
      {
        internalType: "address",
        name: "publicAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "signature",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakingSignatures",
    outputs: [
      {
        internalType: "address",
        name: "publicAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "usedSignatures",
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
    name: "validatorCount",
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
    name: "validatorEpoch",
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
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "validatorStatusChangeVotes",
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "validatorVoted",
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
        name: "",
        type: "address",
      },
    ],
    name: "validators",
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
] as const;

const _bytecode =
  "0x60406080815234620001f857620017bc803803806200001e8162000228565b92833981018282820312620001f85781516001600160a01b03811690819003620001f85760208381015190936001600160401b039190828211620001f8570190601f93808584011215620001f85782519482861162000212578560051b9187806200008b81860162000228565b80998152019386010194818611620001f857888101935b86851062000153578a8a8a8a6000526003825282600020916001928360ff19825416179055620000d460085462000273565b6008556000835b620000f0575b84516114f79081620002c58239f35b82518110156200014d5780826200010c62000146938662000299565b510151620001358462000120848862000299565b5151818a51938285809451938492016200024e565b8101600b8152030190205562000273565b83620000db565b620000e1565b8451868111620001f8578201601f19918c838387030112620001f8578c518d81018181108a821117620001fd578e528c830151898111620001f857830186603f82011215620001f8578d810151938a8511620001fd578f958f620001be908a928c8901160162000228565b968688528684010111620001f8578f91958f968796620001e4918589850191016200024e565b8352015183820152815201940193620000a2565b600080fd5b60246000634e487b7160e01b81526041600452fd5b634e487b7160e01b600052604160045260246000fd5b6040519190601f01601f191682016001600160401b038111838210176200021257604052565b60005b838110620002625750506000910152565b818101518382015260200162000251565b6000198114620002835760010190565b634e487b7160e01b600052601160045260246000fd5b8051821015620002ae5760209160051b010190565b634e487b7160e01b600052603260045260246000fdfe6040608081526004908136101561001557600080fd5b600091823560e01c908163045cda8d14610e9d5781630f43a67714610e7e57816316f4872414610e1e5781631bd1b2f114610dc9578163252f510814610d685781632943877214610d0b5781633fe38f5b14610cd35781634d01fc2d14610c7457838263829f565214610b685750816382da78c0146109245781639027f6cd14610878578163a1b3f4a914610642578163acff759e14610581578163bf7dac4f14610526578163c7baba03146104f5578163e419d42514610425578163e4c205c514610211578163e97b41671461017857508063ee7de838146101415763fa52c7d81461010157600080fd5b3461013d57602036600319011261013d5760209160ff9082906001600160a01b0361012a610fd7565b1681526003855220541690519015158152f35b5080fd5b503461013d57602036600319011261013d5760209181906001600160a01b03610168610fd7565b1681526001845220549051908152f35b90503461020d57608036600319011261020d578035906001600160401b038211610209576101a891369101610f96565b916044356001600160a01b0381169081900361013d5760ff918391825186818098516101da8160209b8c809601610fb4565b810160078152030190206024358352865282822090825285528181206064358252855220541690519015158152f35b8380fd5b8280fd5b90503461020d578160031936011261020d5780356001600160401b038111610209576102409036908301611153565b92602435903386526020936003855261025e60ff8389205416611246565b815186858237858188810160078152030190208388528552818720338852855281872082518786823786818981018b815203019020548852855260ff82882054166103f457815186858237858188810160078152030190208388528552818720338852855281872082518786823786818981018b8152030190205488528552818720600160ff1982541617905581518685823785818881016006815203019020838852855281872082518786823786818981018b815203019020548852855281872061032a81546112d3565b90556008546001600160ff1b03811681036103e15760039060011b049082518786823786818981016006815203019020848952865282882083518887823787818a81018c81520301902054895286528288205490600183018093116103ce57501015610394578580f35b84918151838582378581858101600b815203019020555193849283378101848152030190206103c381546112d3565b905538808080808580f35b634e487b7160e01b895260119052602488fd5b634e487b7160e01b885260118252602488fd5b84606492519162461bcd60e51b8352820152600d60248201526c105b1c9958591e481d9bdd1959609a1b6044820152fd5b90503461020d57606036600319011261020d576001600160401b0381358181116104f1576104569036908401610f96565b916024359182116104f1576104736020916104a993369101610f96565b61048d826044359581885193828580945193849201610fb4565b8101600981520301902082865194838680955193849201610fb4565b820190815203019020805482101561020957906104c591610ffc565b5080546001600160a01b0316906104ed906104e290600101611068565b925192839283611131565b0390f35b8480fd5b50503461013d5760209061051e61051861050e36611180565b92939190936112a1565b916112ba565b549051908152f35b90503461020d57602036600319011261020d5780356001600160401b0381116102095760209361055d610570938693369101610f96565b9082855194838680955193849201610fb4565b820190815203019020549051908152f35b8391503461013d5760208060031936011261020d576001600160a01b0392836105a8610fd7565b1681526002918281528582208054946001600160401b03861161062f5750918651956105d9838760051b0188610f2a565b85875282870193825282822091935b8685106105fc578851806104ed8a826111ca565b85846001928b5161060c81610ef9565b85875416815261061d858801611068565b838201528152019301940193916105e8565b634e487b7160e01b845260419052602483fd5b83833461013d578060031936011261013d5761065c610fd7565b610664610fed565b3384526020916003835261067d60ff8587205416611246565b6001600160a01b031680855260018352838520546005845284862033875284528486208187528452848620549092919060ff166108375780865260058452848620338752845284862083875284528486209260ff199360018582541617905581875287855285872092801590811594858a528752878920838a52875287892061070681546112d3565b9055600854926001600160ff1b03841684036108245760038460011b0490858b528b8952898b20878c528952898b20908b528852888a205460018201809211610811571015610753578880f35b806107fc575b156107a55750506001949596506107716008546112d3565b6008555b86526003835260ff85872092835416911617905552812061079681546112d3565b90558082808080808080808880f35b806107e8575b6107bc575b50600194959650610775565b80156107d55760001901600855949550859460016107b0565b634e487b7160e01b875260118852602487fd5b508187526003855260ff86882054166107ab565b508288526003865260ff878920541615610759565b634e487b7160e01b8b5260118c5260248bfd5b634e487b7160e01b8a5260118b5260248afd5b606487858088519262461bcd60e51b845283015260248201527f416c726561647920766f74656420666f7220746869732076616c696461746f726044820152fd5b8391503461013d5761088f61051861050e36611180565b918254916001600160401b03831161091157509160208451936108b7828560051b0186610f2a565b8385529182528082208185015b8484106108d8578651806104ed88826111ca565b60028360019289516108e981610ef9565b848060a01b0386541681526108ff858701611068565b838201528152019201930192906108c4565b634e487b7160e01b825260419052602490fd5b90503461020d578160031936011261020d5761093e610fd7565b906024356001600160401b0381116104f15761095d9036908301611153565b9290923386526020926003845261097960ff8789205416611246565b61099960ff8751848882378681868101600a8152030190205416156112f8565b6109f48651838782378581858101600a815203019020936109d560019760ff199689888254161790556109ca61133d565b953387523691610f4b565b848701526001600160a01b031680895260028652878920909390611357565b33875260038452610a0a60ff8789205416611246565b81875284845285872054600585528688203389528552868820818952855260ff8789205416610b27578288526005855286882033895285528688208189528552868820868582541617905582885281855286882086895285528688208189528552868820610a7881546112d3565b9055600854916001600160ff1b03831683036103ce57600383881b0491848a52818752888a20888b528752888a20908a5286528789205490878301809311610b1457501015610ac5578680f35b818752600384528587205460ff16610b0e57610ae0906112d3565b6008555b8552600382528284862091825416179055528120610b0281546112d3565b90553880808080808680f35b50610ae4565b634e487b7160e01b8a5260119052602489fd5b60648286808a519262461bcd60e51b845283015260248201527f416c726561647920766f74656420666f7220746869732076616c696461746f726044820152fd5b92915034610c70576060366003190112610c70576001600160401b039080358281116104f157610b9b9036908301611153565b602492919235848111610c6c57610bb59036908401611153565b929093604435958611610c68578287610c46610c659a610bf460ff610be2602098610c609d369101611153565b9d909333815260038a52205416611246565b610c1560ff8c8886518281938783378101600a8152030190205416156112f8565b82518b82823786818d8101600a815203019020600160ff19825416179055610c3b61133d565b9a338c523691610f4b565b848a015251938492833781016009815203019020916112ba565b611357565b80f35b8780fd5b8680fd5b5050fd5b828434610cd0576020366003190112610cd0578235906001600160401b038211610cd057506020610cac8194610cbe93369101610f96565b81845193828580945193849201610fb4565b8101600b815203019020549051908152f35b80fd5b50503461013d57602036600319011261013d5760209181906001600160a01b03610cfb610fd7565b1681526002845220549051908152f35b828434610cd05781600319360112610cd057610d25610fd7565b6001600160a01b03908116825260026020528282208054919260243592831015610cd057506001610d5c6104ed936104e293610ffc565b50938454169301611068565b828434610cd0576020366003190112610cd0578235906001600160401b038211610cd05750610db46020610da2819560ff94369101610f96565b81855193828580945193849201610fb4565b8101600a815203019020541690519015158152f35b90503461020d57606036600319011261020d576020928291610de9610fd7565b90610df2610fed565b6001600160a01b0390921683528552828220901515825284528181206044358252845220549051908152f35b50503461013d57606036600319011261013d57610e39610fd7565b6001600160a01b0360243581811692908390036104f1579360ff9284926020961682526005865282822090825285528181206044358252855220541690519015158152f35b50503461013d578160031936011261013d576020906008549051908152f35b90503461020d57606036600319011261020d5780356001600160401b0381116102095792610ed56020610da285948297369101610f96565b81016006815203019020602435825284528181206044358252845220549051908152f35b604081019081106001600160401b03821117610f1457604052565b634e487b7160e01b600052604160045260246000fd5b90601f801991011681019081106001600160401b03821117610f1457604052565b9291926001600160401b038211610f145760405191610f74601f8201601f191660200184610f2a565b829481845281830111610f91578281602093846000960137010152565b600080fd5b9080601f83011215610f9157816020610fb193359101610f4b565b90565b60005b838110610fc75750506000910152565b8181015183820152602001610fb7565b600435906001600160a01b0382168203610f9157565b602435908115158203610f9157565b80548210156110185760005260206000209060011b0190600090565b634e487b7160e01b600052603260045260246000fd5b90600182811c9216801561105e575b602083101461104857565b634e487b7160e01b600052602260045260246000fd5b91607f169161103d565b9060405191826000825461107b8161102e565b9081845260209460019182811690816000146110ea57506001146110ab575b5050506110a992500383610f2a565b565b600090815285812095935091905b8183106110d25750506110a9935082010138808061109a565b855488840185015294850194879450918301916110b9565b925050506110a994925060ff191682840152151560051b82010138808061109a565b9060209161112581518092818552858086019101610fb4565b601f01601f1916010190565b6001600160a01b039091168152604060208201819052610fb19291019061110c565b9181601f84011215610f91578235916001600160401b038311610f915760208381860195010111610f9157565b6040600319820112610f91576001600160401b0391600435838111610f9157826111ac91600401611153565b93909392602435918211610f91576111c691600401611153565b9091565b602080820190808352835180925260409283810182858560051b8401019601946000925b8584106111ff575050505050505090565b909192939495968580611235600193603f1986820301885286838d51878060a01b0381511684520151918185820152019061110c565b9901940194019295949391906111ee565b1561124d57565b60405162461bcd60e51b815260206004820152602660248201527f4f6e6c792076616c696461746f72732063616e2063616c6c20746869732066756044820152653731ba34b7b760d11b6064820152608490fd5b6020908260405193849283378101600981520301902090565b6020919283604051948593843782019081520301902090565b60001981146112e25760010190565b634e487b7160e01b600052601160045260246000fd5b156112ff57565b60405162461bcd60e51b815260206004820152601660248201527514da59db985d1d5c9948185b1c9958591e481d5cd95960521b6044820152606490fd5b6040519061134a82610ef9565b6060602083600081520152565b8054600160401b811015610f1457611376906001928382018155610ffc565b6114ab57825181546001600160a01b0319166001600160a01b0391909116178155602092830151805191830193906001600160401b038311610f14576113bc855461102e565b601f8111611462575b5081601f84116001146113ff57509282939183926000946113f4575b50501b916000199060031b1c1916179055565b0151925038806113e1565b919083601f1981168760005284600020946000905b88838310611448575050501061142f575b505050811b019055565b015160001960f88460031b161c19169055388080611425565b858701518855909601959485019487935090810190611414565b6000868152838120601f860160051c8101928587106114a1575b601f0160051c019186905b838110611496575050506113c5565b828155018690611487565b909250829061147c565b634e487b7160e01b600052600060045260246000fdfea2646970667358221220cc5ead03545b6499e9f4d675c35f375c8f37f8486f99856063ed7c6537024ce164736f6c63430008150033";

type BridgeStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeStorage__factory extends ContractFactory {
  constructor(...args: BridgeStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _bootstrapValidator: AddressLike,
    _bootstrapChainFee: ChainFeeStruct[],
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _bootstrapValidator,
      _bootstrapChainFee,
      overrides || {}
    );
  }
  override deploy(
    _bootstrapValidator: AddressLike,
    _bootstrapChainFee: ChainFeeStruct[],
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _bootstrapValidator,
      _bootstrapChainFee,
      overrides || {}
    ) as Promise<
      BridgeStorage & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BridgeStorage__factory {
    return super.connect(runner) as BridgeStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeStorageInterface {
    return new Interface(_abi) as BridgeStorageInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BridgeStorage {
    return new Contract(address, _abi, runner) as unknown as BridgeStorage;
  }
}