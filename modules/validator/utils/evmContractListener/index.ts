


import { Repository } from 'typeorm';

import Web3 from 'web3';
import { Block } from '../../../../db/entity/Block';
import { AppDataSource } from '../../../../db/data-source';
import { IEvmContractListener, LogEntry } from './types';
import { BLOCK_CHUNKS } from '../../../../config/chainSpecs';
import waitForMSWithMsg from '../../../../utils/functions/waitForMSWithMsg';


async function evmContractListener(
    { contractAddress,
        rpcUrl,
        lastBlock_,
        chain,
        handleLog }: IEvmContractListener): Promise<void> {

    let lastBlock = lastBlock_;

    const web3 = new Web3(rpcUrl);

    const blockRepository: Repository<Block> = AppDataSource.getRepository(Block);

    let blockInstance: Block = await blockRepository.findOne({
        where: { chain, contractAddress },
    });

    console.log({ blockInstance })
    if (!blockInstance) {
        const newBlock = new Block();
        newBlock.chain = chain
        newBlock.contractAddress = contractAddress
        newBlock.lastBlock = lastBlock
        blockInstance = await blockRepository.save(newBlock);
    }
    console.log({ blockInstance })

    if (blockInstance.lastBlock) {
        lastBlock = blockInstance.lastBlock;
    }

    const latestBlockNumber = Number((await web3.eth.getBlockNumber()).toString());

    const latestBlock = lastBlock + BLOCK_CHUNKS < latestBlockNumber ? lastBlock + BLOCK_CHUNKS : latestBlockNumber;

    const logs: LogEntry[] = await web3.eth.getPastLogs({
        fromBlock: lastBlock,
        toBlock: latestBlock,
        address: contractAddress,
    });

    blockInstance.lastBlock = latestBlock;

    if (!logs.length) {
        console.log('No Transactions found');
        await blockRepository.save(blockInstance);
        return;
    }

    for (const log of logs) {
        await handleLog({ log });
    }

    await blockRepository.save(blockInstance);
    await waitForMSWithMsg(5000, "Waiting to see");

}

export default evmContractListener
