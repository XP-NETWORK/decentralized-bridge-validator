const statement1 = 'Usage:'
const statement2 = '  npm run dev [options]'
const statement3 = '\nOptions:'
const statement4 = '  --testnet         Setup for testnet environment'
const statement5 = '  --help            Display this help message and exit'
const statement6 =
    '\nBy default, without any options, the script sets up for production.'

export const PromtDisplayHelpStatements = {
  statement1,
  statement2,
  statement3,
  statement4,
  statement5,
  statement6
}

const promtDisplayHelp = () => {
  console.info(PromtDisplayHelpStatements.statement1)
  console.info(PromtDisplayHelpStatements.statement2)
  console.info(PromtDisplayHelpStatements.statement3)
  console.info(PromtDisplayHelpStatements.statement4)
  console.info(PromtDisplayHelpStatements.statement5)
  console.info(PromtDisplayHelpStatements.statement6)
}

export default promtDisplayHelp
