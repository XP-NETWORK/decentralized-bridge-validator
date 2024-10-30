import { ERC721Royalty__factory } from "../../../../contractsTypes/evm";
import { RoyaltyInfoProxy__factory } from "../../../../contractsTypes/hedera/RoyaltyInfoProxy__factory";
import type { LogInstance } from "../../../types";
import { retry, useMutexAndRelease } from "../../../utils";
import type { EVMProviderFetch } from "../types";

const nftDataForHedera = (
  fetchProvider: EVMProviderFetch,
  royaltyProxy: string,
  logger: LogInstance,
) => {
  const proxy = async () => {
    const [provider, release] = await fetchProvider();
    const contract = RoyaltyInfoProxy__factory.connect(royaltyProxy, provider);
    return [contract, release] as const;
  };
  return async (tokenId: string, contract: string) => {
    const nft = async () => {
      const [provider, release] = await fetchProvider();
      const contract = ERC721Royalty__factory.connect(royaltyProxy, provider);
      return [contract, release] as const;
    };

    const name = await retry(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.name();
        });
      },
      `Trying to fetch name() for ${contract}`,
      logger,
    );

    const symbol = await retry(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.symbol();
        });
      },
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const tokenInfo = await retry(
      async () => {
        return useMutexAndRelease(
          proxy,
          async (rip) => await rip.royaltyInfo.staticCall(contract, tokenId),
        );
      },
      `Trying to fetch royaltyInfo() for ${contract}`,
      logger,
    );

    const rinfo = tokenInfo?.[1].tokenInfo[7][0];
    // If undefined, set royalty as zero.
    const royalty = rinfo?.numerator ?? 0n;

    const metadata = await retry(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.tokenURI(tokenId);
        });
      },
      `Trying to fetch tokenURI() for ${contract}`,
      logger,
    );

    return {
      name: name || "XP Wrapped Nft",
      symbol: symbol || "XPNFT",
      // If undefined, set royalty as zero.
      royalty: royalty,
      metadata: metadata || "",
    };
  };
};

export default nftDataForHedera;
