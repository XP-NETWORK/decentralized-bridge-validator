import { type CLString, Contracts } from "casper-js-sdk";
import type { LogInstance } from "../../../types";
import { useMutexAndRelease } from "../../../utils";
import type { CasperProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  fetchProvider: CasperProviderFetch,
  _log: LogInstance,
) {
  async function fetchNftContract() {
    const [provider, release] = await fetchProvider();
    const client = new Contracts.Contract(provider);
    client.setContractHash(`hash-${contract}`);
    return [client, release] as const;
  }
  const [cn, cs] = await useMutexAndRelease(fetchNftContract, async (a) => {
    const cn = await a.queryContractData(["collection_name"]);
    const cs = await a.queryContractData(["collection_symbol"]);
    return [cn, cs] as const;
  });
  const md = await useMutexAndRelease(fetchNftContract, async (ctr) => {
    return ((await ctr
      .queryContractDictionary("metadata_raw", tokenId)
      .catch(() => {
        console.log(`Failed to get raw metadata for ${contract} - ${tokenId}`);
        return undefined;
      })) ||
      (await ctr
        .queryContractDictionary("metadata_custom_validated", tokenId)
        .catch(() => {
          console.log(
            `Failed to get custom validated metadata for ${contract} - ${tokenId}`,
          );
          throw new Error(
            `Failed to get metadata for ${contract} - ${tokenId}`,
          );
        }))) as CLString;
  });
  return {
    metadata: md.data,
    name: cn,
    royalty: 0n,
    symbol: cs,
  };
}
