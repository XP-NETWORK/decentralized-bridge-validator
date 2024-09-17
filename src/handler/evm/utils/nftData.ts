import type { JsonRpcProvider } from "ethers";
import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";
import { retry } from "../../utils";
import { MAX_SALE_PRICE } from "../constants";

const nftData = (provider: JsonRpcProvider, logger: LogInstance) => {
  return async (tokenId: string, contract: string) => {
    const nft = ERC721Royalty__factory.connect(contract, provider);
    // const code = await provider.getCode(contract).catch(() => "");

    const name = await retry(
      () => nft.name(),
      `Trying to fetch name() for ${contract}`,
      logger,
      5,
    ).catch(() => {
      return "";
    });

    const symbol = await retry(
      () => nft.symbol(),
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const royalty = await retry(
      () => nft.royaltyInfo(tokenId, MAX_SALE_PRICE),
      `Trying to fetch royaltyInfo() for ${contract}`,
      logger,
      5,
    ).catch(() => {
      return undefined;
    });

    const metadata = await retry(
      () => nft.tokenURI(tokenId),
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
