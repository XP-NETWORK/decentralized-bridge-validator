import { SecretNetworkClient } from "secretjs";

export default async function nftData(
  tokenId: string,
  contract: string,
  client: SecretNetworkClient,
) {
  const data = (
    (await client.query.compute.queryContract({
      contract_address: contract,
      query: { contract_info: {} },
    })) as { contract_info: { name: string; symbol: string } }
  ).contract_info;

  const royalty_info = (
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
  const decimal_places_in_rates = royalty_info.decimal_places_in_rates;
  const max_percentage = Number(`1${"0".repeat(decimal_places_in_rates)}`);
  const rate = royalty_info.royalties[0].rate;
  const royalty = (rate / max_percentage) * 10000;

  const nft_info = (
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
  const tokenURI = nft_info?.extension?.media[0]?.url || "";

  return {
    name: data.name,
    symbol: data.symbol,
    metadata: tokenURI,
    royalty: BigInt(royalty),
  };
}
