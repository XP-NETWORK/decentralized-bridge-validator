import { MikroORM } from "@mikro-orm/sqlite";
import MikroOrmConfig from "../../mikro-orm.config";

(async () => {
  const orm = await MikroORM.init(MikroOrmConfig);
  const migrator = orm.getMigrator();
  const nm = await migrator.getPendingMigrations();
  console.log("Migrations Pending:", nm);
  if (nm) {
    await migrator.up();
  }
})();
