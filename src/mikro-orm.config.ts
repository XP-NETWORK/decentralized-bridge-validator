import { Options, SqliteDriver } from "@mikro-orm/sqlite";
import { Block } from "./persistence/entities/block";

const MikroOrmConfig: Options = {
  driver: SqliteDriver,
  dbName: "validator.db",
  entities: [Block],
  debug: true,
};

export default MikroOrmConfig;
