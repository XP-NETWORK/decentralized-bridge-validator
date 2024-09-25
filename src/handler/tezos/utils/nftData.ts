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
import { fetchHttpOrIpfs, useMutexAndRelease } from "../../utils";
import type { TezosProviderFetch } from "../types";

export default async function nftData(
  tokenId: string,
  contract: string,
  fetchProvider: TezosProviderFetch,
  logger: LogInstance,
) {
  const getNftTokenMetaData = async (
    contract: string,
    tokenId: bigint,
    provider: TezosToolkit,
  ) => {
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
  // let [provider, release] = await fetchProvider();
  let tokenMd = await useMutexAndRelease(
    fetchProvider,
    async (provider) =>
      await getNftTokenMetaData(contract, BigInt(tokenId), provider),
  );
  // release();
  tokenMd = tokenMd.substring(tokenMd.indexOf("https://"));
  let name = "NTEZOS";
  let [provider, release] = await fetchProvider();
  try {
    provider.addExtension(new Tzip16Module());
    const nftContract = await provider.contract.at(contract, tzip16);
    const md = nftContract.tzip16();
    name = (await md.metadataName()) ?? name;
  } catch (e) {
    logger.error("error getting name Tezos");
  } finally {
    release();
  }
  let symbol = "NTEZOS";
  [provider, release] = await fetchProvider();
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
  } finally {
    release();
  }
  let royalty = 0n;
  [provider, release] = await fetchProvider();
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
  } finally {
    release();
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
