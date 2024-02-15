import { JsonRpcProvider, Wallet, ethers, isAddress } from "ethers";
import { TSupportedChains } from "../../config";
import {
  BridgeStorage,
  Bridge__factory,
  ERC721Royalty__factory,
} from "../../contractsTypes/evm";
import { THandler, TWallet } from "../types";

const confirmationCountNeeded = (validatorCount: number) => {
  const twoByThree = 0.666666667;
  const paddedValidatorCount = 1;
  return Math.floor(twoByThree * validatorCount) + paddedValidatorCount;
};

const ProcessDelayMilliseconds = 5000;
const BLOCK_CHUNKS = 1000;

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

export function evmHandler(
  chainIdent: TSupportedChains,
  provider: JsonRpcProvider,
  signer: Wallet,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
): THandler {
  const bc = Bridge__factory.connect(bridge, signer.connect(provider));
  return {
    async addSelfAsValidator() {
      let validatorsCount = Number(await bc.validatorsCount());
      let signatureCount = Number(
        await storage.getStakingSignaturesCount(signer.address),
      );

      while (signatureCount < confirmationCountNeeded(validatorsCount)) {
        await waitForMSWithMsg(
          ProcessDelayMilliseconds,
          `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
            validatorsCount,
          )}`,
        );
        signatureCount = Number(
          await storage.getStakingSignaturesCount(signer.address),
        );
        validatorsCount = Number(await bc.validatorsCount());
      }

      const stakingSignatures = [
        ...(await storage.getStakingSignatures(signer.address)),
      ].map((item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      });

      const added = await bc.addValidator(signer.address, stakingSignatures);
      added.wait();
      return "success";
    },
    chainIdent: chainIdent,
    async listenForLockEvents(_builder, cb) {
      while (true) {
        let lastBlock = Number(lastBlock_);
        const latestBlockNumber = Number(
          (await provider.getBlockNumber()).toString(),
        );

        const latestBlock =
          lastBlock + BLOCK_CHUNKS < latestBlockNumber
            ? lastBlock + BLOCK_CHUNKS
            : latestBlockNumber;

        const logs = await provider.getLogs({
          fromBlock: lastBlock,
          toBlock: latestBlock,
          address: bridge,
          topics: [
            Bridge__factory.createInterface().getEvent("Locked").topicHash,
          ],
        });
        if (!logs.length) {
          console.info(
            `No Transactions found in chain ${chainIdent} from block: ${lastBlock} to: ${latestBlock}`,
          );
          return;
        }
        for (const log of logs) {
          const decoded = bc.interface.parseLog(log);
          if (!decoded) continue;
          cb({
            destinationChain: decoded.args.destinationChain,
            destinationUserAddress: decoded.args.destinationUserAddress,
            nftType: decoded.args.nftType,
            sourceChain: decoded.args.sourceChain,
            sourceNftContractAddress: decoded.args.sourceNftContractAddress,
            tokenAmount: decoded.args.tokenAmount,
            tokenId: decoded.args.tokenId,
            transactionHash: log.transactionHash,
          });
        }
        lastBlock = latestBlockNumber;
      }
    },
    async nftData(tokenId, contract) {
      const nft = ERC721Royalty__factory.connect(contract, provider);
      return {
        name: await nft.name(),
        symbol: await nft.symbol(),
        royalty: (await nft.royaltyInfo(tokenId, 10000))[1],
        metadata: await nft.tokenURI(tokenId),
      };
    },
    async signClaimData(data) {
      if (!isAddress(data.destinationUserAddress)) {
        data.destinationUserAddress = data.royaltyReceiver;
        console.log("Invalid destination address");
      }
      const nftTransferDetailsValues = Object.values(data);
      const nftTransferDetailsTypes = [
        "uint256", // Unique ID for the NFT transfer
        "string", // Chain from where the NFT is being transferred
        "string", // Chain to where the NFT is being transferred
        "address", // User's address in the destination chain
        "string", // Address of the NFT contract in the source chain
        "string", // name of NFT collection
        "string", // symbol of nft collection
        "uint256", // royalty of nft collection
        "address", // address of user who is going to receive royalty
        "string", // Metadata related to the NFT being transferred
        "string", // Transaction hash of the transfer on the source chain
        "uint256", // Number of NFTs being transferred
        "string", // Type of the NFT (could be ERC721 or ERC1155)
        "uint256", // fee that needs to be paid by the user to the bridge,
      ];
      const signature = await signer.signMessage(
        ethers.keccak256(
          ethers.AbiCoder.defaultAbiCoder().encode(
            nftTransferDetailsTypes,
            nftTransferDetailsValues,
          ),
        ),
      );

      return {
        signature: signature,
        signer: signer.address,
      };
    },
    generateWallet() {
      const signer = Wallet.createRandom();
      const response: Promise<TWallet> = Promise.resolve({
        address: signer.address,
        pk: signer.privateKey,
      });
      return response;
    },
  };
}
