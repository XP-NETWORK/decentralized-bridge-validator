import type { LogInstance } from "../../types";
import { useMutexAndRelease } from "../../utils";
import type { AptosProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  _contract: string,
  fetchProvider: AptosProviderFetch,
  log: LogInstance,
) {
  const md = await useMutexAndRelease(fetchProvider, async (a) => {
    return a.digitalAsset.getDigitalAssetData({
      digitalAssetAddress: tokenId,
    });
  });
  const cd = await useMutexAndRelease(fetchProvider, async (a) => {
    return a.digitalAsset.getCollectionDataByCollectionId({
      collectionId: md.collection_id,
    });
  });
  log.silly(`Metadata for ${tokenId}:${_contract}-`, md, cd);
  return {
    metadata: md.token_uri,
    name: cd.collection_name,
    royalty: 0n,
    symbol: cd.collection_name.slice(0, 5).toUpperCase(),
  };
}
