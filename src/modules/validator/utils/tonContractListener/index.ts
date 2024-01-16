import { Repository } from 'typeorm';
import { Block } from '@src/db/entity/Block';
import { AppDataSource } from '@src/db/data-source';
import { ITonContractListener } from './types';
import { Address, TonClient } from '@ton/ton';
import { waitForMSWithMsg } from '@src/utils';

async function tonContractListener({
    contractAddress,
    rpcURL,
    lastBlock_,
    chain,
    handleLog,
}: ITonContractListener): Promise<void> {
    const client = new TonClient({
        endpoint: rpcURL,
        apiKey: 'f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292',
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

    const latestTx = await client.getTransactions(
        Address.parseFriendly(contractAddress).address,
        { limit: 1 },
    );

    if (!latestTx.length) {
        console.info('No Transactions found');
        return;
    }
    await waitForMSWithMsg(1000, 'waiting for Ton rpc');

    const transactions = await client.getTransactions(
        Address.parseFriendly(contractAddress).address,
        {
            limit: 100,
            hash: latestTx[0].hash().toString('base64'),
            lt: latestTx[0].lt.toString(),
            to_lt: String(blockInstance.lastBlock),
            inclusive: true,
        },
    );

    if (!transactions.length) {
        console.info('No New Transactions found');
        return;
    }

    blockInstance.lastBlock = Number(transactions[0].lt);

    for (const tx of transactions) {
        console.log(tx.outMessages.size, '-----------------SIZE-----------');
        for (let i = 0; i < tx.outMessages.size; i++) {
            await handleLog({
                log: tx.outMessages.get(i),
                hash: tx.hash().toString('base64'),
            });
        }
    }

    await blockRepository.save(blockInstance);
}

export default tonContractListener;
