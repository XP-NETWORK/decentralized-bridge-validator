import Web3 from "web3";
import { LogEntry } from "../../utils/evmContractListener/types";
import { stakingABI } from "@src/abi";
import { createJobWithWorker, evmContractListener } from '../../utils';
import { getStakingContract, getStorageContract } from "@src/utils";
import { IConfigAndWallets } from "@src/types";

const stakingListener = async (jobData: IConfigAndWallets) => {
    const jobName = "stakingApprover";
    const jobFunction = async (data: IConfigAndWallets) => {
        const { config, wallets }: IConfigAndWallets = data;

        const { stakingConfig, storageConfig } = config

        const storageContract = getStorageContract({ evmChainConfig: storageConfig, evmWallet: wallets.evmWallet });
        const stakingContract = getStakingContract({ stakingChainConfig: stakingConfig, evmWallet: wallets.evmWallet })
        const { topicHash } = stakingContract.interface.getEvent("Staked");

        const web3 = new Web3(config.stakingConfig.rpcURL);
        const stakedEventAbi = stakingABI.find(abi => abi.name === "Staked" && abi.type === "event");



        const handleLog = async ({ log }: { log: LogEntry; }) => {

            if (typeof log === "string" || !log.topics.includes(topicHash)) return;

            const topicToIgnore = 1;
            const decodedLog = web3.eth.abi.decodeLog(
                stakedEventAbi.inputs,
                log.data,
                log.topics.slice(topicToIgnore)
            );
            const stakerAddress = String(decodedLog.user);
            console.log({ stakerAddress, pv: wallets.evmWallet.privateKey })

            const signedStakerAddress = web3.eth.accounts
                .privateKeyToAccount(wallets.evmWallet.privateKey)
                .sign(web3.utils.keccak256(web3.eth.abi.encodeParameters(
                    ["address"],
                    [stakerAddress]
                )));

            try {
                const tx = await storageContract.approveStake(stakerAddress, signedStakerAddress.signature);
                console.log(`Stake Approved Transaction Hash: ${tx.hash}`);
            } catch (e) {
                if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
                    throw ("Error while processing log")
                }
            }
        };

        try {
            const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = stakingConfig;
            await evmContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
        } catch (e) {
            console.error("Error Staking listner", e)
        }
    }


    await createJobWithWorker<IConfigAndWallets>({ jobData, jobName, jobFunction })
}


export default stakingListener;
