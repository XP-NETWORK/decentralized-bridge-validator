import { waitForKeyPress } from "../../../../utils/functions";
import waitForMSWithMsg from "../../../../utils/functions/waitForMSWithMsg";
import promptToGetFunding from "../promptToGetFunding";
import { IPromptToGetFunding } from "../promptToGetFunding/types";

const getInitialFunds = async ({ wallets, config }: IPromptToGetFunding): Promise<void> => {

    let isNotFullyFunded = true;
    while (isNotFullyFunded) {
        try {
            isNotFullyFunded = await promptToGetFunding({ wallets, config });
            if (isNotFullyFunded)
                await waitForKeyPress("Press [Enter] key after funding your addresses");
        } catch (e) {
            await waitForMSWithMsg(5000, "Something went wrong")
            isNotFullyFunded = true
        }
    }
}

export default getInitialFunds