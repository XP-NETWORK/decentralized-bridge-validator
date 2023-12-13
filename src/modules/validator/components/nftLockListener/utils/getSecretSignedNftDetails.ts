import { INftTransferDetailsObject } from "../components/types";
import { ISecretWallet } from "@src/types";
import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";

const getSecretSignedNftDetails = async ({ nftTransferDetailsObject, secretWallet }: { nftTransferDetailsObject: INftTransferDetailsObject, secretWallet: ISecretWallet }) => {

    const messageHash = sha256(Object.values(nftTransferDetailsObject).join(""));

    const signature = await secp256k1.sign(messageHash, secretWallet.privateKey, {
        extraEntropy: true,
        der: false,
    });
    console.log({ messageHash })
    return { publicAddress: secretWallet.publicKey, signature: "0x" + Buffer.from(signature).toString("hex") }
}

export default getSecretSignedNftDetails