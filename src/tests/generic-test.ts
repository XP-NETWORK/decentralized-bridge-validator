import {
  ChainFactory,
  ChainFactoryConfigs,
  MetaMap,
} from "xp-decentralized-sdk";
import { bridgeTestChains } from "../config";
import { SignerAndSignature, TChain } from "../types";
import { generateWallets } from "../utils";
import { getConfigs } from "./configs";
import { generateData } from "./data";
import { getSigners } from "./signers";

(async () => {
  const genWallets = await generateWallets();
  const factory = ChainFactory(ChainFactoryConfigs.TestNet());

  const NFTS_TO_MINT = 1;

  const signers = getSigners(genWallets);
  const configs = getConfigs(bridgeTestChains as unknown as TChain[]);
  const data = await generateData(genWallets, configs);

  // Create a NFT Contract
  console.log(`Deploying NFT Contract on BSC`);
  let contract: string;
  let deployed = false;

  while (!deployed) {
    const bsc = await factory.inner(data.bsc.config.chain as "BSC");
    contract = await bsc.deployCollection(
      signers.bsc,
      {
        name: "TestContract",
        symbol: "TST",
      },
      undefined,
    );
    /// Sleep for 5 seconds to wait for the contract to be deployed
    await new Promise((e) => setTimeout(e, 5000));
  }

  for (let i = 0; i <= NFTS_TO_MINT; i++) {
    // Mint NFT
    const bsc = await factory.inner(data.bsc.config.chain as "BSC");
    const minted = await bsc.mintNft(signers.bsc, {
      contract: contract!,
      tokenId: BigInt(i),
      uri: `https://meta.polkamon.com/polkamon/${i}`,
      royalty: 10n,
      royaltyReceiver: data.bsc.address,
    });
    await minted.wait();
    console.log(
      `Minted NFT on BSC with Token ID: ${i} at ${contract!} in tx: ${
        minted.hash
      }`,
    );
    // Approve NFT
    const approved = await bsc.approveNft(
      signers.bsc,
      i.toString(),
      contract!,
      {},
    );
    await approved.wait();
    console.log(
      `Approved NFT on BSC with Token ID: ${i} at ${contract!} in tx: ${
        minted.hash
      }`,
    );
  }

  // Lock the NFTs
  async function transfer(
    args: [
      {
        fromChain: (typeof data)[keyof typeof data];
        toChain: (typeof data)[keyof typeof data];
        tokenId: string;
        contractAddress: string;
        codeInfo?: CodeInfo;
        nonce?: string;
        nftType: "singular" | "multiple";
      },
    ],
  ) {
    for (const tx of args) {
      const chain = await factory.inner(
        tx.fromChain.config.chain as keyof MetaMap,
      );
      let locked = false;
      let lockHash: string = "";
      while (!locked) {
        try {
          const lock = await chain.lockNft(
            tx.fromChain.signer as any,
            tx.contractAddress,
            tx.toChain.config.chain as keyof MetaMap,
            tx.toChain.address,
            BigInt(tx.tokenId),
            { gasLimit: 1000000 },
          );
          console.log(`Lock Hash:`, lock.hash());
          await (lock.tx as any).wait();
          locked = true;
          lockHash = lock.hash();
        } catch (e: any) {
          console.log(
            `Retrying to lock NFT on ${tx.fromChain.config.chain}`,
            e.shortMessage,
          );
        }
      }

      console.log(`Finding Claim Data for Lock Hash: ${lockHash}`);

      const nftDetails = await factory.getClaimData(chain, lockHash);
      console.log(nftDetails);
      console.log(`Got Claim Data`);

      console.log(`Fetching Signatures`);

      const tc = await factory.inner(tx.toChain.config.chain as keyof MetaMap);

      let signatures = await tc
        .getStorageContract()
        .getLockNftSignatures(lockHash, tx.fromChain.config.chain);
      const neededSignatures =
        Math.floor((2 / 3) * Number(await tc.getValidatorCount())) + 1;
      while (signatures.length < neededSignatures) {
        await waitForMSWithMsg(
          1000,
          `waiting for signatures, ${signatures.length}`,
        );
        signatures = await tc
          .getStorageContract()
          .getLockNftSignatures(lockHash, tx.fromChain.config.chain);
      }

      const signatureArray: SignerAndSignature[] = [];
      signatures.forEach((item) => {
        signatureArray.push({
          signer: item.signerAddress,
          signature: item.signature,
        });
      });

      let claimed = false;
      while (!claimed)
        try {
          const claim = await tc.claimNft(
            tx.toChain.signer as any,
            tc.transform(nftDetails) as any,
            {},
            signatureArray,
          );
          console.log(`Claimed on ${tx.toChain.config.chain} at ${claim}`);
          claimed = true;
          return "";
        } catch (e) {
          console.log(e);
          console.log(`Retrying Claiming`);
        }
    }
    return "";
  }

  await transfer([
    {
      fromChain: data.bsc,
      toChain: data.eth,
      contractAddress: contract!,
      tokenId: "0",
      nftType: "singular",
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
