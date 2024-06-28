import { AccountAddressInput, Aptos } from "@aptos-labs/ts-sdk";

export default async function nftData(
  tokenAddress: AccountAddressInput,
  aptosClient: Aptos,
) {
  aptosClient.getEvents;
  const tokenDataPromise = aptosClient.getDigitalAssetData({
    digitalAssetAddress: tokenAddress,
  });

  const royaltyDataPromise = aptosClient.getAccountResource({
    accountAddress: tokenAddress,
    resourceType: "0x4::royalty::Royalty",
  });

  const metadataPromise = aptosClient.getAccountResource({
    accountAddress: tokenAddress,
    resourceType: "0x1::fungible_asset::Metadata",
  });

  const [tokenData, royaltyData, metadata] = await Promise.allSettled([
    tokenDataPromise,
    royaltyDataPromise,
    metadataPromise,
  ]);

  let royaltyPercentage = 0;
  let symbol = "";
  let name = "";
  let uri = "";

  if (tokenData.status === "fulfilled") {
    const tokenDataValue = tokenData?.value;
    name = tokenDataValue.token_name;
    uri = tokenDataValue.token_uri;
  }

  if (royaltyData.status === "fulfilled") {
    const royaltyDataValue = royaltyData?.value;
    royaltyPercentage =
      (royaltyDataValue.numerator / royaltyDataValue.denominator) * 100;
  }

  if (metadata.status === "fulfilled") {
    const metadataValue = metadata?.value;
    symbol = metadataValue.symbol;
  }

  return {
    name: name ?? "XP Wrapped Nft",
    symbol: symbol ?? "XPNFT",
    metadata: uri,
    royalty: BigInt(royaltyPercentage),
  };
}
