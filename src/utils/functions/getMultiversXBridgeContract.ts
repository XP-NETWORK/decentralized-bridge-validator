import { AbiRegistry, Account, Address, AddressValue, BytesValue, ResultsParser, SmartContract } from "@multiversx/sdk-core";
import { multiversXBridgeABI } from "@src/abi";
import { IBridge, IMultiversXChainConfigAndMultiversXWallet } from "@src/types";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { processDelayMilliseconds } from "../constants/processDelayMilliseconds";
import waitForMSWithMsg from "./waitForMSWithMsg";



const getMultiversXBridgeContract = ({ multiversXChainConfig, multiversXWallet }: IMultiversXChainConfigAndMultiversXWallet): IBridge => {

    const abiRegistry = AbiRegistry.create(multiversXBridgeABI);

    const proxyNetworkProvider = new ProxyNetworkProvider(multiversXChainConfig.gatewayURL);


    const multiversXBridgeAddress = Address.fromBech32(multiversXChainConfig.contractAddress);
    const multiversXBridgeContract = new SmartContract({ address: multiversXBridgeAddress, abi: abiRegistry });

    return {
        validators: async (validatorAddress: string) => {
            const query = multiversXBridgeContract.createQuery({
                func: "validators",
                args: [new BytesValue(Buffer.from(validatorAddress, "hex"))]
            });
            const queryResponse = await proxyNetworkProvider.queryContract(query);
            const validatorsDefinition = multiversXBridgeContract.getEndpoint("validators");
            const resultsParser = new ResultsParser();
            const { firstValue } = resultsParser.parseQueryResponse(queryResponse, validatorsDefinition);
            let added = false;
            if (firstValue) ({ added } = firstValue.valueOf());
            return { added }
        },
        validatorsCount: async () => {
            const query = multiversXBridgeContract.createQuery({
                func: "validatorsCount",
            });
            const queryResponse = await proxyNetworkProvider.queryContract(query);
            const validatorsCountDefinition = multiversXBridgeContract.getEndpoint("validatorsCount");

            const { firstValue } = new ResultsParser().parseQueryResponse(queryResponse, validatorsCountDefinition);
            const count = firstValue.valueOf();
            return count
        },
        addValidator: async (validatorAddress: string, signatures: {
            signerAddress: string;
            signature: string
        }[]) => {
            try {
                const signer = UserSigner.fromWallet(multiversXWallet.userWallet, multiversXWallet.password)

                const userAddress = new Address(multiversXWallet.userWallet.bech32);
                const userAccount = new Account(userAddress);
                const userOnNetwork = await proxyNetworkProvider.getAccount(userAddress);
                userAccount.update(userOnNetwork);

                const data = [new AddressValue(new Address(Buffer.from(validatorAddress, "hex"))), signatures.map(item => {
                    return {
                        sig: new BytesValue(Buffer.from(item.signature, "hex")),
                        public_key: new AddressValue(new Address(Buffer.from(item.signerAddress, "hex")))
                    }
                })]

                // const data = [new BytesValue(Buffer.from(validatorAddress, "hex")), signatures.map(item => {
                //     return [{
                //         sig: new BytesValue(Buffer.from(item.signature, "hex")),
                //         public_key: new BytesValue(Buffer.from(item.signerAddress, "hex"))
                //     }]
                // })]

                console.log(data)

                const transaction = multiversXBridgeContract.methods
                    .addValidator(data)
                    .withSender(signer.getAddress())
                    .withChainID(multiversXChainConfig.chainID)
                    .withNonce(userAccount.nonce)
                    .withGasLimit(6_000_000_00)
                    .buildTransaction()
                transaction.applySignature(await signer.sign(transaction.serializeForSigning()))
                const hash = await proxyNetworkProvider.sendTransaction(transaction);

                return {
                    hash, wait: async () => {
                        while (!((await proxyNetworkProvider.getTransaction(hash, true)).isCompleted)) {
                            await waitForMSWithMsg(processDelayMilliseconds, "Waiting for MultiversX transaction to finish");
                        }
                        const transactionReceipt = await proxyNetworkProvider.getTransaction(hash, true)
                        if (transactionReceipt.status.isFailed()) {
                            console.log({ hash })
                            throw new Error("Transaction failed")
                        } else {
                            return transactionReceipt
                        }
                    }
                }
            } catch (e) {
                console.log(e)
                throw new Error("Error adding validator in multiversX bridge")
            }

        }
    }
}

export default getMultiversXBridgeContract;

