import { Address, TonClient } from "@ton/ton";
import { NftCollection } from "../../../contractsTypes/ton/tonNftCollection";
import { NftItem } from "../../../contractsTypes/ton/tonNftContract";

export async function nftData(
  _tokenId: string,
  contract: string,
  client: TonClient,
) {
  const nftItem = client.open(
    NftItem.fromAddress(Address.parseFriendly(contract).address),
  );

  const getCollectionMetaData = async () => {
    const nftData = await nftItem.getGetNftData();
    if (nftData.collection_address) {
      const nftCollection = client.open(
        NftCollection.fromAddress(nftData.collection_address),
      );
      const { collection_content } = await nftCollection.getGetCollectionData();
      const collectionContentSlice = collection_content.asSlice();
      collectionContentSlice.loadUint(8);
      const metaDataURL = collectionContentSlice.loadStringTail();
      return metaDataURL;
    }
    const individualContentSlice = nftData.individual_content.asSlice();
    individualContentSlice.loadBits(8);
    const metaDataURL = individualContentSlice.loadStringTail();
    return metaDataURL;
  };

  const nftData = await nftItem.getGetNftData();
  const individualContentSlice = nftData.individual_content.asSlice();
  individualContentSlice.loadBits(8);
  const metaDataURL = individualContentSlice.loadStringTail();

  const metaData = (await (await fetch(await getCollectionMetaData())).json())
    .data;

  let royalty = 0n;

  if (nftData.collection_address) {
    const nftCollection = client.open(
      NftCollection.fromAddress(nftData.collection_address),
    );
    const royaltyParams = await nftCollection.getRoyaltyParams();
    const royaltyInNum = royaltyParams.numerator / royaltyParams.denominator;
    const standardRoyalty = royaltyInNum * BigInt(10);
    royalty = standardRoyalty;
  }
  return {
    metadata: metaDataURL,
    symbol: "TTON",
    name: metaData.name,
    royalty,
  };
}
