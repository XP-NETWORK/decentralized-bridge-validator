import {
  ChainFactory,
  ChainFactoryConfigs,
  MetaMap,
} from "xp-decentralized-sdk";
import { bridgeTestChains } from "../config";
import { SignerAndSignature, TChain } from "../types";

import { readFile } from "fs/promises";
import { getConfigs } from "./configs";
import { generateData } from "./data";
import { getSigners } from "./signers";

(async () => {
  const genWallets = JSON.parse(await readFile("secrets.json", "utf-8"));
  const factory = ChainFactory(ChainFactoryConfigs.TestNet());

  const signers = getSigners(genWallets);
  const configs = getConfigs(bridgeTestChains as unknown as TChain[]);
  const data = await generateData(genWallets, configs);

  // Lock the NFTs
  async function transfer(
    args: [
      {
        fromChain: (typeof data)[keyof typeof data];
        toChain: (typeof data)[keyof typeof data];
        tokenId: string;

        codeInfo?: CodeInfo;
        nonce?: string;
        nftType: "singular" | "multiple";
        deployArgs: {
          name: string;
          symbol: string;
        };
        mintArgs: {
          tokenId: string;
          uri: string;
          royalty: string;
          royaltyReceiver: string;
        };
      },
    ],
  ) {
    for (const tx of args) {
      const chain = await factory.inner(
        tx.fromChain.config.chain as keyof MetaMap,
      );
      console.log(chain.deployCollection);

      const contract = await chain.deployCollection(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.fromChain.signer as any,
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
        tx.fromChain.signer as any,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.mintArgs as any,
      );

      console.log(
        `Minted NFT on BSC with Token ID: 1 at ${contract} in tx: ${minted}`,
      );
      // Approve NFT
      const approved = await chain.approveNft(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        tx.fromChain.signer as any,
        "0",
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
            tx.fromChain.signer as any,
            contract,
            tx.toChain.config.chain as keyof MetaMap,
            tx.toChain.address,
            BigInt(tx.tokenId),
            { gasLimit: 1000000 },
          );
          console.log("Lock Hash:", lock.hash());
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          await (lock.tx as any).wait();
          locked = true;
          lockHash = lock.hash();
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
      console.log("Got Claim Data");

      console.log("Fetching Signatures");

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
            tx.toChain.signer as any,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tc.transform(nftDetails) as any,
            signatureArray,
            {},
          );
          console.log(`Claimed on ${tx.toChain.config.chain} at ${claim}`);
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
      fromChain: data.bsc,
      toChain: data.eth,
      tokenId: "0",
      nftType: "singular",
      deployArgs: {
        name: "TestContract",
        symbol: "TST",
      },
      mintArgs: {
        tokenId: "0",
        uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
        royalty: "0",
        royaltyReceiver: signers.eth.address,
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
