import {
  type ContractAbstraction,
  type ContractMethod,
  type ContractMethodObject,
  type ContractProvider,
  type Wallet
} from '@taquito/taquito'

interface BaseContractType {
  methods: unknown
  methodsObject: unknown
  storage: unknown
}

type ContractMethodsOf<
    T extends ContractProvider | Wallet,
    TContract extends BaseContractType,
> = {
  [M in keyof TContract['methods']]: TContract['methods'][M] extends (
    ...args: infer A
  ) => unknown
    ? (...args: A) => ContractMethod<T>
    : never;
}
type ContractMethodsObjectsOf<
    T extends ContractProvider | Wallet,
    TContract extends BaseContractType,
> = {
  [M in keyof TContract['methodsObject']]: TContract['methodsObject'][M] extends (
    ...args: infer A
  ) => unknown
    ? (...args: A) => ContractMethodObject<T>
    : never;
}
type ContractStorageOf<TContract extends BaseContractType> =
    TContract['storage']

export type ContractAbstractionFromContractType<
    TContract extends BaseContractType,
> = ContractAbstraction<
ContractProvider,
ContractMethodsOf<ContractProvider, TContract>,
ContractMethodsObjectsOf<ContractProvider, TContract>,
{},
{},
ContractStorageOf<TContract>
>

export type WalletContractAbstractionFromContractType<
    TContract extends BaseContractType,
> = ContractAbstraction<
Wallet,
ContractMethodsOf<Wallet, TContract>,
ContractMethodsObjectsOf<Wallet, TContract>,
{},
{},
ContractStorageOf<TContract>
>
