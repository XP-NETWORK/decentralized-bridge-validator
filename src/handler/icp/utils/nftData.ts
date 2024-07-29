import type { HttpAgent } from "@dfinity/agent";
import { createActor } from "../../../contractsTypes/icp/nft";
import type { LogInstance } from "../../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  agent: HttpAgent,
  log: LogInstance,
) {
  const nft = createActor(contract, {
    agent,
  });
  const name = await nft.icrc7_name();
  const symbol = await nft.icrc7_symbol();

  let metadata = "";
  try {
    const [[md]] = await nft.icrc7_token_metadata([BigInt(tokenId)]);
    if (!md)
      throw new Error("No metadata found for this token id and contract");
    const [, value] = md[0];
    if (!("Text" in value)) {
      throw new Error("Invalid Metadata");
    }
    metadata = value.Text;
  } catch (e) {
    log.error(
      `Failed to fetch token metadata for contract: ${contract} of tid: ${tokenId}`,
    );
  }

  return {
    metadata,
    name,
    royalty: 0n,
    symbol,
  };
}
