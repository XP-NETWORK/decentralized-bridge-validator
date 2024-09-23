import { Nonce } from "@multiversx/sdk-network-providers/out/primitives";
import type { LogInstance } from "../../types";
import { retry } from "../../utils";
import type { MXProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  provider: MXProviderFetch,
  gatewayURL: string,
  log: LogInstance,
) {
  const getNonFungibleToken = async (
    collection: string,
    nonce: number,
  ): Promise<{ royalties: number; metaData: string }> => {
    const nonceAsHex = new Nonce(nonce).hex();
    const response = await (
      await fetch(
        `${gatewayURL.replace(
          "gateway",
          "api",
        )}/nfts/${collection}-${nonceAsHex}`,
      ).catch(() => undefined)
    )
      ?.json()
      ?.catch(() => undefined);
    return {
      metaData: atob(response.uris?.at(1) ?? ""),
      royalties: response?.royalties ?? 0,
    };
  };
  const [p, r] = await provider();
  const nftDetails = await retry(
    () => p.getDefinitionOfTokenCollection(contract),
    `Trying to fetch Nft Data for ${contract}`,
    log,
  ).catch(() => undefined);
  r();
  const { royalties, metaData } = await getNonFungibleToken(
    contract,
    Number.parseInt(tokenId),
  );
  return {
    name: nftDetails?.name ?? "XP Wrapped Nft",
    symbol: nftDetails?.ticker ?? "XPNFT",
    metadata: metaData,
    royalty: BigInt(royalties),
  };
}
