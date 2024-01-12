import {
    getEvmSignedNftDetails,
    getMultiversXSignedNftDetails,
    getSecretSignedNftDetails,
    getTezosSignedNftDetails,
    getTonSignedNftDetails,
} from '../../utils';
import getHederaSignedNftDetails from '../../utils/getHederaSignedNftDetails';
import { IApproveLock } from './types';

const approveLock = async ({
    nftTransferDetailsObject,
    wallets,
    destinationChainObject,
    storageContract,
    txChain,
}: IApproveLock) => {
    let publicAddress = '',
        signature = '';
    if (destinationChainObject.chainType === 'evm') {
        ({ publicAddress, signature } = await getEvmSignedNftDetails({
            nftTransferDetailsObject,
            evmWallet: wallets.evmWallet,
        }));
    }
    if (destinationChainObject.chainType === 'hedera') {
        ({ publicAddress, signature } = await getHederaSignedNftDetails({
            nftTransferDetailsObject,
            evmWallet: wallets.evmWallet,
        }));
    } else if (destinationChainObject.chainType === 'multiversX') {
        ({ publicAddress, signature } = await getMultiversXSignedNftDetails({
            nftTransferDetailsObject,
            multiversXWallet: wallets.multiversXWallet,
        }));
    } else if (destinationChainObject.chainType === 'ton') {
        ({ publicAddress, signature } = getTonSignedNftDetails({
            nftTransferDetailsObject,
            tonWallet: wallets.tonWallet,
        }));
    } else if (destinationChainObject.chainType === 'scrt') {
        ({ publicAddress, signature } = await getSecretSignedNftDetails({
            nftTransferDetailsObject,
            secretWallet: wallets.secretWallet,
        }));
    } else if (destinationChainObject.chainType === 'tezos') {
        ({ publicAddress, signature } = await getTezosSignedNftDetails({
            nftTransferDetailsObject,
            tezosWallet: wallets.tezosWallet,
        }));
    }

    try {
        console.info({
            nftTransferDetailsObject,
            sig: signature,
            signer: publicAddress,
        });

        const tx = await storageContract.approveLockNft(
            nftTransferDetailsObject.transactionHash,
            txChain,
            signature,
            publicAddress,
        );
        await tx.wait();
        console.info(`Lock Approved Transaction Hash: ${tx.hash}`);
    } catch (e) {
        if (
            !(
                e?.shortMessage ===
                    'execution reverted: "Signature already used"' ||
                e?.shortMessage === 'replacement fee too low'
            )
        ) {
            throw new Error('Error while processing log');
        } else {
            console.log('Transaction already processed');
        }
    }
};

export default approveLock;
