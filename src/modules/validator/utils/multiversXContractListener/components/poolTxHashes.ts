import { getTxHashes } from "../utils"
import { Repository } from 'typeorm';
import { AppDataSource } from "@src/db/data-source";
import { Block } from "@src/db/entity/Block";
import { MultiversXTransactions } from "@src/db/entity/MultiversXTransactions";
import { IPoolTxHashes } from "./types";

const poolTxHashes = async ({ gatewayURL, contractAddress, lastBlock_ }: IPoolTxHashes) => {

    let lastBlock = lastBlock_;
    const chain = "multiversX";

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

    const txHashes = await getTxHashes({ gatewayURL, contractAddress, from: lastBlock });


    if (!txHashes.length) {
        console.info('No Transactions found');
        return;
    }

    const latestBlock = lastBlock + txHashes.length;

    blockInstance.lastBlock = latestBlock;

    // Perform all database operations within a transaction
    await AppDataSource.transaction(async entityManager => {
        // Save new transactions
        const transactions = txHashes.map(tx => {
            return entityManager.create(MultiversXTransactions, {
                transactionHash: tx.txHash,
                status: tx.status
            });
        });
        await entityManager.save(MultiversXTransactions, transactions);

        // Update the block instance
        blockInstance.lastBlock = latestBlock;
        await entityManager.save(blockInstance);
    });

    await blockRepository.save(blockInstance);

    console.log({ txHashes })
}

export default poolTxHashes