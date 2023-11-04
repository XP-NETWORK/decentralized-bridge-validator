import { AbiRegistry, Address, AddressValue, BigUIntType, BinaryCodec, BooleanType, ResultsParser, SmartContract } from "@multiversx/sdk-core";
import { multiversXBridgeABI } from "@src/abi";
import { IBridge, IMultiversXChainConfigAndMultiversXWallet } from "@src/types";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { UserSigner } from "@multiversx/sdk-wallet/out";



const getMultiversXBridgeContract = ({ multiversXChainConfig, multiversXWallet }: IMultiversXChainConfigAndMultiversXWallet): IBridge => {

    const abiRegistry = AbiRegistry.create(multiversXBridgeABI);

    const proxyNetworkProvider = new ProxyNetworkProvider(multiversXChainConfig.gatewayURL);


    const multiversXBridgeAddress = Address.fromBech32(multiversXChainConfig.contractAddress);
    const multiversXBridgeContract = new SmartContract({ address: multiversXBridgeAddress, abi: abiRegistry });

    return {
        validators: async (validatorAddress: string) => {
            const query = multiversXBridgeContract.createQuery({
                func: "validatos",
                args: [new AddressValue(new Address(validatorAddress))]
            });
            const queryResponse = await proxyNetworkProvider.queryContract(query);
            const bundle = new ResultsParser().parseUntypedQueryResponse(queryResponse);
            const added = bundle.values[0];
            const decodedValue = new BinaryCodec().decodeTopLevel(added, new BooleanType());
            return { added: decodedValue.valueOf() }
        },
        validatorsCount: async () => {
            const query = multiversXBridgeContract.createQuery({
                func: "validatorsCount",
            });
            const queryResponse = await proxyNetworkProvider.queryContract(query);
            const bundle = new ResultsParser().parseUntypedQueryResponse(queryResponse);
            const count = bundle.values[0];
            const decodedValue = new BinaryCodec().decodeTopLevel(count, new BigUIntType());
            return decodedValue.valueOf();
        },
        addValidator: async (validatorAddress: string, signatures: string[]) => {
            const signer = UserSigner.fromWallet(multiversXWallet.userWallet, multiversXWallet.password)
            const interaction = multiversXBridgeContract.methods.addValidator([validatorAddress, signatures]).withSender(signer.getAddress())
            const transaction = interaction.buildTransaction();
            transaction.applySignature(await signer.sign(transaction.serializeForSigning()))
            const hash = await proxyNetworkProvider.sendTransaction(transaction);
            return { hash, wait: async () => { } }
        }
    }
}

export default getMultiversXBridgeContract;

