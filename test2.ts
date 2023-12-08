// import { getTxHashes, getTxStatus, getLogs } from "./src/modules/validator/utils/multiversXContractListener/utils"

import axios from "axios";
import { sign } from "@ton/crypto";
import { Address, TonClient, WalletContractV4 } from "@ton/ton";


// getTxHashes({ gatewayURL: "https://devnet-index.multiversx.com", from: 0, contractAddress: "erd1qqqqqqqqqqqqqpgqhv2wpezf4hwtvcy4t7s9wlmjklad0k776n9sj9q9hz" }).then(r => {
//     console.log(r);
//     getTxStatus({ gatewayURL: "https://devnet-index.multiversx.com", txHashes: r.map(item => item.txHash) }).then(r2 => {
//         console.log(r2)
//     })

//     getLogs({ gatewayURL: "https://devnet-index.multiversx.com", txHashes: r.map(item => item.txHash), eventIdentifier: "add" }).then(r3 => {
//         console.log(r3)
//     })
// })


// import { Mnemonic, UserWallet } from '@multiversx/sdk-wallet/out';
// import * as fs from "fs"
// const generateElrondWallet = () => {
//     const mnemonic = Mnemonic.generate();
//     const secretKey = mnemonic.deriveKey(0);
//     const password = Math.random().toString(36).slice(2);
//     const userWallet = UserWallet.fromSecretKey({ secretKey, password });
//     console.log(userWallet,)
//     return { secretKey, password };
// };

// fs.writeFile("s.txt", JSON.stringify(generateElrondWallet()), () => { })

// import { getCurrentMultiversXBalance } from "./src/utils"
// import { mockBridgeConfig, mockWallets } from "./src/test/mockData"
// import { IMultiversXChainConfig } from "./src/types"

// getCurrentMultiversXBalance({ multiversXChainConfig: mockBridgeConfig.bridgeChains[2] as IMultiversXChainConfig, multiversXWallet: mockWallets.multiversXWallet }).then(r => console.log(r))


// import { UserSigner } from "@multiversx/sdk-wallet/out"
// import { IBridge, IMultiversXChainConfig } from "./src/types"
// import { getMultiversXBridgeContract } from "./src/utils"

// const multiversXChainConfig: IMultiversXChainConfig = {
//     chain: "MULTIVERSX",
//     nativeCoinSymbol: "EGLD",
//     intialFund: "50000000000000000",
//     contractAddress: "erd1qqqqqqqqqqqqqpgqncefjy44n0dax40hedvv475sgty8qsa36n9stz4d7t",
//     chainType: "multiversX",
//     chainID: "D",
//     elasticSearchURL: "https://devnet-index.multiversx.com",
//     gatewayURL: "https://devnet-gateway.multiversx.com",
//     lastBlock: 0
// }
// const multiversXWallet = {
//     "userWallet": {
//         "version": 4,
//         "kind": "secretKey",
//         "id": "91602824-aff1-41ce-bd1c-50372851f251",
//         "address": "2130d2c16f919f634de847801cdccefbbc1f89bdd2524d5b6b94edbf821b2b00",
//         "bech32": "erd1yycd9st0jx0kxn0gg7qpehxwlw7plzda6ffy6kmtjnkmlqsm9vqqmd070h",
//         "crypto": {
//             "ciphertext": "d0e72cec21d134127e415d565b8302cc23900aaf806d1c6849d6c4418226eaa940243f57d2ee96ee5dc6afc1b0db9b2071ac22a7572362b4e57847cf6817695a",
//             "cipherparams": { "iv": "43084d986dae8dfb7fe4620498ea83f4" },
//             "cipher": "aes-128-ctr",
//             "kdf": "scrypt",
//             "kdfparams": {
//                 "dklen": 32,
//                 "salt": "8e3c7aa35af4462c832de8ab007bce82c8e7da0cc2f7c87c35a07712edd7db3d",
//                 "n": 4096, "r": 8, "p": 1
//             }, "mac": "34b175d6cca2f75b1b06a1669de98fc2a4e16ae59026d47c301b119b68ee3cca"
//         }
//     }, "password": "da0idv8zip"
// }

// const bridge: IBridge = getMultiversXBridgeContract({ multiversXChainConfig, multiversXWallet })

