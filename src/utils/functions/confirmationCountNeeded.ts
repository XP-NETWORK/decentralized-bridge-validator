const confirmationCountNeeded = (validatorCount: number) => {
  const twoByThree = 0.666666667
  const paddedValidatorCount = 1
  return Math.floor(twoByThree * validatorCount) + paddedValidatorCount
}

export default confirmationCountNeeded
