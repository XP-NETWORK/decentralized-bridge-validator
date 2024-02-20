import chalk from "chalk";
import { JsonRpcProvider, Wallet, ethers, isAddress } from "ethers";
import { TSupportedChains } from "../../config";
import {
  BridgeStorage,
  Bridge__factory,
  ERC721Royalty__factory,
} from "../../contractsTypes/evm";
import { THandler, TWallet } from "../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../utils";

export function evmHandler(
  chainIdent: TSupportedChains,
  provider: JsonRpcProvider,
  signer: Wallet,
  bridge: string,
  storage: BridgeStorage,
  lastBlock_: bigint,
  blockChunks: number,
): THandler {
  const bc = Bridge__factory.connect(bridge, signer.connect(provider));
  function EvmLog(msg: string) {
    console.log(chalk.green(`EVM: ${chainIdent}\t`), msg);
  }
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
    async listenForLockEvents(builder, cb) {
      let lastBlock = Number(lastBlock_);
      while (true) {
        const latestBlockNumber = await provider.getBlockNumber();

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const logs = await provider.getLogs({
          fromBlock: lastBlock,
          toBlock: latestBlock,
          address: bridge,
          topics: [
            Bridge__factory.createInterface().getEvent("Locked").topicHash,
          ],
        });
        const startBlock = lastBlock;
        lastBlock = latestBlockNumber;
        if (!logs.length) {
          EvmLog(
            `No Transactions found in chain from block: ${startBlock} to: ${latestBlockNumber}. Waiting for 10 Seconds before looking for new transactions`,
          );
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const log of logs) {
          const decoded = bc.interface.parseLog(log);
          if (!decoded) continue;
          return cb(
            builder.nftLocked(
              decoded.args.tokenId,
              decoded.args.destinationChain,
              decoded.args.destinationUserAddress,
              decoded.args.sourceNftContractAddress,
              decoded.args.tokenAmount,
              decoded.args.nftType,
              decoded.args.sourceChain,
              log.transactionHash,
            ),
          );
        }
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
    async selfIsValidator() {
      const validator = await bc.validators(signer.address);
      return validator[0];
    },
    async signClaimData(data) {
      if (!isAddress(data.destinationUserAddress)) {
        data.destinationUserAddress = data.royaltyReceiver;
        EvmLog("Invalid destination address");
      }
      const nftTransferDetailsValues = [
        data.tokenId,
        data.sourceChain,
        data.destinationChain,
        data.destinationUserAddress.toString(),
        data.sourceNftContractAddress,
        data.name,
        data.symbol,
        data.royalty,
        data.royaltyReceiver,
        data.metadata,
        data.transactionHash,
        data.tokenAmount,
        data.nftType,
        data.fee,
      ];
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
