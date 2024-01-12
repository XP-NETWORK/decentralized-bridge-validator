import { type TChain } from '@src/types'

interface IGetEvmNftDetails {
  sourceNftContractAddress: string
  sourceChain: TChain
  tokenId: string
  nftType: string
}

export type { IGetEvmNftDetails }
