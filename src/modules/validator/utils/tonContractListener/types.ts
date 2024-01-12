import { Message } from '@ton/ton';

interface ITonContractListener {
    contractAddress: string;
    rpcURL: string;
    lastBlock_: number;
    chain: string;
    handleLog: ({ log }: { log: Message; hash: string }) => Promise<void>;
}

export { ITonContractListener };
