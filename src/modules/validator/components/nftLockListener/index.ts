import { evmLockListener } from "./components"

const nftLockListener = async ({ config, wallets }: IConfigAndWallets) => {
    await evmLockListener({ config, wallets })
}


export default nftLockListener