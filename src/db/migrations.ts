import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "./client";
import migrations from "../../drizzle/migrations";
import { logger } from "../utils/logger";
import { errorTracking } from "../services/ErrorTracking";

/**
 * Runs database migrations automatically.
 * This is called during the app's initialization phase in app/_layout.tsx.
 */
export async function runMigrations() {
  const startTime = Date.now();
  try {
    logger.info("Database: Checking for migrations...");

    // This will execute any pending migrations in the drizzle/ directory
    await migrate(db, migrations);

    const duration = Date.now() - startTime;
    logger.info(`Database: Migrations completed successfully in ${duration}ms.`);
  } catch (error) {
    logger.error("Database: Migration failed critically", error);

    // Track the migration failure for production monitoring
    errorTracking.captureException(error, {
      context: "db_migration",
      timestamp: new Date().toISOString(),
    });

    throw error;
  }
}
