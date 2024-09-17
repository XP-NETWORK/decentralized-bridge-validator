import type { JsonRpcProvider } from "ethers";
import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import { RoyaltyInfoProxy__factory } from "../../../contractsTypes/hedera/RoyaltyInfoProxy__factory";
import type { LogInstance } from "../../types";
import { retry } from "../../utils";

const nftDataForHedera = (
  provider: JsonRpcProvider,
  royaltyProxy: string,
  logger: LogInstance,
) => {
  const proxy = RoyaltyInfoProxy__factory.connect(royaltyProxy, provider);
  return async (tokenId: string, contract: string) => {
    const nft = ERC721Royalty__factory.connect(contract, provider);

    const name = await retry(
      () => nft.name(),
      `Trying to fetch name() for ${contract}`,
      logger,
    );

    const symbol = await retry(
      () => nft.symbol(),
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const tokenInfo = await retry(
      () => proxy.royaltyInfo.staticCall(contract, tokenId),
      `Trying to fetch royaltyInfo() for ${contract}`,
      logger,
    );

    const rinfo = tokenInfo?.[1].tokenInfo[7][0];
    // If undefined, set royalty as zero.
    const royalty = rinfo?.numerator ?? 0n;

    const metadata = await retry(
      () => nft.tokenURI(tokenId),
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
