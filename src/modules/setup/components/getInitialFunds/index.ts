import { processDelayMilliseconds } from "../../../../utils/constants/processDelayMilliseconds";
import { waitForKeyPress } from "../../../../utils/functions";
import waitForMSWithMsg from "../../../../utils/functions/waitForMSWithMsg";
import { promptToGetFunding } from "./components";

const getInitialFunds = async ({ config, wallets }: IConfigAndWallets): Promise<void> => {

    let isNotFullyFunded = true;
    while (isNotFullyFunded) {
        try {
            isNotFullyFunded = await promptToGetFunding({ wallets, config });
            if (isNotFullyFunded)
                await waitForKeyPress("Press [Enter] key after funding your addresses");
        } catch (e) {
            console.log(e)
            await waitForMSWithMsg(processDelayMilliseconds, "Something went wrong")
            isNotFullyFunded = true
        }
    }
}

export default getInitialFunds