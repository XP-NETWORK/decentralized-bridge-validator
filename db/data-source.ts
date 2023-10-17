import "reflect-metadata"
import { DataSource } from "typeorm"
import { Block } from "./entity/Block"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Block],
    migrations: [],
    subscribers: [],
})
