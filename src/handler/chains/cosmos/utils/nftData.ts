import type { AccountData } from "@cosmjs/amino";
import { CosmNft } from "@xp/cosmos-client";
import type { LogInstance } from "../../../types";
import { retry, useMutexAndRelease } from "../../../utils";
import type { CosmWasmFetchProvider } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  fetchProvider: CosmWasmFetchProvider,
  sender: AccountData,
  log: LogInstance,
) {
  const nftC = async () => {
    const [client, release] = await fetchProvider();
    const nft = new CosmNft.CosmosNftClient(client, sender.address, contract);
    return [nft, release] as const;
  };
  const data = await retry(
    async () => {
      const ci = await useMutexAndRelease(
        nftC,
        async (nft) => await nft.contractInfo(),
      );
      return ci;
    },
    `Trying to fetch Nft Data for ${contract}`,
    log,
  ).catch(() => undefined);

  const nft_info = await retry(
    async () => {
      const nftInfo = await useMutexAndRelease(
        nftC,
        async (nft) =>
          await nft.nftInfo({
            tokenId: tokenId,
          }),
      );
      return nftInfo;
    },
    `Trying to fetch Royalty Info for ${contract}`,
    log,
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
