import type { JsonRpcProvider } from "ethers";
import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import { MAX_SALE_PRICE } from "../constants";

const nftData = (provider: JsonRpcProvider) => {
  return async (tokenId: string, contract: string) => {
    const nft = ERC721Royalty__factory.connect(contract, provider);
    const code = await provider.getCode(contract).catch(() => "");

    const name = await retryFn(
      () => nft.name(),
      `Trying to fetch name() for ${contract}`,
      nft.name.fragment.selector,
      code,
    );

    const symbol = await retryFn(
      () => nft.symbol(),
      `Trying to fetch symbol() for ${contract}`,
      nft.symbol.fragment.selector,
      code,
    );

    const royalty = await retryFn(
      () => nft.royaltyInfo(tokenId, MAX_SALE_PRICE),
      `Trying to fetch royaltyInfo() for ${contract}`,
      nft.royaltyInfo.fragment.selector,
      code,
    );

    const metadata = await retryFn(
      () => nft.tokenURI(tokenId),
      `Trying to fetch tokenURI() for ${contract}`,
      nft.tokenURI.fragment.selector,
      code,
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

export async function retryFn<T>(
  func: () => Promise<T>,
  ctx: string,
  selector: string,
  code: string,
  retries = 3,
) {
  try {
    return await func();
  } catch (e) {
    if (code.includes(selector)) {
      return await retryFn(func, ctx, selector, code, retries - 1);
    }
    return undefined;
  }
}