// bridge.validatorsCount().then(r => console.log(r.toString()))
// bridge.validators("2130d2c16f919f634de847801cdccefbbc1f89bdd2524d5b6b94edbf821b2b00").then(r => console.log(r))
// // bridge.validators("be0d718373bdc7bba3a313f25a0d8abd9736b831ba07a4ef4521df0ef93ef270").then(r => console.log(r))

// const addValidatorFunc = async () => {
//     const signer = UserSigner.fromPem(
//         `-----BEGIN PRIVATE KEY for erd1m229kx85t9jsamjuxpu6sjtu6jws7q4lesne9m5gdex9g8ps6n9scwk2v0-----
// MWNlYjZmMjY4MzY5MGIzNzkwN2UyNmQxMjdhNWQ5ZWY4ZTM1ZDg4NjY5MDFiOWY3
// MWMwZTUzNTRiNmJkYjM1ZWRhOTQ1YjE4ZjQ1OTY1MGVlZTVjMzA3OWE4NDk3Y2Q0
// OWQwZjAyYmZjYzI3OTJlZTg4NmU0YzU0MWMzMGQ0Y2I=
//  -----END PRIVATE KEY for erd1m229kx85t9jsamjuxpu6sjtu6jws7q4lesne9m5gdex9g8ps6n9scwk2v0-----`);
//     const signer2 = UserSigner.fromPem(
//         `-----BEGIN PRIVATE KEY for erd1877es7jfwzmm3th9r4hlwxj4dl9qga4qq84ze73vveq2ycdjuu3s8ydw04-----
//     ZjI4MGY0MjExMGVhYWRjMTVhMDc2NDI4MjQ2N2QzYzNiNzc0YmQ4NTQwMGNjMTM4
//     MjdjYjI3OTFiODAwYjIwYzNmYmQ5ODdhNDk3MGI3YjhhZWU1MWQ2ZmY3MWE1NTZm
//     Y2EwNDc2YTAwMWVhMmNmYTJjNjY0MGEyNjFiMmU3MjM=
//     -----END PRIVATE KEY for erd1877es7jfwzmm3th9r4hlwxj4dl9qga4qq84ze73vveq2ycdjuu3s8ydw04-----`);
//     const signer3 = UserSigner.fromPem(
//         `-----BEGIN PRIVATE KEY for erd1gr48udydn93c5h2yu7cf32w8v6daqfqakw5mdrvuz9tc03rktr8qtt9d6m-----
//         OTk3M2Y1MTlhZmIzOWI5NDJlMDUxMGZlM2I1NzFjMTZkYTRlMDE1MTNjYzJiZDli
//         NjNjMjVhOTllMjY4ZjkwOTQwZWE3ZTM0OGQ5OTYzOGE1ZDQ0ZTdiMDk4YTljNzY2
//         OWJkMDI0MWRiM2E5YjY4ZDljMTE1Nzg3YzQ3NjU4Y2U=
//         -----END PRIVATE KEY for erd1gr48udydn93c5h2yu7cf32w8v6daqfqakw5mdrvuz9tc03rktr8qtt9d6m-----`);

//     const signedAddress = await signer.sign(Buffer.from(signer3.getAddress().hex(), "hex"))
//     const signerAddress = signer.getAddress().pubkey().toString("hex");
//     const signature = signedAddress.toString("hex");
//     const signerWithSignature = {
//         signerAddress,
//         signature
//     }

//     const signedAddress2 = await signer2.sign(Buffer.from(signer3.getAddress().hex(), "hex"))
//     const signerAddress2 = signer2.getAddress().pubkey().toString("hex");
//     const signature2 = signedAddress2.toString("hex");
//     const signerWithSignature2 = {
//         signerAddress: signerAddress2,
//         signature: signature2
//     }

//     const signedAddress3 = await signer3.sign(Buffer.from(signer3.getAddress().hex(), "hex"))
//     const signerAddress3 = signer3.getAddress().pubkey().toString("hex");
//     const signature3 = signedAddress3.toString("hex");
//     const signerWithSignature3 = {
//         signerAddress: signerAddress3,
//         signature: signature3
//     }


