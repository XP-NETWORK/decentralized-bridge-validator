import { createHash } from "node:crypto";
import * as ed from "@noble/ed25519";
import { BCS, HexString } from "aptos";
import type { TNftTransferDetailsObject } from "../../types";

const signClaimData = async (
  claimData: TNftTransferDetailsObject,
  privateKey: string,
  pubk: string,
) => {
  const cleanHexAddress = claimData.destinationUserAddress.startsWith("0x")
    ? claimData.destinationUserAddress.slice(2)
    : claimData.destinationUserAddress;

  const serializer = new BCS.Serializer();
  serializer.serializeStr(claimData.tokenId);
  serializer.serializeBytes(Buffer.from(claimData.sourceChain));
  serializer.serializeBytes(Buffer.from(claimData.destinationChain));
  serializer.serializeFixedBytes(
    new HexString(claimData.destinationUserAddress).toUint8Array(),
  );
  serializer.serializeBytes(hexStringToUint8Array(cleanHexAddress));
  serializer.serializeStr(claimData.name);
  serializer.serializeU64(Number(claimData.royalty));
  serializer.serializeFixedBytes(
    new HexString(claimData.royaltyReceiver).toUint8Array(),
  );
  serializer.serializeStr(claimData.metadata);
  serializer.serializeBytes(Buffer.from(claimData.transactionHash));
  serializer.serializeU256(Number(claimData.tokenAmount));
  serializer.serializeBytes(Buffer.from(claimData.nftType));
  serializer.serializeU64(Number(claimData.fee));
  serializer.serializeStr(claimData.symbol);
  serializer.serializeBytes(Buffer.from(claimData.lockTxChain));

  const msgHash = createHash("SHA256").update(serializer.getBytes()).digest();

  const signature = await ed.sign(msgHash, Buffer.from(privateKey, "hex"));

  return { signature: signature.toString(), signer: pubk };
};

const hexStringToUint8Array = (hexString: string): Uint8Array => {
  return new Uint8Array(
    hexString.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ?? [],
  );
};

export default signClaimData;
