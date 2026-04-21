import "../global.css";
import "@/i18n";

import { bootstrapAppShell } from "@/bootstrap";
import { AppProviders } from "@/providers/AppProviders";
import { RootGate } from "@/providers/RootGate";

bootstrapAppShell();

export default function RootLayout() {
  return (
    <AppProviders>
      <RootGate />
    </AppProviders>
  );
}
