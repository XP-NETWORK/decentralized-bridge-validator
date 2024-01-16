import { Repository } from 'typeorm';
import { Block } from '@src/db/entity/Block';
import { AppDataSource } from '@src/db/data-source';
import { BLOCK_CHUNKS } from '@src/config/chainSpecs';
import { SecretNetworkClient } from 'secretjs';
import { ISecretContractListener } from './types';

async function secretContractListener({
    contractAddress,
    rpcURL,
    chainId,
    lastBlock_,
    chain,
    eventId,
    handleLog,
}: ISecretContractListener): Promise<void> {
    const secretjs = new SecretNetworkClient({
        url: rpcURL,
        chainId: chainId,
    });
    const blockRepository: Repository<Block> =
        AppDataSource.getRepository(Block);

    let blockInstance: Block = await blockRepository.findOne({
        where: { chain, contractAddress },
    });

    if (!blockInstance) {
        const newBlock = new Block();
        newBlock.chain = chain;
        newBlock.contractAddress = contractAddress;
        newBlock.lastBlock = lastBlock_;
        blockInstance = await blockRepository.save(newBlock);
    }
    console.info({ blockInstance });

    const lastBlock = blockInstance.lastBlock;
    const latestBlockNumber = Number(
        (await secretjs.query.tendermint.getLatestBlock({})).block.header
            .height,
    );
    const latestBlock =
        lastBlock + BLOCK_CHUNKS < latestBlockNumber
            ? lastBlock + BLOCK_CHUNKS
            : latestBlockNumber;
    blockInstance.lastBlock = latestBlock;
    const query = `message.contract_address = '${contractAddress}' AND tx.height >= ${lastBlock} AND tx.height <= ${latestBlock}`;

    const logs = await secretjs.query.txsQuery(query);

    if (!logs.length) {
        console.info('No Transactions found');
        await blockRepository.save(blockInstance);
        return;
    }

    const handleLogPromises: Promise<void>[] = [];

    for (const log of logs) {
        const logToFind = log.jsonLog[0].events
            .find((item) => item.type === 'wasm')
            .attributes.find((item) => item.key === eventId);
        if (logToFind)
            handleLogPromises.push(
                handleLog({ log: logToFind.value, hash: log.transactionHash }),
            );
    }

    await Promise.all(handleLogPromises);

    await blockRepository.save(blockInstance);
}

export default secretContractListener;
