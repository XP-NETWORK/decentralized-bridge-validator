import { createHash } from "crypto";
import * as ed from "@noble/ed25519";
import { BCS, HexString } from "aptos";
import { TNftTransferDetailsObject } from "xp-decentralized-sdk";

const signClaimData = async (
  claimData: TNftTransferDetailsObject,
  privateKey: string,
  pubk: string,
) => {
  const serializer = new BCS.Serializer();
  serializer.serializeStr(claimData.tokenId);
  serializer.serializeBytes(Buffer.from(claimData.sourceChain));
  serializer.serializeBytes(Buffer.from(claimData.destinationChain));
  serializer.serializeFixedBytes(
    new HexString(claimData.destinationUserAddress).toUint8Array(),
  );
  serializer.serializeBytes(Buffer.from(claimData.sourceNftContractAddress));
  serializer.serializeStr(claimData.name);
  serializer.serializeU64(Number(claimData.royalty));
  serializer.serializeU64(10000);
  serializer.serializeFixedBytes(
    new HexString(claimData.royaltyReceiver).toUint8Array(),
  );
  serializer.serializeStr(claimData.metadata);
  serializer.serializeBytes(Buffer.from(claimData.transactionHash));
  serializer.serializeU256(Number(claimData.tokenAmount));
  serializer.serializeBytes(Buffer.from(claimData.nftType));
  serializer.serializeU64(Number(claimData.fee));
  serializer.serializeStr(claimData.symbol);

  const msgHash = createHash("SHA256").update(serializer.getBytes()).digest();

  const signature = await ed.sign(msgHash, Buffer.from(privateKey, "hex"));

  return { signature: signature.toString(), signer: pubk };
};

export default signClaimData;
