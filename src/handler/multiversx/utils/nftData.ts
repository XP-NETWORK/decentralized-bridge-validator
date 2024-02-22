import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { Nonce } from "@multiversx/sdk-network-providers/out/primitives";

export default async function nftData(
  tokenId: string,
  contract: string,
  provider: INetworkProvider,
  gatewayURL: string,
) {
  const getNonFungibleToken = async (
    collection: string,
    nonce: number,
  ): Promise<{ royalties: number; metaData: string }> => {
    const nonceAsHex = new Nonce(nonce).hex();
    const response = (
      await (
        await fetch(
          `${gatewayURL.replace(
            "gateway",
            "api",
          )}/nfts/${collection}-${nonceAsHex}`,
        )
      ).json()
    ).data;
    return {
      metaData: atob(response.uris[1]),
      royalties: response.royalties,
    };
  };
  const nftDetails = await provider.getDefinitionOfTokenCollection(contract);
  const { royalties, metaData } = await getNonFungibleToken(
    contract,
    parseInt(tokenId),
  );
  return {
    name: nftDetails.name,
    symbol: nftDetails.ticker,
    metadata: metaData,
    royalty: BigInt(royalties),
  };
}
