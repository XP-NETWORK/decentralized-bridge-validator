import { IGeneratedWallets } from "../../../modules/setup/types"


const getPrivateKeyForBridgeChain = ({ chainName, secrets }: { chainName: string, secrets: IGeneratedWallets }): string | undefined => {

    return secrets.bridgeChainsWallet.find(item => item.chain == chainName)?.privateKey

}

 

export default getPrivateKeyForBridgeChain