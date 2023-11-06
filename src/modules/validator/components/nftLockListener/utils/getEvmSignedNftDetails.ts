import Web3 from "web3";

const getEvmSignedNftDetails = ({ nftTransferDetailsObject, evmWallet }) => {
    const web3 = new Web3();
    const nftTransferDetailsValues = Object.values(nftTransferDetailsObject);

    const nftTransferDetailsTypes = [
        "uint256",
        "string",
        "string",
        "address",
        "string",
        "string",
        "string",
        "uint256",
        "address",
        "string",
        "string",
        "uint256",
        "string",
        "uint256",
    ]

    const signedNftTransferDetails = web3.eth.accounts
        .privateKeyToAccount(evmWallet.privateKey)
        .sign(web3.utils.keccak256(
            web3.eth.abi.encodeParameters(
                nftTransferDetailsTypes,
                nftTransferDetailsValues
            )));

    return { publicAddress: evmWallet.address, signature: signedNftTransferDetails.signature }
}

export default getEvmSignedNftDetails