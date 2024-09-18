import type { TezosToolkit } from "@taquito/taquito";
import { Tzip16Module, bytesToString, tzip16 } from "@taquito/tzip16";
import axios from "axios";
import type { NFTContractType } from "../../../contractsTypes/tezos/NFT.types";
import {
  type MMap,
  type bytes,
  type nat,
  tas,
} from "../../../contractsTypes/tezos/type-aliases";
import type { LogInstance } from "../../types";
import { fetchHttpOrIpfs } from "../../utils";

export default async function nftData(
  tokenId: string,
  contract: string,
  provider: TezosToolkit,
  logger: LogInstance,
) {
  const getNftTokenMetaData = async (contract: string, tokenId: bigint) => {
    const nftContract = await provider.contract.at<NFTContractType>(contract);

    let tokenMetaData: {
      token_id: nat;
      token_info: MMap<string, bytes>;
    };

    try {
      tokenMetaData = await (
        await nftContract.storage()
      ).tokens.token_metadata.get(tas.nat(tokenId.toString()));
    } catch (ex) {
      tokenMetaData = await (await nftContract.storage()).token_metadata.get(
        tas.nat(tokenId.toString()),
      );
    }

    const metaDataInHex = tokenMetaData.token_info.get("");
    return bytesToString(metaDataInHex);
  };
  let tokenMd = await getNftTokenMetaData(contract, BigInt(tokenId));
  tokenMd = tokenMd.substring(tokenMd.indexOf("https://"));
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
      const metaData: { symbol?: string } = await fetchHttpOrIpfs(
        tokenMd,
        axios.create(),
      );
      symbol = metaData.symbol ?? symbol;
    }
    symbol = JSON.parse(tokenMd).symbol ?? symbol;
  } catch (e) {
    logger.error("error getting symbol Tezos", e);
  }
  let royalty = 0n;
  try {
    const metaDataOrURL = tokenMd;
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
      metaData = await fetchHttpOrIpfs(metaDataOrURL, axios.create());
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
