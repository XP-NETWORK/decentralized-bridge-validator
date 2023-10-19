const confirmationCountNeeded = (validatorCount: number) => {
    return (Math.floor(2 / 3 * validatorCount)) + 1
}

export default confirmationCountNeeded