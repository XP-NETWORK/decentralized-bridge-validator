import type { AxiosInstance } from "axios";

export async function fetchHttpOrIpfs(uri: string, http: AxiosInstance) {
  const url = new URL(uri);
  if (url.protocol === "http:" || url.protocol === "https:") {
    const response = await http.get(uri);
    return response.data;
  }
  if (url.protocol === "ipfs:") {
    try {
      return (
        await http.get(`https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`)
      ).data;
    } catch (ex) {
      return (
        await http.get(
          `https://xpnetwork.infura-ipfs.io/ipfs/${uri.replace("ipfs://", "")}`,
        )
      ).data;
    }
  }
  throw new Error("Unsupported protocol");
}
