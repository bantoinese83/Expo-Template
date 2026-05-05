import "../global.css";
import "@/i18n";

import { bootstrapAppShell } from "@/bootstrap";
import { AppProviders } from "@/providers/AppProviders";
import { RootGate } from "@/providers/RootGate";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { db } from "@/db/client";

bootstrapAppShell();

export default function RootLayout() {
  useDrizzleStudio(__DEV__ ? (db as any) : undefined);

  return (
    <AppProviders>
      <RootGate />
    </AppProviders>
  );
}
