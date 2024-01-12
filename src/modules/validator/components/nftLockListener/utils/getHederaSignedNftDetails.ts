import Web3 from 'web3';
import { INftTransferDetailsObject } from '../components/types';
import { IHederaWallet } from '@src/types';
import { isAddress } from 'web3-validator';

const getHederaSignedNftDetails = async ({
    nftTransferDetailsObject,
    evmWallet,
}: {
    nftTransferDetailsObject: INftTransferDetailsObject;
    evmWallet: IHederaWallet;
}) => {
    const web3 = new Web3();

    // Mitigation if destination user address is invalid
    if (!isAddress(nftTransferDetailsObject.destinationUserAddress)) {
        nftTransferDetailsObject.destinationUserAddress =
            nftTransferDetailsObject.royaltyReceiver;
        console.log('Invalid destination address');
    }

    const nftTransferDetailsValues = Object.values(nftTransferDetailsObject);

    const nftTransferDetailsTypes = [
        'uint256', // Unique ID for the NFT transfer
        'string', // Chain from where the NFT is being transferred
        'string', // Chain to where the NFT is being transferred
        'address', // User's address in the destination chain
        'string', // Address of the NFT contract in the source chain
        'string', // name of NFT collection
        'string', // symbol of nft collection
        'uint256', // royalty of nft collection
        'address', // address of user who is going to receive royalty
        'string', // Metadata related to the NFT being transferred
        'string', // Transaction hash of the transfer on the source chain
        'uint256', // Number of NFTs being transferred
        'string', // Type of the NFT (could be ERC721 or ERC1155)
        'uint256', // fee that needs to be paid by the user to the bridge,
    ];

    console.log('hereeeeeee');
    console.log(nftTransferDetailsValues);
    const signedNftTransferDetails = web3.eth.accounts
        .privateKeyToAccount(evmWallet.privateKey)
        .sign(
            web3.utils.keccak256(
                web3.eth.abi.encodeParameters(
                    nftTransferDetailsTypes,
                    nftTransferDetailsValues,
                ),
            ),
        );

    return {
        publicAddress: evmWallet.address,
        signature: signedNftTransferDetails.signature,
    };
};

export default getHederaSignedNftDetails;
