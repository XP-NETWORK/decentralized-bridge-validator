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
        name: "bootstrapValidator",
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
        name: "bootstrapChainFee",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "sourceChain",
            type: "string",
          },
          {
            internalType: "string",
            name: "destinationChain",
            type: "string",
          },
          {
            internalType: "address",
            name: "destinationUserAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceNftContractAddress",
            type: "address",
          },
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
          {
            internalType: "uint256",
            name: "royalty",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "royaltyReceiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "transactionHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nftType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        internalType: "struct NftTransferDetails",
        name: "nftTransferDetails",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "signature",
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
        name: "stakerAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "signature",
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
        name: "chain",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "fee",
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
        name: "a",
        type: "string",
      },
      {
        internalType: "string",
        name: "b",
        type: "string",
      },
    ],
    name: "concatenate",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "chain",
        type: "string",
      },
      {
        internalType: "string",
        name: "txHash",
        type: "string",
      },
    ],
    name: "getLockNftSignatures",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "sourceChain",
                type: "string",
              },
              {
                internalType: "string",
                name: "destinationChain",
                type: "string",
              },
              {
                internalType: "address",
                name: "destinationUserAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "sourceNftContractAddress",
                type: "address",
              },
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
              {
                internalType: "uint256",
                name: "royalty",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "royaltyReceiver",
                type: "address",
              },
              {
                internalType: "string",
                name: "metadata",
                type: "string",
              },
              {
                internalType: "string",
                name: "transactionHash",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "tokenAmount",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "nftType",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "fee",
                type: "uint256",
              },
            ],
            internalType: "struct NftTransferDetails",
            name: "transferDetails",
            type: "tuple",
          },
          {
            internalType: "string[]",
            name: "signatures",
            type: "string[]",
          },
        ],
        internalType: "struct NftTransferWithSignatures",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "chain",
        type: "string",
      },
      {
        internalType: "string",
        name: "txHash",
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
        internalType: "string[]",
        name: "",
        type: "string[]",
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
    ],
    name: "lockSignatures",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "sourceChain",
            type: "string",
          },
          {
            internalType: "string",
            name: "destinationChain",
            type: "string",
          },
          {
            internalType: "address",
            name: "destinationUserAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceNftContractAddress",
            type: "address",
          },
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
          {
            internalType: "uint256",
            name: "royalty",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "royaltyReceiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "transactionHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nftType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        internalType: "struct NftTransferDetails",
        name: "transferDetails",
        type: "tuple",
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
  "0x60406080815234620001f8576200236b803803806200001e8162000228565b92833981018282820312620001f85781516001600160a01b03811690819003620001f85760208381015190936001600160401b039190828211620001f8570190601f93808584011215620001f85782519482861162000212578560051b9187806200008b81860162000228565b80998152019386010194818611620001f857888101935b86851062000153578a8a8a8a6000526003825282600020916001928360ff19825416179055620000d460085462000273565b6008556000835b620000f0575b84516120a69081620002c58239f35b82518110156200014d5780826200010c62000146938662000299565b510151620001358462000120848862000299565b5151818a51938285809451938492016200024e565b8101600b8152030190205562000273565b83620000db565b620000e1565b8451868111620001f8578201601f19918c838387030112620001f8578c518d81018181108a821117620001fd578e528c830151898111620001f857830186603f82011215620001f8578d810151938a8511620001fd578f958f620001be908a928c8901160162000228565b968688528684010111620001f8578f91958f968796620001e4918589850191016200024e565b8352015183820152815201940193620000a2565b600080fd5b60246000634e487b7160e01b81526041600452fd5b634e487b7160e01b600052604160045260246000fd5b6040519190601f01601f191682016001600160401b038111838210176200021257604052565b60005b838110620002625750506000910152565b818101518382015260200162000251565b6000198114620002835760010190565b634e487b7160e01b600052601160045260246000fd5b8051821015620002ae5760209160051b010190565b634e487b7160e01b600052603260045260246000fdfe6080604052600436101561001257600080fd5b60003560e01c8063045cda8d1461184a5780630f43a6771461182c57806316f48724146117c45780631bd1b2f114611766578063252f510814611718578063266001d314611704578063294387721461168457806339e9650b14610b565780633fe38f5b14610b1c5780634d01fc2d14610ad357806382da78c0146108915780639027f6cd14610796578063a1b3f4a914610584578063acff759e14610536578063bf7dac4f146104ed578063c7baba03146104bd578063ce0dd28314610448578063e4c205c51461021b578063e97b416714610181578063ee7de838146101475763fa52c7d81461010357600080fd5b34610142576020366003190112610142576001600160a01b036101246119a7565b166000526003602052602060ff604060002054166040519015158152f35b600080fd5b34610142576020366003190112610142576001600160a01b036101686119a7565b1660005260016020526020604060002054604051908152f35b34610142576080366003190112610142576004356001600160401b038111610142576101b1903690600401611908565b6044356001600160a01b038116908190036101425760405182818094516101de816020978880960161195e565b81016007815203019020602435600052825260406000209060005281526040600020606435600052815260ff604060002054166040519015158152f35b34610142576040366003190112610142576004356001600160401b0381116101425761024b9036906004016119e0565b9060243590336000526020916003835261026c60ff60406000205416611de1565b604051848382378381868101600781520301902081600052835260406000203360005283526040600020604051858482378481878101600081520301902054600052835260ff604060002054166104135760405184838237838186810160078152030190208160005283526040600020336000528352604060002060405185848237848187810160008152030190205460005283526040600020600160ff1982541617905560405184838237838186810160068152030190208160005283526040600020604051858482378481878101600081520301902054600052835260406000206103598154611e3c565b90556008546001600160ff1b03811681036103fd5760039060011b04604051858482378481878101600681520301902082600052845260406000206040518685823785818881016000815203019020546000528452604060002054600182018092116103fd5710156103c757005b604051848382378381868101600b81520301902055826040519384928337810160008152030190206103f98154611e3c565b9055005b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b815260048101849052600d60248201526c105b1c9958591e481d9bdd1959609a1b6044820152606490fd5b34610142576020366003190112610142576004356001600160401b038111610142576104a561049660206104836104b9943690600401611908565b816040519382858094519384920161195e565b81016009815203019020611cd2565b604051918291602083526020830190611b88565b0390f35b34610142576020600e6104e36104de6104d536611a0d565b92919091611dad565b611981565b0154604051908152f35b34610142576020366003190112610142576004356001600160401b03811161014257610523602061048381933690600401611908565b8101600081520301902054604051908152f35b34610142576020366003190112610142576001600160a01b036105576119a7565b1660005260026020526104b96105706040600020611fde565b604051918291602083526020830190611c7d565b346101425760403660031901126101425761059d6119a7565b6105a56119d1565b9033600052602090600382526105c260ff60406000205416611de1565b6001600160a01b0316600081815260018352604080822054600585528183203384528552818320818452855291205490939060ff166107535781600052600583526040600020336000528352604060002084600052835260406000209160ff19926001848254161790558060005260048452604060002091801590811593846000528652604060002087600052865260406000206106608154611e3c565b9055600854966001600160ff1b03881688036103fd5760038860011b0490846000526004885260406000208660005288526040600020906000528752604060002054600182018092116103fd5710156106b557005b8061073b575b156106fb5750600194506106d0600854611e3c565b6008555b6000526003835260ff60406000209283541691161790555260406000206103f98154611e3c565b80610724575b61070f575b600194506106d4565b84156103fd5760019460001901600855610706565b50806000526003845260ff60406000205416610701565b50816000526003855260ff60406000205416156106bb565b6064836040519062461bcd60e51b825280600483015260248201527f416c726561647920766f74656420666f7220746869732076616c696461746f726044820152fd5b34610142576104de6108336107aa36611a0d565b91604095939551956107bb876118b0565b6040516107c7816118cb565b600081526020606098828a8381950152836040820152600084820152600060808201528360a08201528360c0820152600060e08201526000610100820152836101208201528361014082015260006101608201528361018082015260006101a082015281520152611dad565b6104b9610859600e60405193610848856118b0565b61085181611cd2565b855201611fde565b6020830190815261087e60405194859460208652519060406020870152850190611b88565b9051838203601f19016040850152611c7d565b34610142576040366003190112610142576108aa6119a7565b6024356001600160401b038111610142576108c99036906004016119e0565b33600052602091600383526108e560ff60406000205416611de1565b61090660ff604051848482378581868101600a815203019020541615611e4b565b610948604051838382378481858101600a8152030190209260019560ff1994878682541617905560018060a01b03169283600052600286526040600020611eff565b336000526003835261096160ff60406000205416611de1565b80600052838352604060002054600584526040600020336000528452604060002081600052845260ff60406000205416610a90578160005260058452604060002033600052845260406000208160005284526040600020858482541617905581600052600484526040600020856000528452604060002081600052845260406000206109ed8154611e3c565b9055600854906001600160ff1b03821682036103fd57600382871b04908360005260048652604060002087600052865260406000209060005285526040600020548682018092116103fd571015610a4057005b816000526003845260ff6040600020541615600014610a8a57610a6290611e3c565b6008555b60005260038252826040600020918254161790555260406000206103f98154611e3c565b50610a66565b6064846040519062461bcd60e51b825280600483015260248201527f416c726561647920766f74656420666f7220746869732076616c696461746f726044820152fd5b34610142576020366003190112610142576004356001600160401b03811161014257610b09602061048381933690600401611908565b8101600b81520301902054604051908152f35b34610142576020366003190112610142576001600160a01b03610b3d6119a7565b1660005260026020526020604060002054604051908152f35b3461014257600319604036820112610142576001600160401b0360043511610142576101c09060043536030112610142576024356001600160401b03811161014257610ba69036906004016119e0565b336000526003602052610bc060ff60406000205416611de1565b610be260ff60405183858237602081858101600a815203019020541615611e4b565b60405181838237602081838101600a815203019020600160ff19825416179055610c37610c1960246004350160043560040161203e565b90610c2f6101446004350160043560040161203e565b929091611dad565b91610c63600a6040516020818751610c528183858c0161195e565b810160098152030190200154611aaa565b15610c99575b600e610c876020610c9795816040519382858094519384920161195e565b8101600981520301902001611eff565b005b6040518060208101106001600160401b036020830111176112bd57602081016040526000815260405190610ccc826118b0565b604051610cd8816118cb565b600435600401358152602460043501356001600160401b03811161014257610d07906004369181350101611908565b6020820152604460043501356001600160401b03811161014257610d32906004369181350101611908565b6040820152610d456064600435016119bd565b6060820152610d586084600435016119bd565b608082015260a460043501356001600160401b03811161014257610d83906004369181350101611908565b60a082015260c460043501356001600160401b03811161014257610dae906004369181350101611908565b60c082015260e4600435013560e0820152610dce610104600435016119bd565b61010082015261012460043501356001600160401b03811161014257610dfb906004369181350101611908565b61012082015261014460043501356001600160401b03811161014257610e28906004369181350101611908565b61014082015261016460043501356101608201526001600160401b0361018460043501351161014257610e6636600480356101848101350101611908565b6101808201526101a460043501356101a0820152825260208201526040516020818651610e968183858b0161195e565b810160098152030190209080518051835560208101518051906001600160401b0382116112bd57610ed782610ece6001880154611aaa565b60018801611ea7565b602090601f831160011461161257610efa9291600091836113cd575b5050611eec565b60018401555b60408101518051906001600160401b0382116112bd57610f3082610f276002880154611aaa565b60028801611ea7565b602090601f83116001146115a057610f529291600091836113cd575050611eec565b60028401555b60608101516003840180546001600160a01b039283166001600160a01b031991821617909155608083015160048601805491909316911617905560a08101518051906001600160401b0382116112bd57610fc282610fb96005880154611aaa565b60058801611ea7565b602090601f831160011461152e57610fe49291600091836113cd575050611eec565b60058401555b60c08101518051906001600160401b0382116112bd5761101a826110116006880154611aaa565b60068801611ea7565b602090601f83116001146114bc5761103c9291600091836113cd575050611eec565b60068401555b60e081015160078401556101008101516008840180546001600160a01b0319166001600160a01b03929092169190911790556101208101518051906001600160401b0382116112bd576110a58261109c6009880154611aaa565b60098801611ea7565b602090601f831160011461144a576110c79291600091836113cd575050611eec565b60098401555b6101408101518051906001600160401b0382116112bd576110fe826110f5600a880154611aaa565b600a8801611ea7565b602090601f83116001146113d8576111209291600091836113cd575050611eec565b600a8401555b610160810151600b8401556101808101518051906001600160401b0382116112bd5761116282611159600c880154611aaa565b600c8801611ea7565b602090601f831160011461135657826101a093602096959361118c9360009261134b575050611eec565b600c8601555b0151600d8401550151805190600160401b82116112bd57600e83015482600e8501558083106112d3575b506020600e910192016000526020600020916000905b8282106111e25750505050610c69565b80518051906001600160401b0382116112bd57611209826112038854611aaa565b88611ea7565b602090601f831160011461124d579261123383600195946020948796600092611242575050611eec565b87555b019401910190926111d2565b015190508d80610ef3565b908660005260206000209160005b601f19851681106112a5575083602093600196938796938794601f1981161061128c575b505050811b018755611236565b015160001960f88460031b161c191690558c808061127f565b9192602060018192868501518155019401920161125b565b634e487b7160e01b600052604160045260246000fd5b600e84016000526020600020908382015b81830181106112f45750506111bc565b8061130160019254611aaa565b8061130e575b50016112e4565b601f811183146113245750600081555b8a611307565b600090828252611342601f60208420920160051c8201858301611e90565b8183555561131e565b015190508b80610ef3565b90600c860160005260206000209160005b601f19851681106113b557509260209594926001926101a09583601f1981161061139c575b505050811b01600c860155611192565b015160001960f88460031b161c191690558a808061138c565b91926020600181928685015181550194019201611367565b015190508980610ef3565b9190600a86016000526020600020906000935b601f198416851061142f576001945083601f19811610611416575b505050811b01600a840155611126565b015160001960f88460031b161c19169055888080611406565b818101518355602094850194600190930192909101906113eb565b9190600986016000526020600020906000935b601f19841685106114a1576001945083601f19811610611488575b505050811b0160098401556110cd565b015160001960f88460031b161c19169055888080611478565b8181015183556020948501946001909301929091019061145d565b9190600686016000526020600020906000935b601f1984168510611513576001945083601f198116106114fa575b505050811b016006840155611042565b015160001960f88460031b161c191690558880806114ea565b818101518355602094850194600190930192909101906114cf565b9190600586016000526020600020906000935b601f1984168510611585576001945083601f1981161061156c575b505050811b016005840155610fea565b015160001960f88460031b161c1916905588808061155c565b81810151835560209485019460019093019290910190611541565b9190600286016000526020600020906000935b601f19841685106115f7576001945083601f198116106115de575b505050811b016002840155610f58565b015160001960f88460031b161c191690558880806115ce565b818101518355602094850194600190930192909101906115b3565b9190600186016000526020600020906000935b601f1984168510611669576001945083601f19811610611650575b505050811b016001840155610f00565b015160001960f88460031b161c19169055888080611640565b81810151835560209485019460019093019290910190611625565b346101425760403660031901126101425761169d6119a7565b6001600160a01b03166000908152600260205260409020805460243590811015610142576116ca91611a7c565b6116ee576116da6104b991611ae4565b604051918291602083526020830190611a57565b634e487b7160e01b600052600060045260246000fd5b34610142576104b96116da6104d536611a0d565b34610142576020366003190112610142576004356001600160401b0381116101425760ff611750602061048381943690600401611908565b8101600a81520301902054166040519015158152f35b346101425760603660031901126101425761177f6119a7565b6117876119d1565b9060018060a01b03166000526004602052604060002090151560005260205260406000206044356000526020526020604060002054604051908152f35b34610142576060366003190112610142576117dd6119a7565b6001600160a01b036024358181169290839003610142571660005260056020526040600020906000526020526040600020604435600052602052602060ff604060002054166040519015158152f35b34610142576000366003190112610142576020600854604051908152f35b34610142576060366003190112610142576004356001600160401b03811161014257602061048361187f923690600401611908565b8101600681520301902060243560005260205260406000206044356000526020526020604060002054604051908152f35b604081019081106001600160401b038211176112bd57604052565b6101c081019081106001600160401b038211176112bd57604052565b90601f801991011681019081106001600160401b038211176112bd57604052565b81601f82011215610142578035906001600160401b0382116112bd576040519261193c601f8401601f1916602001856118e7565b8284526020838301011161014257816000926020809301838601378301015290565b60005b8381106119715750506000910152565b8181015183820152602001611961565b602061199a91816040519382858094519384920161195e565b8101600981520301902090565b600435906001600160a01b038216820361014257565b35906001600160a01b038216820361014257565b60243590811515820361014257565b9181601f84011215610142578235916001600160401b038311610142576020838186019501011161014257565b6040600319820112610142576001600160401b03916004358381116101425782611a39916004016119e0565b9390939260243591821161014257611a53916004016119e0565b9091565b90602091611a708151809281855285808601910161195e565b601f01601f1916010190565b8054821015611a945760005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b90600182811c92168015611ada575b6020831014611ac457565b634e487b7160e01b600052602260045260246000fd5b91607f1691611ab9565b90604051918260008254611af781611aaa565b908184526020946001918281169081600014611b665750600114611b27575b505050611b25925003836118e7565b565b600090815285812095935091905b818310611b4e575050611b259350820101388080611b16565b85548884018501529485019487945091830191611b35565b92505050611b2594925060ff191682840152151560051b820101388080611b16565b90611c6f611c50611c3c611bc5611bb36101c087518752602088015190806020890152870190611a57565b60408701518682036040880152611a57565b611c10611bfe60608801519260018060a01b0380941660608901528360808a015116608089015260a089015188820360a08a0152611a57565b60c088015187820360c0890152611a57565b9060e087015160e087015261010090818801511690860152610120808701519086830390870152611a57565b610140808601519085830390860152611a57565b6101608085015190840152610180808501519084830390850152611a57565b916101a08091015191015290565b90815180825260208092019182818360051b82019501936000915b848310611ca85750505050505090565b9091929394958480611cc283856001950387528a51611a57565b9801930193019194939290611c98565b90604051611cdf816118cb565b6101a0600d829480548452611cf660018201611ae4565b6020850152611d0760028201611ae4565b604085015260038101546001600160a01b039081166060860152600482015481166080860152611d3960058301611ae4565b60a0860152611d4a60068301611ae4565b60c0860152600782015460e0860152600882015416610100850152611d7160098201611ae4565b610120850152611d83600a8201611ae4565b610140850152600b810154610160850152611da0600c8201611ae4565b6101808501520154910152565b60209193611dde938186604051978895878701378401918583016000815237016000838201520380845201826118e7565b90565b15611de857565b60405162461bcd60e51b815260206004820152602660248201527f4f6e6c792076616c696461746f72732063616e2063616c6c20746869732066756044820152653731ba34b7b760d11b6064820152608490fd5b60001981146103fd5760010190565b15611e5257565b60405162461bcd60e51b815260206004820152601660248201527514da59db985d1d5c9948185b1c9958591e481d5cd95960521b6044820152606490fd5b818110611e9b575050565b60008155600101611e90565b9190601f8111611eb657505050565b611b25926000526020600020906020601f840160051c83019310611ee2575b601f0160051c0190611e90565b9091508190611ed5565b8160011b916000199060031b1c19161790565b918254600160401b8110156112bd57611f1f906001948582018155611a7c565b9390936116ee576001600160401b0382116112bd57611f4882611f428654611aaa565b86611ea7565b600090601f8311600114611f7a57508190611f6b93600092611f6f575050611eec565b9055565b013590503880610ef3565b92601f19831691858152836020938483209483905b88838310611fc45750505010611faa575b505050811b019055565b0135600019600384901b60f8161c19169055388080611fa0565b868601358855909601959384019387935090810190611f8f565b9081546001600160401b0381116112bd5760209260405193612005818460051b01866118e7565b82855260009182528082208186015b848410612022575050505050565b600183819261203085611ae4565b815201920193019290612014565b903590601e198136030182121561014257018035906001600160401b038211610142576020019181360383136101425756fea2646970667358221220ddd12b6caba621a923171e4449123ccd365ccbf4b2d384438816744f2f4ff62864736f6c63430008150033";

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
    bootstrapValidator: AddressLike,
    bootstrapChainFee: ChainFeeStruct[],
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      bootstrapValidator,
      bootstrapChainFee,
      overrides || {}
    );
  }
  override deploy(
    bootstrapValidator: AddressLike,
    bootstrapChainFee: ChainFeeStruct[],
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      bootstrapValidator,
      bootstrapChainFee,
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
