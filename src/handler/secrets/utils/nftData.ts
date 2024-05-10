import { SecretNetworkClient } from "secretjs";
import { retry } from "../../utils";

export default async function nftData(
  tokenId: string,
  contract: string,
  client: SecretNetworkClient,
) {
  const data = await retry(
    async () => {
      return (
        (await client.query.compute.queryContract({
          contract_address: contract,
          query: { contract_info: {} },
        })) as { contract_info: { name: string; symbol: string } }
      ).contract_info;
    },
    `Trying to fetch Nft Data for ${contract}`,
    5,
  ).catch(() => undefined);

  const royalty_info = await retry(
    async () => {
      return (
        (await client.query.compute.queryContract({
          contract_address: contract,
          query: { royalty_info: { token_id: tokenId.toString() } },
        })) as {
          royalty_info: {
            royalty_info: {
              decimal_places_in_rates: number;
              royalties: [{ recipient: string; rate: number }];
            };
          };
        }
      ).royalty_info.royalty_info;
    },
    `Trying to fetch Royalty Info for ${contract}`,
    5,
  ).catch(() => undefined);
  const decimal_places_in_rates = royalty_info?.decimal_places_in_rates ?? 0;
  const max_percentage = 10 ** decimal_places_in_rates;
  const rate = royalty_info?.royalties[0].rate ?? 0;
  const royalty = (rate / max_percentage) * 10000;

  const nft_info = await retry(
    async () => {
      return (
        (await client.query.compute.queryContract({
          contract_address: contract,
          query: { nft_info: { token_id: tokenId.toString() } },
        })) as {
          nft_info: {
            extension: {
              media: [{ url: string }];
            };
          };
        }
      ).nft_info;
    },
    `Trying to fetch Nft Info for ${contract}`,
    5,
  ).catch(() => undefined);
  const tokenURI =
    nft_info?.extension?.media[0]?.url ||
    //@ts-ignore
    nft_info?.token_uri ||
    "";

  return {
    name: data?.name ?? "XP Wrapped Nft",
    symbol: data?.symbol ?? "XPNFT",
    metadata: tokenURI,
    royalty: BigInt(royalty),
  };
}
