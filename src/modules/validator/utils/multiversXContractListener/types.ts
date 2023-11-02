import { IHandleLog } from "./components/types";

interface IMultiversXContractListener {
    gatewayURL: string;
    contractAddress: string;
    lastBlock_: number;
    eventIdentifier: string;
    handleLog: IHandleLog;
    jobName: string
}

export { IMultiversXContractListener }