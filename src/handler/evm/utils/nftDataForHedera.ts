import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import { RoyaltyInfoProxy__factory } from "../../../contractsTypes/hedera/RoyaltyInfoProxy__factory";
import type { LogInstance } from "../../types";
import { retry } from "../../utils";
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
        const [nftContract, release] = await nft();
        const name = nftContract.name();
        release();
        return name;
      },
      `Trying to fetch name() for ${contract}`,
      logger,
    );

    const symbol = await retry(
      async () => {
        const [nftContract, release] = await nft();
        const symbol = nftContract.symbol();
        release();
        return symbol;
      },
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const tokenInfo = await retry(
      async () => {
        const [rip, release] = await proxy();
        const rinfo = await rip.royaltyInfo.staticCall(contract, tokenId);
        release();
        return rinfo;
      },
      `Trying to fetch royaltyInfo() for ${contract}`,
      logger,
    );

    const rinfo = tokenInfo?.[1].tokenInfo[7][0];
    // If undefined, set royalty as zero.
    const royalty = rinfo?.numerator ?? 0n;

    const metadata = await retry(
      async () => {
        const [nftContract, release] = await nft();
        const tokenURI = nftContract.tokenURI(tokenId);
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
      royalty: royalty,
      metadata: metadata || "",
    };
  };
};

export default nftDataForHedera;
