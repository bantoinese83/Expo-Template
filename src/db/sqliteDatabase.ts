/**
 * Single SQLite database file for Drizzle (sync) and legacy/async helpers such as
 * `orderStorage` so migrations and app data share one store without conflicting table names.
 */
export const SQLITE_DATABASE_FILE_NAME = "app.sqlite";
