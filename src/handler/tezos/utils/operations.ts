import axios from "axios";

export default async function TezosGetContractOperations({
  contractAddress,
  fromLevel,
  toLevel,
  restApiURL,
}: {
  contractAddress: string;
  fromLevel: number;
  toLevel: number;
  restApiURL: string;
}) {
  try {
    const URL = `${restApiURL}/v1/contracts/events`;
    const params = {
      contract: contractAddress,
      "level.gt": fromLevel,
      "level.le": toLevel,
    };
    const response = await axios.get(URL, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
