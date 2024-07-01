import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { Nonce } from "@multiversx/sdk-network-providers/out/primitives";
import { LogInstance } from "../../types";
import { retry } from "../../utils";

export default async function nftData(
  tokenId: string,
  contract: string,
  provider: INetworkProvider,
  gatewayURL: string,
  log: LogInstance,
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
        ).catch(() => undefined)
      )
        ?.json()
        ?.catch(() => undefined)
    )?.data;
    return {
      metaData: atob(response.uris?.at(1) ?? ""),
      royalties: response?.royalties ?? 0,
    };
  };
  const nftDetails = await retry(
    () => provider.getDefinitionOfTokenCollection(contract),
    `Trying to fetch Nft Data for ${contract}`,
    log,
    5,
  ).catch(() => undefined);
  const { royalties, metaData } = await getNonFungibleToken(
    contract,
    parseInt(tokenId),
  );
  return {
    name: nftDetails?.name ?? "XP Wrapped Nft",
    symbol: nftDetails?.ticker ?? "XPNFT",
    metadata: metaData,
    royalty: BigInt(royalties),
  };
}
