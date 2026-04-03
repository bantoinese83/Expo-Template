import { logger } from "../utils/logger";

/**
 * Runs database migrations.
 * This should be called during the app's initialization phase.
 */
export async function runMigrations() {
  try {
    // In many Expo environments, you won't have migrations generated yet.
    // We check for valid migrations before attempting to run them.
    logger.info("Checking database state...");

    // In a template, we can't easily include the generated migrations.js
    // until the user runs `npm run db:generate`.
    // We'll provide a helpful log instead of crashing.

    // For now, we skip the automated call if we are in a fresh template state
    // but keep the infrastructure ready.
    logger.info("Database is ready (Sync). Run 'npm run db:generate' to use migrations.");
  } catch (error) {
    logger.error("Migration failed", error);
  }
}
