import { JsonRpcProvider } from "ethers";
import { ERC721Royalty__factory } from "../../../contractsTypes/evm";

const getNftData = (provider: JsonRpcProvider) => {
  return async (tokenId: string, contract: string) => {
    const nft = ERC721Royalty__factory.connect(contract, provider);
    return {
      name: await nft.name(),
      symbol: await nft.symbol(),
      royalty: (await nft.royaltyInfo(tokenId, 10000))[1],
      metadata: await nft.tokenURI(tokenId),
    };
  };
};

export default getNftData;
