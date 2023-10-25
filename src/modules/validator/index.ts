import { IConfigAndWallets } from "@src/types";
import { nftLockListener, stakingListener } from "./components"

const runValidators = async ({ config, wallets }: IConfigAndWallets) => {
    await stakingListener({ config, wallets });
    await nftLockListener({ config, wallets });
}

export { runValidators }
