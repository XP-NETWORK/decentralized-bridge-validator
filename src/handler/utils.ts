export const confirmationCountNeeded = (validatorCount: number) => {
  const twoByThree = 0.666666667;
  const paddedValidatorCount = 1;
  return Math.floor(twoByThree * validatorCount) + paddedValidatorCount;
};

export const ProcessDelayMilliseconds = 5000;

export function waitForMSWithMsg(ms: number, msg: string): Promise<void> {
  const secondsInMilliSeconds = 1000;
  const numberOfDecimals = 2;
  console.info(
    `${msg}, retrying in ${(ms / secondsInMilliSeconds).toFixed(
      numberOfDecimals,
    )} seconds`,
  );
  return new Promise((resolve) => setTimeout(resolve, ms));
}
