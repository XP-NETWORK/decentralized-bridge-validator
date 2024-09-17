import type { JsonRpcProvider } from "ethers";
import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import { RoyaltyInfoProxy__factory } from "../../../contractsTypes/hedera/RoyaltyInfoProxy__factory";

const nftDataForHedera = (provider: JsonRpcProvider, royaltyProxy: string) => {
  const proxy = RoyaltyInfoProxy__factory.connect(royaltyProxy, provider);
  return async (tokenId: string, contract: string) => {
    const nft = ERC721Royalty__factory.connect(contract, provider);

    const name = await retryFn(
      () => nft.name(),
      `Trying to fetch name() for ${contract}`,
    );

    const symbol = await retryFn(
      () => nft.symbol(),
      `Trying to fetch symbol() for ${contract}`,
    );

    const tokenInfo = await retryFn(
      () => proxy.royaltyInfo.staticCall(contract, tokenId),
      `Trying to fetch royaltyInfo() for ${contract}`,
    );

    const rinfo = tokenInfo?.[1].tokenInfo[7][0];
    // If undefined, set royalty as zero.
    const royalty = rinfo?.numerator ?? 0n;

    const metadata = await retryFn(
      () => nft.tokenURI(tokenId),
      `Trying to fetch tokenURI() for ${contract}`,
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

export async function retryFn<T>(
  func: () => Promise<T>,
  ctx: string,
  retries = 3,
) {
  if (retries === 0) {
    throw new Error(`Failed ${ctx}`);
  }
  try {
    return await func();
  } catch (e) {
    return await retryFn(func, ctx, retries - 1);
  }
}
