import type { Migrator } from "@mikro-orm/migrations";
import type { LogInstance } from "../handler/types";

export async function runMigrationsIfAny(
  migrator: Migrator,
  logger: LogInstance,
) {
  const pendingMigs = await migrator.getPendingMigrations();
  if (pendingMigs.length > 0) {
    const migrated = await migrator.up();
    logger.info("Applied the following migrations:", migrated);
  }
}
