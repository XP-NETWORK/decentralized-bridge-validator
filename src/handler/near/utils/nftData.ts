import { Contract, type Near } from "near-api-js";
import type { LogInstance } from "../../types";

export default async function nftData(
  tokenId: string,
  collection: string,
  provider: Near,
  _log: LogInstance,
) {
  const contract = new Contract(provider.connection, collection, {
    viewMethods: ["nft_token", "nft_metadata"],
    changeMethods: [],
    useLocalViewExecution: false,
  });
  //@ts-ignore ik it works.
  const nft_metadata = await contract.nft_token({ token_id: tokenId });
  //@ts-ignore ik it works.
  const collection_metadata = await contract.nft_metadata();
  return {
    name: nft_metadata.metadata.title,
    symbol: collection_metadata.symbol,
    metadata: nft_metadata.metadata.media || nft_metadata.metadata.extra,
    royalty: BigInt(
      Object.values(nft_metadata.metadata.royalty || { a: 0 }).reduce(
        //@ts-ignore ik it works
        (e: number, c: number) => c + e,
      ) as number,
    ),
  };
}
