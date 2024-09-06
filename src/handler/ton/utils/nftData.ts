import { Address, type TonClient } from "@ton/ton";
import axios from "axios";
import { raise } from "..";
import { NftCollection } from "../../../contractsTypes/ton/tonNftCollection";
import { NftItem } from "../../../contractsTypes/ton/tonNftContract";
import { fetchHttpOrIpfs } from "../../utils";

export default async function nftData(
  tokenId: string,
  contract: string,
  client: TonClient,
) {
  const http = axios.create();

  const collection = client.open(
    NftCollection.fromAddress(Address.parse(contract)),
  );
  const royaltyParams = await collection.getRoyaltyParams().catch((_) => {
    return {
      $$type: "RoyaltyParams" as const,
      numerator: 0n,
      denominator: 0n,
      destination: Address.parse(contract),
    };
  });
  const denom = 10000 / Number(royaltyParams.denominator);
  const royalty = Number(royaltyParams.numerator) * denom;
  const collection_md_slice = (
    await collection.getGetCollectionData()
  ).collection_content.asSlice();
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

  const nftItem = client.open(
    NftItem.fromAddress(
      (await collection.getGetNftAddressByIndex(BigInt(tokenId))) ??
        raise("NFT Does not exist."),
    ),
  );
  const nftData = await nftItem.getGetNftData();
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
