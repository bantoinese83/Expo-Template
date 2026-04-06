import "../global.css";
import "@/i18n";

import { AppProviders, bootstrapAppShell, RootGate } from "@/app";

bootstrapAppShell();

export default function RootLayout() {
  return (
    <AppProviders>
      <RootGate />
    </AppProviders>
  );
}
