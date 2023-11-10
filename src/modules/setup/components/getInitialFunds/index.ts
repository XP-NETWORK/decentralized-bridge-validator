import { IConfigAndWallets } from '@src/types';
import { ProcessDelayMilliseconds } from '@src/utils/constants/processDelayMilliseconds';
import { waitForKeyPress, waitForMSWithMsg } from '@src/utils';
import { promptToGetFunding } from './components';

const getInitialFunds = async ({
    config,
    wallets,
}: IConfigAndWallets): Promise<void> => {
    let isFunded = false;
    while (!isFunded) {
        try {
            isFunded = await promptToGetFunding({ wallets, config });
            if (!isFunded)
                await waitForKeyPress(
                    'Press [Enter] key after funding your addresses',
                );
        } catch (e) {
            console.info(e);
            await waitForMSWithMsg(
                ProcessDelayMilliseconds,
                'Something went wrong',
            );
            isFunded = true;
        }
    }
};

export default getInitialFunds;
