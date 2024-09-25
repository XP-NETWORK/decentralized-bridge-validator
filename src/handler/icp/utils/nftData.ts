import { Actor } from "@dfinity/agent";
import { idlFactory } from "../../../contractsTypes/icp/nft/nft";
import type { _SERVICE } from "../../../contractsTypes/icp/nft/nft.types";
import type { LogInstance } from "../../types";
import { useMutexAndRelease } from "../../utils";
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
  const name = await useMutexAndRelease(
    fetchNft,
    async (nft) => await nft.icrc7_name(),
  );
  const symbol = await useMutexAndRelease(
    fetchNft,
    async (nft) => await nft.icrc7_symbol(),
  );

  let metadata = "";
  try {
    const [[md]] = await useMutexAndRelease(
      fetchNft,
      async (nft) => await nft.icrc7_token_metadata([BigInt(tokenId)]),
    );

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
