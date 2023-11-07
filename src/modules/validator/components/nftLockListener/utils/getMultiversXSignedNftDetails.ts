import { UserSigner } from "@multiversx/sdk-wallet/out";

const getMultiversXSignedNftDetails = async ({ nftTransferDetailsObject, multiversXWallet }) => {

    const serializedNftTransferDetails = JSON.stringify(nftTransferDetailsObject);

    const signer = UserSigner.fromWallet(multiversXWallet.userWallet, multiversXWallet.password)

    const signedData = await signer.sign(Buffer.from(serializedNftTransferDetails));

    return { publicAddress: multiversXWallet.userWallet.address, signature: signedData.toString("hex") }
}

export default getMultiversXSignedNftDetails