function waitForMSWithMsg(ms: number, msg: string): Promise<void> {
    const secondsInMilliSeconds = 1000;
    const numberOfDecimals = 2;
    console.info(
        `${msg}, retrying in ${(ms / secondsInMilliSeconds).toFixed(numberOfDecimals)} seconds`,
    );
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default waitForMSWithMsg;
