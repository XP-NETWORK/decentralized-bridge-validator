import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";
import { retry, useMutexAndRelease } from "../../utils";
import { MAX_SALE_PRICE } from "../constants";
import type { EVMProviderFetch } from "../types";

const nftData = (fetchProvider: EVMProviderFetch, logger: LogInstance) => {
  return async (tokenId: string, contract: string) => {
    const nft = async () => {
      const [provider, release] = await fetchProvider();
      return [
        ERC721Royalty__factory.connect(contract, provider),
        release,
      ] as const;
    };
    // const code = await provider.getCode(contract).catch(() => "");

    const name = await retry(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.name();
        });
      },
      `Trying to fetch name() for ${contract}`,
      logger,
      5,
    ).catch(() => {
      return "";
    });

    const symbol = await retry(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.symbol();
        });
      },
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const royalty = await retry(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.royaltyInfo(tokenId, MAX_SALE_PRICE);
        });
      },
      `Trying to fetch royaltyInfo() for ${contract}`,
      logger,
      5,
    ).catch(() => {
      logger.warn("retry royalty catch");
      return undefined;
    });

    const metadata = await retry(
      async () => {
        const result = useMutexAndRelease(nft, async (ctr) => {
          return ctr.tokenURI(tokenId);
        });
        return result;
      },
      `Trying to fetch tokenURI() for ${contract}`,
      logger,
    );

    return {
      name: name || "XP Wrapped Nft",
      symbol: symbol || "XPNFT",
      // If undefined, set royalty as zero.
      royalty: (royalty ?? [0n, 0n])[1],
      metadata: metadata || "",
    };
  };
};

export default nftData;
