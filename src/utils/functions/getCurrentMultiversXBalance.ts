import { IMultiversXChainConfigAndMultiversXWallet } from "@src/types"
import axios from "axios";

const getCurrentMultiversXBalance = async ({ multiversXChainConfig, multiversXWallet }: IMultiversXChainConfigAndMultiversXWallet) => {

    const data = {
        _source: ["balance"],
        query: {
            term: {
                address: multiversXWallet.userWallet.bech32
            }
        }
    };

    try {
        const response = (await axios.get(`${multiversXChainConfig.elasticSearchURL}/accounts/_search`, {
            data,
            headers: {
                'Content-Type': 'application/json'
            },
        })).data

        const balance = response.hits.hits[0]._source.balance;

        return BigInt(balance)
    } catch (e) {
        console.error(e)
        throw new Error("Error fetching balance")
    }

}

export default getCurrentMultiversXBalance