import { Repository } from 'typeorm';
import { Block } from '@src/db/entity/Block';
import { AppDataSource } from '@src/db/data-source';
import { ITonContractListener } from './types';
import { Address, TonClient } from '@ton/ton';
import { waitForMSWithMsg } from '@src/utils';


async function tonContractListener(
    { contractAddress,
        rpcURL,
        lastBlock_,
        chain,
        handleLog }: ITonContractListener): Promise<void> {

    const client = new TonClient({ endpoint: rpcURL });

    const blockRepository: Repository<Block> = AppDataSource.getRepository(Block);

    let blockInstance: Block = await blockRepository.findOne({
        where: { chain, contractAddress },
    });

    if (!blockInstance) {
        const newBlock = new Block();
        newBlock.chain = chain
        newBlock.contractAddress = contractAddress
        newBlock.lastBlock = lastBlock_
        blockInstance = await blockRepository.save(newBlock);
    }

    console.info({ blockInstance })

    const latestTx = await client.getTransactions(Address.parseFriendly(contractAddress).address, { limit: 1 });

    if (!latestTx.length) {
        console.info('No Transactions found');
        return;
    }
    await waitForMSWithMsg(1000, "waiting for 1 second for Ton rpc")

    const transactions = await client.getTransactions(Address.parseFriendly(contractAddress).address,
        {
            limit: 100,
            hash: latestTx[0].hash().toString("base64"),
            lt: latestTx[0].lt.toString(),
            to_lt: String(blockInstance.lastBlock)
        })


    if (!transactions.length) {
        console.info('No New Transactions found');
        return;
    }

    blockInstance.lastBlock = Number(transactions[0].lt);

    const handleLogPromises: Promise<void>[] = [];

    for (const tx of transactions) {
        handleLogPromises.push(handleLog({ log: tx.outMessages.get(0),  hash: tx.hash().toString("base64") }));
    }

    await Promise.all(handleLogPromises);

    await blockRepository.save(blockInstance);

}

export default tonContractListener