import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { CasperClient, Keys } from "casper-js-sdk";
import type { BigNumberish } from "ethers";
import type {
  TSupportedChainTypes,
  TSupportedChains,
} from "../../../../config";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";

export type CasperHandlerParams = {
  fetchProvider: CasperProviderFetch;
  signer: Keys.Ed25519;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  initialFunds: bigint;
  em: EntityManager;
  decimals: number;
  chainType: TSupportedChainTypes;
  chainIdent: TSupportedChains;
  serverLinkHandler: AxiosInstance | undefined;
  rpc: string;
  logger: LogInstance;
  staking: ERC20Staking;
  validatorAddress: string;
  network: "casper-test" | "casper";
};

export type CasperProviderFetch = () => Promise<
  readonly [CasperClient, () => void]
>;

export interface TCasperClaimArgs {
  readonly token_id_arg: string;
  readonly source_chain_arg: string;
  readonly destination_chain_arg: string;
  readonly destination_user_address_arg: string;
  readonly source_nft_contract_address_arg: string;
  readonly name_arg: string;
  readonly symbol_arg: string;
  readonly royalty_arg: BigNumberish;
  readonly royalty_receiver_arg: string;
  readonly metadata_arg: string;
  readonly transaction_hash_arg: string;
  readonly token_amount_arg: BigNumberish;
  readonly nft_type_arg: string;
  readonly fee_arg: BigNumberish;
  readonly lock_tx_chain_arg: string;
  readonly amount: string;
}
