import { Actor } from "@dfinity/agent";
import { idlFactory } from "../../../contractsTypes/icp/nft/nft";
import type { _SERVICE } from "../../../contractsTypes/icp/nft/nft.types";
import type { LogInstance } from "../../types";
import type { ICPProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  fetchProvider: ICPProviderFetch,
  log: LogInstance,
) {
  const fetchNft = async () => {
    const [agent, release] = await fetchProvider();
    const canister = Actor.createActor<_SERVICE>(idlFactory, {
      agent,
      canisterId: contract,
    });
    return [canister, release] as const;
  };
  const [nft, release] = await fetchNft();
  const name = await nft.icrc7_name();
  const symbol = await nft.icrc7_symbol();
  release();

  let metadata = "";
  try {
    const [nft, release] = await fetchNft();
    const [[md]] = await nft.icrc7_token_metadata([BigInt(tokenId)]);
    release();
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
    name: name === "" ? "TICP" : name,
    royalty: 0n,
    symbol: symbol === "" ? "TICP" : symbol,
  };
}
