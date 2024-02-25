import { Repository } from 'typeorm';
import { Block } from '@src/db/entity/Block';
import { AppDataSource } from '@src/db/data-source';
import { ITezosContractListener, ITransactions } from './types';
import { BLOCK_CHUNKS } from '@src/config/chainSpecs';
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

export async function getContractOperations({
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
            'level.gt': fromLevel,
            'level.le': toLevel,
        };
        const response = await axios.get(URL, {
            params,
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function tezosContractListener({
    contractAddress,
    restApiURL,
    rpcURL,
    lastBlock_,
    chain,
    eventId,
    handleLog,
}: ITezosContractListener): Promise<void> {
    let lastBlock = lastBlock_;

    const Tezos = new TezosToolkit(rpcURL);

    const blockRepository: Repository<Block> =
        AppDataSource.getRepository(Block);

    let blockInstance = await blockRepository.findOne({
        where: { chain, contractAddress },
    });

    if (!blockInstance) {
        const newBlock = new Block();
        newBlock.chain = chain;
        newBlock.contractAddress = contractAddress;
        newBlock.lastBlock = lastBlock;
        blockInstance = await blockRepository.save(newBlock);
    }
    console.info({ blockInstance });

    if (blockInstance.lastBlock) {
        lastBlock = blockInstance.lastBlock;
    }

    const latestBlockNumber = (await Tezos.rpc.getBlockHeader()).level;

    const latestBlock =
        lastBlock + BLOCK_CHUNKS < latestBlockNumber
            ? lastBlock + BLOCK_CHUNKS
            : latestBlockNumber;

    const logs: ITransactions[] = await getContractOperations({
        contractAddress,
        fromLevel: lastBlock,
        toLevel: latestBlock,
        restApiURL,
    });

    blockInstance.lastBlock = latestBlock;

    if (!logs.length) {
        console.info('No Transactions found');
        await blockRepository.save(blockInstance);
        return;
    }

    const handleLogPromises: Promise<void>[] = [];

    for (const log of logs) {
        console.log(log.tag, eventId);
        if (log.tag === eventId) {
            console.log('Found');
            handleLogPromises.push(
                handleLog({
                    ...log.payload,
                    transaction_hash: String(log.transactionId),
                }),
            );
        }
    }

    await Promise.all(handleLogPromises);

    console.log('before saving');
    await blockRepository.save(blockInstance);
    console.log('after saving');
}

export default tezosContractListener;