//     const tx = await bridge.addValidator(
//         signer3.getAddress().hex(),
//         [signerWithSignature, signerWithSignature2, signerWithSignature3]
//     )
//     console.log(await tx.wait());
//     console.log(tx)
// }

// addValidatorFunc()

// import { BitString, Cell, DictionaryKey } from "@ton/core"

// const msg = "te6cckEBAQEACgAAD63sJiI2rPwIVwLnUw=="

// const payload = Cell.fromBase64(
//     msg
// );

// const data = payload.beginParse().loadDict<DictionaryKey<BitString>, bigint >("amount", "0.007")

// console.log(data);

// import getTonBridgeContract from "./src/utils/functions/getTonBridgeContract"
// // import tonContractListener from "./src/modules/validator/utils/tonContractListener"
// const bridge = getTonBridgeContract({
//     tonChainConfig: {
//         chain: "TON",
//         rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
//         nativeCoinSymbol: "TON",
//         intialFund: "6000000000",
//         contractAddress: "EQAPNk9mquaFA979GwmLKe4TiKGqlJp2_fnPt0PcNLeiknee",
//         chainType: 'ton',
//         lastBlock: 42116275
//     },
//     tonWallet: {
//         "publicKey": "5aba2a59ffcef4fc7894ac0682dd419b18a54c30b55d0db0e244f15b1a7f87b2",
//         "secretKey": "068e14dc8440a571306c2294c9a18b31fc2f853ecc087412aff42c16f9d6dd2d5aba2a59ffcef4fc7894ac0682dd419b18a54c30b55d0db0e244f15b1a7f87b2"
//     }
// })

// bridge.validators("5aba2a59ffcef4fc7894ac0682dd419b18a54c30b55d0db0e244f15b1a7f87b2").then(r => console.log(r))
// // bridge.validatorsCount().then(r=> console.log(r))

// import { loadLockedEvent } from "./src/contractsTypes/contracts/tonBridge"
// tonContractListener({
//     contractAddress: "EQAbIPMHlV7ReSUzXal5TpPAQBgRoH3eygAxzyTl39yEdHcR",
//     rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
//     lastBlock_: 16625732000003,
//     chain: "ton",
//     handleLog: async ({ log }) => {
//         if(log.body.asSlice().loadUint(32) !== 2534710387){
//             return
//         }
//         console.log(loadLockedEvent(log.body.asSlice()))
//     },
// })

// import { getTxHashes, getLogs, getTxStatus } from "./src/modules/validator/utils/multiversXContractListener/utils"
// const elasticSearchURL = "https://devnet-index.multiversx.com";
// const contractAddress = "erd1qqqqqqqqqqqqqpgqghvly0npf6ewpmzh47ud76ssh6nppu4e7hnses7qlz";

// getTxHashes({ elasticSearchURL, contractAddress, from: 0 }).then(r => {
//     console.log(r)
//     getLogs({ elasticSearchURL, txHashes: r.map(item => item.txHash), eventIdentifier: ["lock721", "lock1155"] }).then(r => console.log(r))
// })


// import { getMultiversXBridgeContract } from "./src/utils"

