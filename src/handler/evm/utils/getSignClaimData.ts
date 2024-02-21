import { Wallet, ethers, isAddress } from "ethers";
import { log } from ".";
import { TSupportedChains } from "../../../config";
import { TNftTransferDetailsObject } from "../../types";

const getSignClaimData = (chainIdent: TSupportedChains, signer: Wallet) => {
  return async (data: TNftTransferDetailsObject) => {
    if (!isAddress(data.destinationUserAddress)) {
      data.destinationUserAddress = data.royaltyReceiver;
      log("Invalid destination address", chainIdent);
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
  };
};

export default getSignClaimData;
