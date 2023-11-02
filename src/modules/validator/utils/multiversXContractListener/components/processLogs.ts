import { AppDataSource } from "@src/db/data-source";
import { MultiversXTransactions } from "@src/db/entity/MultiversXTransactions";
import { Repository } from "typeorm";
import { getLogs } from "../utils";
import { IProcessLogs } from "./types";

const processLogs = async ({ gatewayURL, eventIdentifier, handleLog }: IProcessLogs) => {
    try {
        const txRepository: Repository<MultiversXTransactions> = AppDataSource.getRepository(MultiversXTransactions);

        const successTransactions = await txRepository.find({
            where: {
                status: 'success'
            }
        });

        if (successTransactions.length === 0) {
            return;
        }

        const { resultantLogs, incompleteTx } = await getLogs({ gatewayURL, txHashes: successTransactions.map(tx => tx.transactionHash), eventIdentifier });

        const handleLogPromises: Promise<void>[] = [];

        for (const log of resultantLogs) {
            handleLogPromises.push(handleLog({ log }));
        }

        await Promise.all(handleLogPromises);


        // Filter and map transactions to update their status
        const modifiedTxObjects = successTransactions
            .map(txObject => {
                txObject.status = incompleteTx[txObject.transactionHash] ? "pending" : "processed";
                return txObject;
            })

        // Perform a bulk update within a transaction
        await AppDataSource.transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(MultiversXTransactions, modifiedTxObjects);
        });

    } catch (error) {
        throw new Error("Error while pooling transaction status")
    }
}
export default processLogs