import {
  AccountAddressInput,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";

export default async function nftData(
  tokenAddress: AccountAddressInput,
  aptosClient: Aptos,
) {
  aptosClient.getEvents;
  const tokenDataPromise = aptosClient.digitalAsset.getDigitalAssetData({
    digitalAssetAddress: tokenAddress,
  });

  const royaltyDataPromise = aptosClient.account.getAccountResource({
    accountAddress: tokenAddress,
    resourceType: "0x4::royalty::Royalty",
  });

  const metadataPromise = aptosClient.account.getAccountResource({
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

function test() {
  const DEVNET_CONFIG = new AptosConfig({
    network: Network.DEVNET,
  });
  const DEVNET_CLIENT = new Aptos(DEVNET_CONFIG);

  nftData(
    // "0xa786270ddc1f81421ae55368f1fde6348009e7305aed09068bdb5618cfb5d970",
    "0x00e64a2117b6d443c634a89ae7dfc19401fe5b32a04963eee0bb0d453148ebe9",
    DEVNET_CLIENT,
    // "0xdb57ee8e9cded6a0ff1b002fecc6c0cccda9712da230b8ebebedf061a2c3899f"
  );
}

test();
