import { ERC721Royalty__factory } from '../../contractsTypes'
import { type IHederaContractConfig, type INftContract } from '@src/types'
import { JsonRpcProvider } from 'ethers'
import { RoyaltyInfoProxy__factory } from '@src/contractsTypes/Hedera/RoyaltyInfoProxy__factory'

const getHederaSingleNftContract = (
  contractConfig: IHederaContractConfig
): INftContract => {
  const provider = new JsonRpcProvider(contractConfig.rpcURL)
  const erc721Contract = ERC721Royalty__factory.connect(
    contractConfig.contractAddress,
    provider
  )
  return {
    name: async () => {
      return await erc721Contract.name()
    },
    symbol: async () => {
      return await erc721Contract.symbol()
    },
    royaltyInfo: async (tokenId: bigint) => {
      try {
        const contract = RoyaltyInfoProxy__factory.connect(
          contractConfig.royaltyInfoProxyAddress,
          provider
        )
        const [result, nftInfo] = await contract.royaltyInfo.staticCall(
          contractConfig.contractAddress,
          tokenId
        )
        console.log(result)
        const numerator = nftInfo[0][7][0][0]
        const denominator = nftInfo[0][7][0][1]
        const denominatorNormalized = denominator / BigInt(10000)
        const numeratorNormalized = numerator * denominatorNormalized
        return numeratorNormalized.toString()
      } catch (e) {
        console.log(e)
        return '0'
      }
    },
    tokenURI: async (tokenId: bigint) => {
      return await erc721Contract.tokenURI(tokenId)
    }
  }
}

export default getHederaSingleNftContract
