import { type IMultiverseXLogEvent } from '@src/modules/validator/utils/multiversXContractListener/utils/types'
import { decodeBase64Array } from '@src/utils'

const getLockEventDecodedLog = ({ log }: { log: IMultiverseXLogEvent }) => {
  const decodedLogs = decodeBase64Array(log.topics)

  const tokenId = String(decodedLogs[1].charCodeAt(0))
  const destinationChain = decodedLogs[2]
  const destinationUserAddress = decodedLogs[3]
  const sourceNftContractAddress = decodedLogs[4]
  const tokenAmount = String(decodedLogs[5].charCodeAt(0))
  const nftType = decodedLogs[6]
  const sourceChain = decodedLogs[7]

  return {
    tokenId,
    destinationChain,
    destinationUserAddress,
    sourceNftContractAddress,
    tokenAmount,
    nftType,
    sourceChain
  }
}

export default getLockEventDecodedLog
