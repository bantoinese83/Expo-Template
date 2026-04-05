import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  isFirstLaunch: boolean;
  completeOnboarding: () => void;
  version: number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
      isFirstLaunch: true,
      completeOnboarding: () => set({ isFirstLaunch: false }),
      version: 1,
    }),
    {
      name: "app-storage",
      version: 1, // Store version for migrations
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Perform migration logic if needed
        }
        return persistedState as AppState;
      },
    }
  )
);
