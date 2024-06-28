import { AccountAddressInput, Aptos } from "@aptos-labs/ts-sdk";

export default async function getBalance(
  aptosClient: Aptos,
  accountAddress: AccountAddressInput,
) {
  const balance = await aptosClient.getAccountAPTAmount({
    accountAddress: accountAddress,
  });
  return BigInt(balance);
}
