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


import { Mnemonic, UserWallet } from '@multiversx/sdk-wallet/out';
import * as fs from "fs"
const generateElrondWallet = () => {
    const mnemonic = Mnemonic.generate();
    const secretKey = mnemonic.deriveKey(0);
    const password = Math.random().toString(36).slice(2);
    const userWallet = UserWallet.fromSecretKey({ secretKey, password });
    console.log(userWallet, )
    return { secretKey, password };
};

fs.writeFile("s.txt", JSON.stringify(generateElrondWallet()), ()=> {})

// import { getCurrentMultiversXBalance } from "./src/utils"
// import { mockBridgeConfig, mockWallets } from "./src/test/mockData"
// import { IMultiversXChainConfig } from "./src/types"

// getCurrentMultiversXBalance({ multiversXChainConfig: mockBridgeConfig.bridgeChains[2] as IMultiversXChainConfig, multiversXWallet: mockWallets.multiversXWallet }).then(r => console.log(r))