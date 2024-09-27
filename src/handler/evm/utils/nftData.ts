import { ERC721Royalty__factory } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";
import { retry, useMutexAndRelease } from "../../utils";
import { MAX_SALE_PRICE } from "../constants";
import type { EVMProviderFetch } from "../types";

const nftData = (fetchProvider: EVMProviderFetch, logger: LogInstance) => {
  const inf = ERC721Royalty__factory.createInterface();
  return async (tokenId: string, contract: string) => {
    const nft = async () => {
      const [provider, release] = await fetchProvider();
      return [
        ERC721Royalty__factory.connect(contract, provider),
        release,
      ] as const;
    };
    const code = await useMutexAndRelease(
      fetchProvider,
      async (provider) =>
        await provider.getCode(contract).catch(() => {
          logger.warn(`Failed to fetch code for ${contract}`);
          return "";
        }),
    );

    const nameSelector = inf.getFunction("name").selector;
    const symbolSelector = inf.getFunction("symbol").selector;
    const metadataSelector = inf.getFunction("tokenURI").selector;
    const royaltyInfoSelector = inf.getFunction("royaltyInfo").selector;

    const name = await evmRetryIfFunctionExistsElse(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.name();
        });
      },
      code,
      nameSelector,
      `Trying to fetch name() for ${contract}`,
      logger,
    ).catch(() => {
      return "";
    });

    const symbol = await evmRetryIfFunctionExistsElse(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.symbol();
        });
      },
      code,
      symbolSelector,
      `Trying to fetch symbol() for ${contract}`,
      logger,
    );

    const royalty = await evmRetryIfFunctionExistsElse(
      async () => {
        return useMutexAndRelease(nft, async (ctr) => {
          return ctr.royaltyInfo(tokenId, MAX_SALE_PRICE);
        });
      },
      code,
      royaltyInfoSelector,
      `Trying to fetch royaltyInfo() for ${contract}`,
      logger,
    ).catch(() => {
      logger.warn("retry royalty catch");
      return undefined;
    });

    const metadata = await evmRetryIfFunctionExistsElse(
      async () => {
        const result = useMutexAndRelease(nft, async (ctr) => {
          return ctr.tokenURI(tokenId);
        });
        return result;
      },
      code,
      metadataSelector,
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

async function evmRetryIfFunctionExistsElse<Ret>(
  fn: () => Promise<Ret>,
  code: string,
  selector: string,
  ctx: string,
  logger: LogInstance,
  retryCount = 5,
) {
  if (code.includes(selector)) {
    return await retry(fn, ctx, logger, retryCount);
  }
  return undefined;
}
