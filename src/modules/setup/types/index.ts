interface IEvmWallet {
    address: string;
    privateKey: string;
}

interface IGeneratedWallets {
    evmWallet: IEvmWallet
}

export { IEvmWallet, IGeneratedWallets }