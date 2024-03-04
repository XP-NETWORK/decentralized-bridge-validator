import {
  ChainFactory,
  ChainFactoryConfigs,
  DeployCollection,
  MetaMap,
  MintNft,
  TApproveNFT,
} from "xp-decentralized-sdk";

import { IGeneratedWallets, SignerAndSignature } from "../types";

import { readFile } from "fs/promises";
import { TInferChainH } from "xp-decentralized-sdk/dist/factory/types/utils";
import { bridgeTestChains } from "../config";
import { generateWallets } from "../utils";
import { getConfigs } from "./configs";
import { generateData } from "./data";
import { getSigners } from "./signers";

type InferSigner<FC extends keyof MetaMap> =
  TInferChainH<FC> extends TApproveNFT<infer R, unknown, unknown> ? R : never;

type InferDeployArgs<FC extends keyof MetaMap> =
  TInferChainH<FC> extends DeployCollection<any, infer R, any, any> ? R : never;

type InferMintArgs<FC extends keyof MetaMap> = TInferChainH<FC> extends MintNft<
  any,
  infer R,
  any,
  any
>
  ? R
  : never;

(async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }

  const factory = ChainFactory(ChainFactoryConfigs.TestNet());

  const signers = getSigners(genWallets);
  const configs = getConfigs(bridgeTestChains);
  const data = await generateData(genWallets, configs);

  function createTest<
    FC extends keyof MetaMap,
    TC extends keyof MetaMap,
  >(args: {
    fromChain: FC;
    toChain: TC;
    signer: InferSigner<FC>;
    claimSigner: InferSigner<TC>;
    nftType: "singular" | "multiple";
    deployArgs: InferDeployArgs<FC>;
    mintArgs: InferMintArgs<FC>;
    receiver: string;
    approveTokenId: string;
  }) {
    return args;
  }

  async function transferMultiple(
    args: {
      fromChain: any;
      toChain: any;
      signer: InferSigner<any>;
      claimSigner: InferSigner<any>;
      nftType: "singular" | "multiple";
      deployArgs: InferDeployArgs<any>;
      mintArgs: InferMintArgs<any>;
      receiver: any;
      approveTokenId: any;
    }[],
  ) {
    await transfer(args);
  }

  // Lock the NFTs
  async function transfer<FC extends keyof MetaMap, TC extends keyof MetaMap>(
    args: {
      fromChain: FC;
      toChain: TC;
      signer: InferSigner<FC>;
      claimSigner: InferSigner<TC>;
      nftType: "singular" | "multiple";
      deployArgs: InferDeployArgs<FC>;
      mintArgs: InferMintArgs<FC>;
      receiver: string;
      approveTokenId: string;
    }[],
  ) {
    for (const tx of args) {
      const chain = await factory.inner(tx.fromChain);

      const contract = await chain.deployCollection(
        tx.signer as any,
        tx.deployArgs as any,
      );
      console.log(`Deployed NFT Contract: ${contract}`);
      /// Sleep for 5 seconds to wait for the contract to be deployed
      await new Promise((e) => setTimeout(e, 5000));

      // Mint NFT

      let isMinted = false;
      while (!isMinted) {
        try {
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
          isMinted = true;
          console.log(
            `Minted NFT on BSC with Token ID: 1 at ${contract} in tx: ${JSON.stringify(
              minted,
              null,
              4,
            )}`,
          );
        } catch (e) {
          console.log(`Failed to mint NFT on ${tx.fromChain}`, e);
        }
      }

      let approved = false;
      while (!approved) {
        try {
          const approve = await chain.approveNft(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tx.signer as any,
            tx.approveTokenId,
            contract,
            {},
          );
          console.log(
            `Approved NFT on BSC with Token ID: 0 at ${contract} in tx: ${approve}`,
          );
          approved = true;
        } catch (e) {
          await new Promise((e) => setTimeout(e, 5000));
          console.log("Retrying Approving NFT", e);
        }
      }

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
            BigInt(tx.approveTokenId),
            {},
          );
          console.log("Lock Hash:", lock.hash());
          //@ts-ignore
          locked = true;
          lockHash = lock.hash();
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (e: any) {
          console.log(`Retrying to lock NFT on ${tx.fromChain}`, e);
        }
      }

      console.log(`Finding Claim Data for Lock Hash: ${lockHash}`);

      let foundedData = false;
      while (!foundedData) {
        try {
          const nftDetails = await factory.getClaimData(chain, lockHash);
          console.log(nftDetails);
          console.log("Got Claim Data");
          foundedData = true;
        } catch (e) {
          await new Promise((s) => setTimeout(s, 5000));
          console.log(
            `Retrying to find Claim Data for Lock Hash: ${lockHash}`,
            e,
          );
        }
      }

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
            tx.claimSigner as any,
            tc.transform(nftDetails) as any,
            signatureArray,
          );
          console.log(`Claimed on ${tx.toChain} at ${claim}`);
          claimed = true;
        } catch (e) {
          await new Promise((s) => setTimeout(s, 5000));
          console.log(e);
          console.log("Retrying Claiming");
        }
    }
  }

  const firstTest = createTest({
    fromChain: "ETH",
    toChain: "TON",
    nftType: "singular",
    claimSigner: data.ton.signer.sender(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    ),
    receiver: data.ton.signer.address.toString(),
    signer: data.eth.signer,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
    },
    mintArgs: {
      tokenId: 400n,
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      royalty: 10n,
      royaltyReceiver: signers.eth.address,
      contract: "",
    },
    approveTokenId: "400",
  });
  await transferMultiple([firstTest]);
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
