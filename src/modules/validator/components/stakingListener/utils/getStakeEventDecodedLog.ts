import { stakingABI } from "@src/abi";
import { LogObject } from "@src/modules/validator/utils/evmContractListener/types";
import Web3 from "web3";

const getStakeEventDecodedLog = ({ log }: { log: LogObject }) => {

    const stakedEventAbi = stakingABI.find(abi => abi.name === "Staked" && abi.type === "event");
    const web3 = new Web3();
    const decodedLog = web3.eth.abi.decodeLog(
        stakedEventAbi.inputs,
        log.data,
        [...log.topics.slice(1)]
    );

    return String(decodedLog.user);
}

export default getStakeEventDecodedLog