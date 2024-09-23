import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";
import { retry } from "../../utils";
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
        const [nftContract, release] = await nft();
        const name = await nftContract.name();
        release();
        return name;
      },
      `Trying to fetch name() for ${contract}`,
      logger,
      5,
    ).catch(() => {
      return "";
    });

    const symbol = await retry(
      async () => {
        const [nftContract, release] = await nft();
        const symbol = await nftContract.symbol();
        release();
        return symbol;
      },
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const royalty = await retry(
      async () => {
        const [nftContract, release] = await nft();
        const royaltyInfo = await nftContract.royaltyInfo(
          tokenId,
          MAX_SALE_PRICE,
        );
        release();
        return royaltyInfo;
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
        const [nftContract, release] = await nft();
        const tokenURI = await nftContract.tokenURI(tokenId);
        release();
        return tokenURI;
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
