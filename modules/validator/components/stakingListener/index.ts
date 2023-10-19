import Web3 from "web3";
import { LogEntry } from "../../utils/evm/listener/types";
import { bridgeStorageAbi, stakingABI } from "../../../../abi";
import { createJobWithWorker, listener } from '../../utils';
import { ethers } from 'ethers';
import { IConfigAndWallets } from "../../types";

const stakingListener = async (jobData: IConfigAndWallets) => {
    const jobName = "stakingApprover";
    const jobFunction = async (data: IConfigAndWallets) => {
        const { config, wallets }: IConfigAndWallets = data;
        const storageContractAddress = config.optimismChain.contractAddress;
        const storageRpcURL = config.optimismChain.rpc;
        const contractAddress = config.stakingConfig.contractAddress;
        const rpcUrl = config.stakingConfig.rpc;
        const lastBlock_ = config.stakingConfig.lastBlock;
        const chain = config.stakingConfig.chain;
        const topic = Web3.utils.keccak256('Staked(address,uint256)');
        const web3 = new Web3(config.stakingConfig.rpc);
        const stakedEventAbi = stakingABI.find(abi => abi.name === "Staked" && abi.type === "event");



        const handleLog = async ({ log }: { log: LogEntry; }) => {

            if (typeof log !== "string" && log.topics.includes(topic)) {
                const decodedLog = web3.eth.abi.decodeLog(
                    stakedEventAbi.inputs,
                    log.data,
                    log.topics.slice(1)
                );
                const stakerAddress = String(decodedLog.user);
                console.log({ stakerAddress, pv: wallets.evmWallet.privateKey })

                const signedStakerAddress = web3.eth.accounts
                    .privateKeyToAccount("0x" + wallets.evmWallet.privateKey)
                    .sign(web3.utils.keccak256(stakerAddress));

                const provider = new ethers.JsonRpcProvider(storageRpcURL);
                const wallet = new ethers.Wallet(wallets.evmWallet.privateKey, provider);
                const storageContract = new ethers.Contract(storageContractAddress, bridgeStorageAbi, wallet);
                try {
                    const tx = await storageContract.approveStake(stakerAddress, signedStakerAddress);
                    console.log(`Stake Approved Transaction Hash: ${tx.hash}`);
                } catch (e) {
                    if (!(e && e.shortMessage && e.shortMessage === `execution reverted: "Signature already used"`)) {
                        throw ("Error while processing log")
                    }
                }
            }
        };

        try {
            await listener({ contractAddress, rpcUrl, lastBlock_, chain, handleLog });
        } catch (e) {
            console.error("Error Staking listner", e)
        }
    }


    await createJobWithWorker<IConfigAndWallets>({ jobData, jobName, jobFunction })
}


export default stakingListener;
