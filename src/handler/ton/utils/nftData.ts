import { Address } from "@ton/ton";
import axios from "axios";
import { raise } from "..";
import { NftCollection } from "../../../contractsTypes/ton/tonNftCollection";
import { NftItem } from "../../../contractsTypes/ton/tonNftContract";
import { fetchHttpOrIpfs, useMutexAndRelease } from "../../utils";
import type { TONProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  client: TONProviderFetch,
) {
  const http = axios.create();

  const collection = async () => {
    const [provider, release] = await client();
    const coll = provider.open(
      NftCollection.fromAddress(Address.parse(contract)),
    );
    return [coll, release] as const;
  };
  const royaltyParams = await useMutexAndRelease(
    collection,
    async (c) =>
      await c.getRoyaltyParams().catch((_) => {
        return {
          $$type: "RoyaltyParams" as const,
          numerator: 0n,
          denominator: 0n,
          destination: Address.parse(contract),
        };
      }),
  );
  const denom = 10000 / Number(royaltyParams.denominator);
  const royalty = Number(royaltyParams.numerator) * denom;

  const collection_md_slice = await useMutexAndRelease(collection, async (c) =>
    (await c.getGetCollectionData()).collection_content.asSlice(),
  );
  collection_md_slice.loadInt(8);
  const collection_md_uri = collection_md_slice.loadStringTail();

  const collection_md = await fetchHttpOrIpfs(collection_md_uri, http).catch(
    (_) => {
      return {
        name: "TTON",
        symbol: "TTON",
      };
    },
  );
  const nft = await useMutexAndRelease(collection, async (c) => {
    return NftItem.fromAddress(
      (await c.getGetNftAddressByIndex(BigInt(tokenId))) ??
        raise("NFT Does not exist."),
    );
  });

  const nftItem = async () => {
    const [provider, release] = await client();
    const item = provider.open(nft);
    return [item, release] as const;
  };
  const nftData = await useMutexAndRelease(
    nftItem,
    async (item) => await item.getGetNftData(),
  );

  const content = nftData.individual_content.asSlice();
  const firstBit = content.preloadBits(8).toString();
  if (firstBit === "01" || firstBit === "00") {
    content.loadBits(8);
  }
  const uri = content.loadStringTail();
  const nft_uri: string = uri.includes("://")
    ? uri
    : `${collection_md_uri.substring(
        0,
        collection_md_uri.lastIndexOf("/") + 1,
      )}${uri}`;
  const md = await fetchHttpOrIpfs(nft_uri, http).catch((_) => {
    return {
      name: undefined,
    };
  });
  return {
    metadata: nft_uri,
    symbol: collection_md.name ?? "TTON",
    name: md.name ?? collection_md.name ?? "TTON",
    royalty: BigInt(royalty),
  };
}
