import { UserSigner } from "@multiversx/sdk-wallet/out";

const getMultiversXSignedNftDetails = ({ nftTransferDetailsObject, multiversXWallet }) => {

    const serializedNftTransferDetails = JSON.stringify(nftTransferDetailsObject);

    const signer = UserSigner.fromWallet(multiversXWallet.userWallet, multiversXWallet.password)

    const signedData = signer.sign(Buffer.from(serializedNftTransferDetails));



    return { publicAddress: multiversXWallet.userWallet.bech32, signature: signedData.toString() }
}

export default getMultiversXSignedNftDetails