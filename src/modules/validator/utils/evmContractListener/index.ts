import { Repository } from 'typeorm';
import Web3 from 'web3';
import { Block } from '@src/db/entity/Block';
import { AppDataSource } from '@src/db/data-source';
import { IEvmContractListener, LogEntry } from './types';
import { BLOCK_CHUNKS } from '@src/config/chainSpecs';


async function evmContractListener(
    { contractAddress,
        rpcURL,
        lastBlock_,
        chain,
        handleLog }: IEvmContractListener): Promise<void> {

    let lastBlock = lastBlock_;

    const web3 = new Web3(rpcURL);

    const blockRepository: Repository<Block> = AppDataSource.getRepository(Block);

    let blockInstance: Block = await blockRepository.findOne({
        where: { chain, contractAddress },
    });

    if (!blockInstance) {
        const newBlock = new Block();
        newBlock.chain = chain
        newBlock.contractAddress = contractAddress
        newBlock.lastBlock = lastBlock
        blockInstance = await blockRepository.save(newBlock);
    }
    console.info({ blockInstance })

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
        console.info('No Transactions found');
        await blockRepository.save(blockInstance);
        return;
    }

    const handleLogPromises: Promise<void>[] = [];

    for (const log of logs) {
        handleLogPromises.push(handleLog({ log }));
    }
    
    await Promise.all(handleLogPromises);

    await blockRepository.save(blockInstance);

}

export default evmContractListener
