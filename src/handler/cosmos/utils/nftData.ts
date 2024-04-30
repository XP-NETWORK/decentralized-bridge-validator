import { AccountData } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { CosmNft } from "@xp/cosmos-client";
import { retry } from "../../utils";

export default async function nftData(
  tokenId: string,
  contract: string,
  client: SigningCosmWasmClient,
  sender: AccountData,
) {
  const nftC = new CosmNft.CosmosNftClient(client, sender.address, contract);
  const data = await retry(
    async () => {
      return await nftC.contractInfo();
    },
    `Trying to fetch Nft Data for ${contract}`,
    5,
  ).catch(() => undefined);

  const nft_info = await retry(
    async () => {
      return await nftC.nftInfo({
        tokenId: tokenId,
      });
    },
    `Trying to fetch Royalty Info for ${contract}`,
    5,
  ).catch(() => undefined);

  const tokenURI = nft_info?.token_uri || "";

  return {
    name: data?.name ?? "XP Wrapped Nft",
    symbol: data?.symbol ?? "XPNFT",
    metadata: tokenURI,
    royalty: BigInt(
      (nft_info?.extension as { royalty_info: { sale_price: string } })
        ?.royalty_info.sale_price ?? 1,
    ),
  };
}
