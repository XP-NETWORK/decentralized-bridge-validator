import type { TezosToolkit } from "@taquito/taquito";
import { Tzip16Module, bytesToString, tzip16 } from "@taquito/tzip16";

import type { NFTContractType } from "../../../contractsTypes/tezos/NFT.types";
import { tas } from "../../../contractsTypes/tezos/type-aliases";
import type { LogInstance } from "../../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  provider: TezosToolkit,
  logger: LogInstance,
) {
  const getNftTokenMetaData = async (contract: string, tokenId: bigint) => {
    const nftContract = await provider.contract.at<NFTContractType>(contract);

    const tokenMetaData = await (
      await nftContract.storage()
    ).tokens.token_metadata.get(tas.nat(tokenId.toString()));
    const metaDataInHex = tokenMetaData.token_info.get("");
    return bytesToString(metaDataInHex);
  };
  const tokenMd = await getNftTokenMetaData(contract, BigInt(tokenId));
  let name = "NTEZOS";
  try {
    provider.addExtension(new Tzip16Module());
    const nftContract = await provider.contract.at(contract, tzip16);
    const md = nftContract.tzip16();
    name = (await md.metadataName()) ?? name;
  } catch (e) {
    logger.error("error getting name Tezos");
  }
  let symbol = "NTEZOS";
  try {
    const isUrl = URLCanParse(tokenMd);
    if (isUrl) {
      const metaData: { symbol?: string } = await fetch(tokenMd).then((res) =>
        res.json(),
      );
      symbol = metaData.symbol ?? symbol;
    }
    symbol = JSON.parse(tokenMd).symbol ?? symbol;
  } catch (e) {
    logger.error("error getting symbol Tezos", e);
  }
  let royalty = 0n;
  try {
    const metaDataOrURL = await getNftTokenMetaData(contract, BigInt(tokenId));
    const isUrl = URLCanParse(metaDataOrURL);
    let metaData: {
      royalties: {
        decimals: number;
        shares: {
          [key: string]: number;
        };
      };
    };

    if (isUrl) {
      metaData = await fetch(metaDataOrURL).then((res) => res.json());
    } else {
      metaData = JSON.parse(metaDataOrURL);
    }
    const decimal_places_in_rates = metaData.royalties.decimals;
    const max_percentage = Number(`1${"0".repeat(decimal_places_in_rates)}`);
    const rate = Object.values(metaData.royalties.shares)[0];
    royalty = BigInt((rate / max_percentage) * 10000);
  } catch (e) {
    logger.error("Error getting royalty Tezos");
  }
  return {
    metadata: tokenMd,
    name,
    symbol,
    royalty,
  };
}

const URLCanParse = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
