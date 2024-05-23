import { Address, TonClient } from "@ton/ton";
import axios, { AxiosInstance } from "axios";
import { raise } from "..";
import { NftCollection } from "../../../contractsTypes/ton/tonNftCollection";
import { NftItem } from "../../../contractsTypes/ton/tonNftContract";

export default async function nftData(
  tokenId: string,
  contract: string,
  client: TonClient,
) {
  const http = axios.create();

  const collection = client.open(
    NftCollection.fromAddress(Address.parse(contract)),
  );
  const royaltyParams = await collection.getRoyaltyParams();
  const denom = 10000 / Number(royaltyParams.denominator);
  const royalty = Number(royaltyParams.numerator) * denom;
  const collection_md_uri = (
    await collection.getGetCollectionData()
  ).collection_content
    .asSlice()
    .loadStringTail();
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
  content.loadUint(8);
  const uri = content.loadStringTail();
  const nft_uri: string = uri.includes("://")
    ? uri
    : `${collection_md_uri.substring(
        0,
        collection_md_uri.lastIndexOf("/") + 1,
      )}${uri}`;
  const md = await fetchHttpOrIpfs(nft_uri, http).catch((_) => {
    return {
      name: "TTON",
    };
  });
  return {
    metadata: uri,
    symbol: collection_md.name ?? "TTON",
    name: md.name ?? collection_md.name ?? "TTON",
    royalty: BigInt(royalty),
  };
}

async function fetchHttpOrIpfs(uri: string, http: AxiosInstance) {
  const url = new URL(uri);
  if (url.protocol === "http:" || url.protocol === "https:") {
    const response = await http.get(uri);
    return response.data;
  }
  if (url.protocol === "ipfs:") {
    const response = await http.get(
      `https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`,
    );
    return response.data;
  }
  throw new Error("Unsupported protocol");
}
