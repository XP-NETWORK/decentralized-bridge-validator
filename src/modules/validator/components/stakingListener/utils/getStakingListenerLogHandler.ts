import { LogEntry } from '@src/modules/validator/utils/evmContractListener/types';
import { getStakingContract, getStorageContract } from '@src/utils';
import { getStakeEventDecodedLog } from '.';
import { approveStake } from '../stakingListenerJob/components';
import { IConfigAndWallets } from '@src/types';

const getStakingListenerLogHandler = ({
    config,
    wallets,
}: IConfigAndWallets) => {
    const storageContract = getStorageContract({
        evmChainConfig: config.storageConfig,
        evmWallet: wallets.evmWallet,
    });
    const stakingContract = getStakingContract({
        stakingChainConfig: config.stakingConfig,
        evmWallet: wallets.evmWallet,
    });
    const { topicHash } = stakingContract.interface.getEvent('Staked');

    const handleLog = async ({ log }: { log: LogEntry }) => {
        if (typeof log === 'string' || !log.topics.includes(topicHash)) return;

        const { validatorAddressAndChainType } = getStakeEventDecodedLog({
            log,
        });

        await approveStake({
            wallets,
            validatorAddressAndChainType,
            storageContract,
        });
    };

    return handleLog;
};

export default getStakingListenerLogHandler;
