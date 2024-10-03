import {
  DeployNFTCollection,
  MetaMap,
  MintNft,
  ReadClaimed721Event,
  TApproveNFT,
} from "xp-decentralized-sdk";
import {
  TChainFactory,
  TInferChainH,
} from "xp-decentralized-sdk/dist/factory/types/utils";
import { waitForMSWithMsg } from "../../handler/utils";

type InferSigner<FC extends keyof MetaMap> =
  TInferChainH<FC> extends TApproveNFT<infer R, any, any> ? R : never;
type InferDeployArgs<FC extends keyof MetaMap> =
  TInferChainH<FC> extends DeployNFTCollection<any, infer R, any, any> ? R : never;

type InferMintArgs<FC extends keyof MetaMap> = TInferChainH<FC> extends MintNft<
  any,
  infer R,
  any,
  any
>
  ? R
  : never;

export function createTest<
  FC extends keyof MetaMap,
  TC extends keyof MetaMap
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

export async function transferMultiple(
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
  factory: TChainFactory
) {
  return await transfer(args, factory);
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
  factory: TChainFactory
): Promise<{ contract: string; tokenId: string } | undefined> {
  for (const tx of args) {
    console.log(`Transferring from ${tx.fromChain} to ${tx.toChain}`);
    const chain = await factory.inner(tx.fromChain);

    const contract = await chain.deployNftCollection(
      tx.signer as any,
      tx.deployArgs as any
    );
    console.log(`Deployed NFT Contract: ${contract}`);
    /// Sleep for 5 seconds to wait for the contract to be deployed
    await sleep(5);

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
            ticker: contract,
          }
        );
        isMinted = true;
        console.log(
          `Minted NFT on BSC with Token ID: ${
            tx.approveTokenId
          } at ${contract} in tx: ${stringify(minted)}`
        );
      } catch (e) {
        await sleep(5);
      }
    }
    if ("approveNft" in chain) {
      console.log(`Requires approval`)
      let approved = false;
      while (!approved) {
        try {
          //@ts-ignore
          const approve = await chain.approveNft(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tx.signer as any,
            tx.approveTokenId,
            contract,
            {}
          );
          console.log(
            `Approved NFT on BSC with Token ID: ${tx.approveTokenId} at ${contract} in tx: ${approve}`
          );
          approved = true;
        } catch (e) {
          await new Promise((e) => setTimeout(e, 5000));
          console.log("Retrying Approving NFT", e);
          await sleep(5);
        }
      }
    }

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
          "",
        );
        console.log("Lock Hash:", lock.hash());
        //@ts-ignore
        locked = true;
        lockHash = lock.hash();
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (e: any) {
        console.log(`Retrying to lock NFT on ${tx.fromChain}`, e);
        await sleep(5);
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
        // console.log(
        //   `Retrying to find Claim Data for Lock Hash: ${lockHash}`,
        //   e,
        // );
        await sleep(5);
      }
    }

    const nftDetails = await factory.getClaimData(chain, lockHash);
    // console.log(nftDetails);
    // console.log("Got Claim Data");

    // console.log("Fetching Signatures");

    const tc = await factory.inner(tx.toChain);

    let signatures = await tc
      .getStorageContract()
      .getLockNftSignatures(lockHash, tx.fromChain);
    const neededSignatures =
      Math.floor((2 / 3) * Number(await tc.getValidatorCount())) + 1;
    while (signatures.length < neededSignatures) {
      await waitForMSWithMsg(
        2500,
        `waiting for signatures, ${signatures.length}`
      );
      signatures = await tc
        .getStorageContract()
        .getLockNftSignatures(lockHash, tx.fromChain);
    }

    const signatureArray = signatures.map((item) => {
      return {
        signerAddress: item.signerAddress,
        signature: item.signature,
      };
    });

    let claimed = false;
    let ch = "";
    while (!claimed)
      try {
        const claim = await tc.claimNft(
          tx.claimSigner as any,
          tc.transform(nftDetails) as any,
          signatureArray
        );
        console.log(`Claimed on ${tx.toChain} at ${stringify(claim)}`);
        claimed = true;
        ch = claim.hash();
      } catch (e) {
        await new Promise((s) => setTimeout(s, 5000));
        console.log(e);
        console.log("Retrying Claiming");
        await sleep(5);
      }
    const dc = await factory.inner(tx.toChain);
    if (canDecodeClaimData(dc)) {
      let claimDecoded = false;

      while (!claimDecoded) {
        console.log(ch);
        try {
          const decoded = await dc.readClaimed721Event(ch);
          console.log(decoded);
          return {
            contract: decoded.nft_contract,
            tokenId: decoded.token_id,
          };
        } catch (e) {
          console.log(`Failed to decode claim event`, e);
          await sleep(5);
        }
      }
    } else {
      return undefined;
    }
  }

  return undefined;
}

function stringify(content: unknown): string {
  return JSON.stringify(
    content,
    (_, value) => {
      if (typeof value === "bigint") {
        return `BigInt(${value.toString()})`;
      }
      return value;
    },
    4
  );
}

function sleep(secs: number) {
  console.log(`Sleeping for ${secs} seconds`);
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}

export function canDecodeClaimData(t: any): t is ReadClaimed721Event {
  return "readClaimed721Event" in t;
}
