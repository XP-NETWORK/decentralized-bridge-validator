// import { getTxHashes, getTxStatus, getLogs } from "./src/modules/validator/utils/multiversXContractListener/utils"


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

import TonWeb from "tonweb"

const generateTonWallet = () => {

    const KeyPair = TonWeb.utils.nacl.sign.keyPair();
    const tonWallet = {
        publicKey: TonWeb.utils.bytesToHex(KeyPair.publicKey),
        secretKey: TonWeb.utils.bytesToHex(KeyPair.secretKey)
    }

    return tonWallet
}

console.log(generateTonWallet());