// const bridge = getMultiversXBridgeContract({
//     multiversXChainConfig: {
//         chain: "MULTIVERSX",
//         nativeCoinSymbol: "EGLD",
//         intialFund: "50000000000000000",
//         contractAddress: "erd1qqqqqqqqqqqqqpgqtsw8s3evjjyqqa2j2tfn9yvufqskdv236n9s2a06h9",
//         chainType: 'multiversX',
//         elasticSearchURL: "https://devnet-index.multiversx.com",
//         gatewayURL: "https://devnet-gateway.multiversx.com",
//         lastBlock: 0,
//         chainID: "D"
//     },
//     multiversXWallet: {
//         "userWallet": {
//             "version": 4,
//             "kind": "secretKey",
//             "id": "e0cfdef0-b670-42d2-8dc1-05cf4cea416d",
//             "address": "7f78d7b440eca96e9c288e723b650e1a7d4482e37eae22a5711c3c7ba1ae0900",
//             "bech32": "erd10aud0dzqaj5ka8pg3eerkegwrf75fqhr06hz9ft3rs78hgdwpyqqsjjlf5",
//             "crypto": {
//                 "ciphertext": "c050aa968b9cd041c04d17eaef3bfbdd44271dcf4676b8f614900fddc9767707eb26c371e97e133a3767ae2ad5bd871260b7803b877159c8ad24e061a2fa61ce",
//                 "cipherparams": { "iv": "bd791faabe8de9a299d7f4654d09a398" },
//                 "cipher": "aes-128-ctr",
//                 "kdf": "scrypt",
//                 "kdfparams": {
//                     "dklen": 32,
//                     "salt": "14d3190da1ab561ab3ec7bb4dba258a75f0354b771770b90055b235de868ff2b",
//                     "n": 4096,
//                     "r": 8,
//                     "p": 1
//                 },
//                 "mac": "8fc26c25557b2938e274d869f4425a3d65601e99257338ee71e014102166ed85"
//             }
//         },
//         "password": "5f7rylv3qdu"
//     }
// })
//  bridge.validatorsCount().then(r=> console.log(r.toString()))
//  bridge.validators("9fb927c978225cb7a93b8b3cd8d8423e176e009dc284c536d9c4372bbe128487").then(r=> console.log(r))

// bridge.tokens().then(r => {
//     console.log(r.secondValue)
//     //@ts-ignore
//     r.firstValue.valueOf().forEach((e: any, index: number) => {
//         // console.log("----------------------------------------------\n")
//         // console.log(parseInt(e[0].token_id.toString()));
//         // console.log(e[0].chain.toString());
//         // console.log(e[0].contract_address.toString());
//         // console.log(e )
//         // console.log(e[1].toString());
//         // console.log("----------------------------------------------\n")
//         console.log("----------------------------------------------\n")
//         console.log(parseInt(e[0].token_id.toString()));
//         console.log(e[0].chain.toString());
//         console.log(e[0].contract_address.toString());

//         console.log(e[1].toString());
//         console.log("----------------------------------------------\n")
//     });
// }
// )

// import { Nonce } from "@multiversx/sdk-network-providers/out/primitives";

// const nonceAsHex = Buffer.from(new Nonce(1).hex(),"hex");

// console.log(nonceAsHex)

const tonChainConfig = {
    chain: "TON",
    rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
    nativeCoinSymbol: "TON",
    intialFund: "500000000",
    contractAddress: "EQD5H-K1OUdtkrTU6neDdcpRTtfjiDiRD8f6SVyjIq3IWaI_",
    chainType: 'ton',
    lastBlock: 16800822000003
}
const tonWallet = {
    "publicKey": "5aba2a59ffcef4fc7894ac0682dd419b18a54c30b55d0db0e244f15b1a7f87b2",
    "secretKey": "068e14dc8440a571306c2294c9a18b31fc2f853ecc087412aff42c16f9d6dd2d5aba2a59ffcef4fc7894ac0682dd419b18a54c30b55d0db0e244f15b1a7f87b2"
}


async function sendTon() {
    // Initialize TON Client
    const client = new TonClient({
        apiKey: "f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292",
        endpoint: tonChainConfig.rpcURL // Or another endpoint if you're using testnet
    });

    // Your wallet's keys
    // Initialize your wallet
    const wallet = WalletContractV4.create({ publicKey: Buffer.from(tonWallet.publicKey, "hex"), workchain: 0 });

    // Recipient address and amount to send
    const recipientAddress = Address.parseFriendly("EQAV8tH2WDuWYU7zAmkJmIwP8Ph_uIC4zBqJNIfKgRUUQewh").address; // Replace with recipient's address
    const amountToSend = BigInt(4000000000); // Amount in nanotons (1 TON = 1e9 nanotons)
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(Buffer.from(tonWallet.secretKey, "hex"));

    try {
        // Prepare message for transfer
        await walletSender.send({
            value: amountToSend,
            to: recipientAddress
        });

        // Send the message

    } catch (error) {
        console.error('Error sending TON:', error);
    }
}

// sendTon();
import { Wallet } from "secretjs";

const generateSecretWallet = () => {
    const wallet = new Wallet();

    const secretWallet = {
        publicKey: wallet.address,
        memonic: wallet.mnemonic
    }

    return secretWallet
}

console.log(generateSecretWallet())

