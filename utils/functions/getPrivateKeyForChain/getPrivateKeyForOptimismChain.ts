import { IGeneratedWallets } from "../../../modules/setup/types"

const getPrivateKeyForOptimismChain = ({ secrets }: { secrets: IGeneratedWallets }): string | undefined => {

    return secrets.optimismChainWallet.privateKey

}

export default getPrivateKeyForOptimismChain