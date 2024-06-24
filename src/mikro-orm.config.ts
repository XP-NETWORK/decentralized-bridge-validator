import { Options, SqliteDriver } from "@mikro-orm/sqlite";
import { Block } from "./persistence/entities/block";
import { LockedEvent } from "./persistence/entities/locked";

const MikroOrmConfig: Options = {
  driver: SqliteDriver,
  dbName: "validator.db",
  entities: [Block, LockedEvent],
  debug: false,
};

export default MikroOrmConfig;
