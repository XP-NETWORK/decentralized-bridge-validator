import type { Near } from "near-api-js";
import type { LogInstance } from "../../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  agent: Near,
  log: LogInstance,
) {
  const name: string = "TODO";
  const symbol: string = "TODO";
  const metadata: string = "TODO";

  return {
    metadata,
    name: name === "" ? "TICP" : name,
    royalty: 0n,
    symbol: symbol === "" ? "TICP" : symbol,
  };
}
