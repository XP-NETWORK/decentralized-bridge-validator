import { IHandleLog } from "./components/types";

interface IMultiversXContractListener {
    elasticSearchURL: string;
    contractAddress: string;
    lastBlock_: number;
    eventIdentifier: string;
    handleLog: IHandleLog;
    jobName: string
}

export { IMultiversXContractListener }