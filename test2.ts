import { getTxHashes, getTxStatus, getLogs } from "./src/modules/validator/utils/multiversXContractListener/utils"


getTxHashes({ gatewayURL: "https://devnet-index.multiversx.com", from: 0, contractAddress: "erd1qqqqqqqqqqqqqpgqhv2wpezf4hwtvcy4t7s9wlmjklad0k776n9sj9q9hz" }).then(r => {
    console.log(r);
    getTxStatus({ gatewayURL: "https://devnet-index.multiversx.com", txHashes: r.map(item => item.txHash) }).then(r2 => {
        console.log(r2)
    })

    getLogs({ gatewayURL: "https://devnet-index.multiversx.com", txHashes: r.map(item => item.txHash), eventIdentifier: "add" }).then(r3 => {
        console.log(r3)
    })
})