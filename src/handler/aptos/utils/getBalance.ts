import { AccountAddress, Aptos } from "@aptos-labs/ts-sdk";

export default async function getBalance(
  aptosClient: Aptos,
  accountAddress: AccountAddress,
) {
  return await aptosClient.getAccountAPTAmount({
    accountAddress: accountAddress,
  });
}
