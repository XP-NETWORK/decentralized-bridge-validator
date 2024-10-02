import {
  DeployCollection,
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
import { BridgeStorage__factory } from "../../contractsTypes/evm";
import { JsonRpcProvider } from "ethers";

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

export function createTransferBackTest<
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
  signerAddress: string;
  approveTokenId: string;
}) {
  return args;
}

export async function transferBackMultiple(
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
    signerAddress: string;
  }[],
  factory: TChainFactory,
) {
  await transferBack(args, factory);
}

// Lock the NFTs
async function transferBack<FC extends keyof MetaMap, TC extends keyof MetaMap>(
  args: {
    fromChain: FC;
    toChain: TC;
    signer: InferSigner<FC>;
    signerAddress: string;
    claimSigner: InferSigner<TC>;
    nftType: "singular" | "multiple";
    deployArgs: InferDeployArgs<FC>;
    mintArgs: InferMintArgs<FC>;
    receiver: string;
    approveTokenId: string;
  }[],
  factory: TChainFactory,
) {
  for (const tx of args) {
    const chain = await factory.inner(tx.fromChain);

    const contract = await chain.deployNftCollection(
      tx.signer as any,
      tx.deployArgs as any,
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
          },
        );
        isMinted = true;
        console.log(
          `Minted NFT on ${tx.fromChain} with Token ID: ${tx.approveTokenId} at ${contract} in tx: ${stringify(
            minted,
          )}`,
        );
      } catch (e) {
        console.log(`Failed to mint NFT on ${tx.fromChain}`, e);
        await sleep(5);
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
          `Approved NFT on BSC with Token ID: ${tx.approveTokenId} at ${contract} in tx:`,
          approve,
        );
        approved = true;
      } catch (e) {
        await new Promise((e) => setTimeout(e, 5000));
        console.log("Retrying Approving NFT", e);
        await sleep(5);
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
          {},
        );
        console.log(`Lock Hash on ${tx.fromChain}:`, lock.hash());
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
        console.log(
          `Retrying to find Claim Data for Lock Hash: ${lockHash}`,
          e,
        );
        await sleep(5);
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
        2500,
        `waiting for signatures, ${signatures.length}`,
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
    let claimHash = "";
    while (!claimed)
      try {
        const claim = await tc.claimNft(
          tx.claimSigner as any,
          tc.transform(nftDetails) as any,
          signatureArray,
        );
        console.log(`Claimed on ${tx.toChain} at ${stringify(claim)}`);
        claimed = true;
        claimHash = claim.hash();
        console.log(claim, claimHash)
      } catch (e) {
        await new Promise((s) => setTimeout(s, 5000));
        console.log(e);
        console.log("Retrying Claiming");
        await sleep(5);
      }
    if (canDecodeClaimData(tc)) {
      let decoded = false;
      let decodedValue = undefined;
      while (!decoded) {
        try {
          decodedValue = await tc.readClaimed721Event(claimHash);
          decoded = true;
        } catch (e) {
          console.log(`Failed to decode claim event`, decoded);
        }
      }
      if (!decodedValue) throw new Error(`Failed to get decoded value`);

       let approved = false;
      while (!approved) {
        try {
          const approve = await tc.approveNft(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tx.claimSigner as any,
            decodedValue.token_id,
            decodedValue.nft_contract,
            {},
          );
          console.log(
            `Approved NFT on ${tx.toChain} with Token ID: ${decodedValue.token_id} at ${decodedValue.nft_contract} in tx: ${approve}`,
          );
          approved = true;
        } catch (e) {
          await new Promise((e) => setTimeout(e, 5000));
          console.log("Retrying Approving NFT", e);
          await sleep(5);
        }
      }

      let lockedAgain = false;
      let lockAgain = undefined;

      while (!lockedAgain) {
        try {
          lockAgain = await tc.lockNft(
            tx.claimSigner as any,
            decodedValue?.nft_contract,
            tx.fromChain,
            tx.signerAddress,
            BigInt(decodedValue.token_id),
            ""
          );
          lockedAgain = true;
          console.log(`Locked on ${tx.toChain} at ${lockAgain.hash()}`)
        } catch (e) {
          console.log(`Failed to lock again`, e);
        }
      }

      if (!lockAgain) throw new Error(`Unreachable`);

      let gotLockBackClaimData = false;
      let lockBackClaimData = undefined;
      while (!gotLockBackClaimData) {
        try {
          lockBackClaimData = await factory.getClaimData(tc, lockAgain.hash());
          gotLockBackClaimData = true
        } catch (error) {
          console.log(`Failed to find lock back claim data`, error);
        }
      }

      if (!lockBackClaimData) throw new Error(`Undefined`);

      const fc = await factory.inner(tx.fromChain);

      console.log(`fetching signatures for`, claimHash, tx.toChain);
        let againsignatures = await BridgeStorage__factory.connect(
          "0x8411EeadD374bDE549F61a166FFBeFca592bC60a",
          new JsonRpcProvider(
            "https://public.stackup.sh/api/v1/node/optimism-sepolia",
          ),
        ).getLockNftSignatures(lockBackClaimData.transactionHash, tx.toChain);
        const againneededSignatures =
          Math.floor((2 / 3) * Number(await fc.getValidatorCount())) + 1;
        while (againsignatures.length < againneededSignatures) {
          await waitForMSWithMsg(
            2500,
            `waiting for signatures, ${againsignatures.length}`,
          );
          againsignatures = await tc
            .getStorageContract()
            .getLockNftSignatures(lockBackClaimData.transactionHash, tx.toChain);
            console.log(againsignatures)
        }
        const againSignatureArray = againsignatures.map((item) => {
            return {
              signerAddress: item.signerAddress,
              signature: item.signature,
            };
          });

          let claimedAgain = false;
          while (!claimedAgain)
            try {
              const claim = await fc.claimNft(
                tx.signer as any,
                fc.transform(lockBackClaimData) as any,
                againSignatureArray,
              );
              console.log(
                `Claimed on ${tx.fromChain} at ${stringify(
                  claim,
                )}. hash: ${claim.hash()}`,
              );
              claimedAgain = true;
            } catch (e) {
              await new Promise((s) => setTimeout(s, 5000));
              console.log(e);
              console.log("Retrying Claiming");
              await sleep(5);
            }
        
    }
  }
}

export function canDecodeClaimData(t: any): t is ReadClaimed721Event {
  return "readClaimed721Event" in t;
}

function stringify(content: unknown): string {
  return JSON.stringify(content, replacerFunc);
}
 const replacerFunc = () => {
   const visited = new WeakSet();
   return (_: string, value: any) => {
     if (typeof value === "object" && value !== null) {
       if (visited.has(value)) {
         return;
       }
       visited.add(value);
     }
     if (typeof value === "bigint") {
       return `BigInt(${value.toString()})`;
     }
     return value;
   };
 };

function sleep(secs: number) {
  console.log(`Sleeping for ${secs} seconds`);
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}
