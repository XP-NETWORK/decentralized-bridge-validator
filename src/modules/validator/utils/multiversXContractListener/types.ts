import { IConfigAndWallets, IMultiversXChainConfig } from "@src/types";

interface IMultiversXContractListener extends IConfigAndWallets {
    elasticSearchURL: string;
    contractAddress: string;
    lastBlock_: number;
    eventIdentifier: string[];
    multiversXChainConfig: IMultiversXChainConfig,
    jobName: string
}

export { IMultiversXContractListener }