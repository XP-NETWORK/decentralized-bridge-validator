function waitForMSWithMsg(ms: number, msg: string): Promise<void> {
    console.info(`${msg}, retrying in ${(ms/1000).toFixed(2)} seconds`)
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default waitForMSWithMsg;