import "reflect-metadata"
import { DataSource } from "typeorm"
import { Block } from "./entity/Block"
import { MultiversXTransactions } from "./entity/MultiversXTransactions"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Block, MultiversXTransactions],
    migrations: [],
    subscribers: [],
})
