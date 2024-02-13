/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcProvider } from 'ethers';
import { generateWalletsForChains } from '../modules/setup/components';
import { bridgeTestChains, testnetBridgeConfig } from '../config/chainSpecs';
import { ERC721Royalty } from '../contractsTypes';
import { getEvmSingleNftContract, waitForMSWithMsg } from '../utils';
import { SignerAndSignature, TChain } from '../types';
import { CodeInfo } from '../utils/functions/getSecretBridgeContract';
import {
    ChainFactory,
    ChainFactoryConfigs,
    MetaMap,
} from 'xp-decentralized-sdk';
import { getSigners } from './signers';
import { getConfigs } from './configs';
import { generateData } from './data';
import { promptToGetFunding } from '@src/modules/setup/components/getInitialFunds/components';
import { deployEVMNftContract } from './mint';

(async () => {
    const genWallets = await generateWalletsForChains();
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());

    let result = false;

    while (!result) {
        result = await promptToGetFunding({
            wallets: genWallets,
            config: testnetBridgeConfig,
        });
    }

    // Assuming we have enough funds on the validator accounts itself.

    const signers = getSigners(genWallets);
    const configs = getConfigs(bridgeTestChains as unknown as TChain[]);
    const data = await generateData(genWallets, configs);

    // Create a NFT Contract
    console.log(`Deploying NFT Contract on BSC`);
    let contract: ERC721Royalty;
    let deployed = false;

    while (!deployed) {
        try {
            contract = await deployEVMNftContract({
                evmChainConfig: configs.bsc,
                evmWallet: signers.bsc,
            });
            deployed = true;
        } catch (e) {
            `Retrying to deploy NFT Contract on BSC`;
        }
    }

    // Mint 5 NFT on the contract
    for (let i = 0; i < 1; i++) {
        let minted = false;
        while (!minted) {
            try {
                await contract!.mint(
                    signers.bsc.address,
                    i,
                    10,
                    signers.bsc.address,
                    'https://meta.polkamon.com/meta?id=10001852306',
                );
                minted = true;
            } catch (e) {
                console.log(`Retrying to mint NFT on BSC`);
            }
        }
    }
    console.log('Minted 1 NFTs ON BSC');

    // Approve the contract to spend the NFTs
    const nftC = getEvmSingleNftContract(
        {
            contractAddress: await contract!.getAddress(),
            rpcURL: configs.bsc.rpcURL,
        },
        data.bsc.signer.connect(new JsonRpcProvider(data.bsc.config.rpcURL)),
    );
    for (let i = 0; i < 1; i++) {
        let approved = false;
        while (!approved) {
            try {
                await nftC.approve(BigInt(i), data.bsc.config.contractAddress);
                approved = true;
            } catch (e: any) {
                console.log(
                    `Retrying to approve NFT on BSC`,
                    console.log(e.shortMessage),
                );
            }
        }
    }
    console.log(`Approved NFTs on BSC`);

    // Lock the NFTs
    async function transfer(
        args: [
            {
                fromChain: (typeof data)[keyof typeof data];
                toChain: (typeof data)[keyof typeof data];
                tokenId: string;
                contractAddress: string;
                codeInfo?: CodeInfo;
                nonce?: string;
                nftType: 'singular' | 'multiple';
            },
        ],
    ) {
        for (const tx of args) {
            const chain = await factory.inner(
                tx.fromChain.config.chain as keyof MetaMap,
            );
            let locked = false;
            let lockHash: string = '';
            while (!locked) {
                try {
                    const lock = await chain.lockNft(
                        tx.fromChain.signer as any,
                        tx.contractAddress,
                        tx.toChain.config.chain as keyof MetaMap,
                        tx.toChain.address,
                        BigInt(tx.tokenId),
                        { gasLimit: 1000000 },
                    );
                    console.log(`Lock Hash:`, lock.hash());
                    await (lock.tx as any).wait();
                    locked = true;
                    lockHash = lock.hash();
                } catch (e: any) {
                    console.log(
                        `Retrying to lock NFT on ${tx.fromChain.config.chain}`,
                        e.shortMessage,
                    );
                }
            }

            console.log(`Finding Claim Data for Lock Hash: ${lockHash}`);

            const nftDetails = await factory.getClaimData(chain, lockHash);
            console.log(nftDetails);
            console.log(`Got Claim Data`);

            console.log(`Fetching Signatures`);

            const tc = await factory.inner(
                tx.toChain.config.chain as keyof MetaMap,
            );

            let signatures = await tc
                .getStorageContract()
                .getLockNftSignatures(lockHash, tx.fromChain.config.chain);
            const neededSignatures =
                Math.floor((2 / 3) * Number(await tc.getValidatorCount())) + 1;
            while (signatures.length < neededSignatures) {
                await waitForMSWithMsg(
                    1000,
                    `waiting for signatures, ${signatures.length}`,
                );
                signatures = await tc
                    .getStorageContract()
                    .getLockNftSignatures(lockHash, tx.fromChain.config.chain);
            }

            const signatureArray: SignerAndSignature[] = [];
            signatures.forEach((item) => {
                signatureArray.push({
                    signer: item.signerAddress,
                    signature: item.signature,
                });
            });

            let claimed = false;
            while (!claimed)
                try {
                    const claim = await tc.claimNft(
                        tx.toChain.signer as any,
                        tc.transform(nftDetails) as any,
                        {},
                        signatureArray,
                    );
                    console.log(
                        `Claimed on ${tx.toChain.config.chain} at ${claim}`,
                    );
                    claimed = true;
                    return '';
                } catch (e) {
                    console.log(e);
                    console.log(`Retrying Claiming`);
                }
        }
        return '';
    }

    await transfer([
        {
            fromChain: data.bsc,
            toChain: data.eth,
            contractAddress: await contract!.getAddress(),
            tokenId: '0',
            nftType: 'singular',
        },
    ]);
})().catch((e) => {
    console.error(e);
});
