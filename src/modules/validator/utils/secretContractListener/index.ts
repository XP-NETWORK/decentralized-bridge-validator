import { Repository } from 'typeorm';
import { Block } from '@src/db/entity/Block';
import { AppDataSource } from '@src/db/data-source';
import { BLOCK_CHUNKS } from '@src/config/chainSpecs';
import { SecretNetworkClient } from 'secretjs';


async function secretContractListener(
    { contractAddress,
        rpcURL,
        chainId,
        lastBlock_,
        chain,
        handleLog }): Promise<void> {

    let lastBlock = lastBlock_;

    const secretjs = new SecretNetworkClient({
        url: rpcURL,
        chainId: chainId,
    });

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

    const latestBlockNumber =  Number((await secretjs.query.tendermint.getLatestBlock({})).block.header.height);

    const latestBlock = lastBlock + BLOCK_CHUNKS < latestBlockNumber ? lastBlock + BLOCK_CHUNKS : latestBlockNumber;
    
    const logs = await secretjs.query.txsQuery(`transfer.recipient = '${contractAddress}' AND tx.height > ${lastBlock} AND tx.height <= ${latestBlock}`);
    
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

export default secretContractListener
