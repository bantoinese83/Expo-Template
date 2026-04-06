import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";
import { SQLITE_DATABASE_FILE_NAME } from "./sqliteDatabase";

const expoDb = openDatabaseSync(SQLITE_DATABASE_FILE_NAME);

export const db = drizzle(expoDb, { schema });
