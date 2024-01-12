import { type INftContract, type ISecretContractConfig } from '@src/types'
import { SecretNetworkClient } from 'secretjs'

const getSecretSingleNftContract = ({
  rpcURL,
  chainId,
  contractAddress
}: ISecretContractConfig): INftContract => {
  const secretjs = new SecretNetworkClient({
    url: rpcURL,
    chainId
  })

  return {
    name: async () => {
      const name = (
        (await secretjs.query.compute.queryContract({
          contract_address: contractAddress,
          query: { contract_info: {} }
        }))
      ).contract_info.name
      return name
    },
    symbol: async () => {
      const symbol = (
        (await secretjs.query.compute.queryContract({
          contract_address: contractAddress,
          query: { contract_info: {} }
        }))
      ).contract_info.symbol
      return symbol
    },
    royaltyInfo: async (tokenId: bigint) => {
      const royalty_info = (
        (await secretjs.query.compute.queryContract({
          contract_address: contractAddress,
          query: { royalty_info: { token_id: tokenId.toString() } }
        }))
      ).royalty_info.royalty_info
      const decimal_places_in_rates =
                royalty_info.decimal_places_in_rates
      const max_percentage = Number(
        '1' + '0'.repeat(decimal_places_in_rates)
      )
      const rate = royalty_info.royalties[0].rate
      const royalty = (rate / max_percentage) * 10000
      return String(royalty)
    },
    tokenURI: async (tokenId: bigint) => {
      const nft_info = (
        (await secretjs.query.compute.queryContract({
          contract_address: contractAddress,
          query: { nft_info: { token_id: tokenId.toString() } }
        }))
      ).nft_info
      const tokenURI = nft_info?.extension?.media[0]?.url || ''
      return tokenURI
    }
  }
}

export default getSecretSingleNftContract
