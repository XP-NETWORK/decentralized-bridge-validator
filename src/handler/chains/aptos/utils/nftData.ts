import type { TAptosBridgeClient } from "..";
import type { LogInstance } from "../../../types";
import { useMutexAndRelease } from "../../../utils";
import type { AptosProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  fetchProvider: AptosProviderFetch,
  fetchBridge: () => Promise<readonly [TAptosBridgeClient, () => void]>,
  _log: LogInstance,
) {
  console.log({ tokenId, contract });
  const [taddr] = await useMutexAndRelease(fetchBridge, async (b) =>
    b.view.token_id_from_nonce_and_collection({
      functionArguments: [tokenId, Buffer.from(contract.slice(2), "hex")],
      typeArguments: [],
    }),
  );
  const md = await useMutexAndRelease(fetchProvider, async (a) => {
    return a.digitalAsset.getDigitalAssetData({
      digitalAssetAddress: taddr,
    });
  });
  const cd = await useMutexAndRelease(fetchProvider, async (a) => {
    return a.digitalAsset.getCollectionDataByCollectionId({
      collectionId: md.collection_id,
    });
  });
  return {
    metadata: md.token_uri,
    name: cd.collection_name,
    royalty: 0n,
    symbol: cd.collection_name.slice(0, 5).toUpperCase(),
  };
}
