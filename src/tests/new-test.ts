import {
  ChainFactory,
  ChainFactoryConfigs,
  DeployCollection,
  MetaMap,
  MintNft,
  TApproveNFT,
} from "xp-decentralized-sdk";

import { SignerAndSignature } from "../types";

import { readFile } from "fs/promises";
import { TInferChainH } from "xp-decentralized-sdk/dist/factory/types/utils";
import { bridgeTestChains } from "../config";
import { getConfigs } from "./configs";
import { generateData } from "./data";
import { getSigners } from "./signers";

type InferSigner<FC extends keyof MetaMap> =
  TInferChainH<FC> extends TApproveNFT<infer R, unknown, unknown> ? R : never;

type InferDeployArgs<FC extends keyof MetaMap> =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  TInferChainH<FC> extends DeployCollection<any, infer R, any, any> ? R : never;

type InferMintArgs<FC extends keyof MetaMap> = TInferChainH<FC> extends MintNft<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  any,
  infer R,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  any
>
  ? R
  : never;

(async () => {
  const genWallets = JSON.parse(await readFile("secrets.json", "utf-8"));
  const factory = ChainFactory(ChainFactoryConfigs.TestNet());

  const signers = getSigners(genWallets);
  const configs = getConfigs(bridgeTestChains);
  const data = await generateData(
    genWallets,

    configs,
  );

  // Lock the NFTs
  async function transfer<FC extends keyof MetaMap, TC extends keyof MetaMap>(
    args: [
      {
        fromChain: FC;
        toChain: TC;
        signer: InferSigner<FC>;
        claimSigner: InferSigner<TC>;
        nftType: "singular" | "multiple";
        deployArgs: InferDeployArgs<FC>;
        mintArgs: InferMintArgs<FC>;
        receiver: string;
      },
    ],
  ) {
    for (const tx of args) {
      const chain = await factory.inner(tx.fromChain);

      const contract = await chain.deployCollection(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.signer as any,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.deployArgs as any,
        undefined,
      );
      console.log(`Deployed NFT Contract: ${contract}`);
      /// Sleep for 5 seconds to wait for the contract to be deployed
      await new Promise((e) => setTimeout(e, 5000));

      // Mint NFT

      const minted = await chain.mintNft(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.signer as any,
        {
          //@ts-ignore
          ...tx.mintArgs,
          contract: contract,
          contractAddress: contract,
          identifier: contract,
        },
      );

      console.log(
        `Minted NFT on BSC with Token ID: 1 at ${contract} in tx: ${JSON.stringify(
          minted,
          null,
          4,
        )}`,
      );
      await new Promise((e) => setTimeout(e, 5000));
      // Approve NFT
      const approved = await chain.approveNft(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.signer as any,
        "1",
        contract,
        {},
      );

      console.log(
        `Approved NFT on BSC with Token ID: 0 at ${contract} in tx: ${approved}`,
      );
      let locked = false;
      let lockHash = "";
      while (!locked) {
        try {
          const lock = await chain.lockNft(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tx.signer as any,
            contract,
            tx.toChain,
            tx.receiver,
            BigInt("1"),
            {},
          );
          console.log("Lock Hash:", lock.hash());
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          await (lock.tx as any).wait();
          locked = true;
          lockHash = lock.hash();
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (e: any) {
          console.log(
            `Retrying to lock NFT on ${tx.fromChain}`,
            e.shortMessage,
          );
        }
      }

      console.log(`Finding Claim Data for Lock Hash: ${lockHash}`);

      const nftDetails = await factory.getClaimData(chain, lockHash);
      console.log(nftDetails);
      console.log("Got Claim Data");

      console.log("Fetching Signatures");

      const tc = await factory.inner(tx.toChain);

      let signatures = await tc
        .getStorageContract()
        .getLockNftSignatures(lockHash, tx.fromChain);
      const neededSignatures =
        Math.floor((2 / 3) * Number(await tc.getValidatorCount())) + 1;
      while (signatures.length < neededSignatures) {
        await waitForMSWithMsg(
          1000,
          `waiting for signatures, ${signatures.length}`,
        );
        signatures = await tc
          .getStorageContract()
          .getLockNftSignatures(lockHash, tx.fromChain);
      }

      const signatureArray: SignerAndSignature[] = signatures.map((item) => {
        return {
          signer: item.signerAddress,
          signature: item.signature,
        };
      });

      let claimed = false;
      while (!claimed)
        try {
          const claim = await tc.claimNft(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tx.claimSigner as any,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tc.transform(nftDetails) as any,
            {},
            signatureArray,
          );
          console.log(`Claimed on ${tx.toChain} at ${claim}`);
          claimed = true;
          return "";
        } catch (e) {
          console.log(e);
          console.log("Retrying Claiming");
        }
    }
    return "";
  }

  await transfer([
    {
      fromChain: "ETH",
      toChain: "BSC",
      nftType: "singular",
      claimSigner: data.bsc.signer,
      receiver: signers.bsc.address,
      signer: data.eth.signer,
      deployArgs: {
        name: "TestContract",
        symbol: "TST",
      },
      mintArgs: {
        tokenId: 1n,
        uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
        royalty: 10n,
        royaltyReceiver: signers.eth.address,
        contract: "",
      },
    },
  ]);
})().catch((e) => {
  console.error(e);
});

export type CodeInfo = {
  code_id: number;
  code_hash: string;
};

function waitForMSWithMsg(ms: number, msg: string): Promise<void> {
  const secondsInMilliSeconds = 1000;
  const numberOfDecimals = 2;
  console.info(
    `${msg}, retrying in ${(ms / secondsInMilliSeconds).toFixed(
      numberOfDecimals,
    )} seconds`,
  );
  return new Promise((resolve) => setTimeout(resolve, ms));
}
