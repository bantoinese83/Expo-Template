import { create } from "zustand";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  data?: any;
}

interface LogStore {
  logs: LogEntry[];
  addLog: (level: LogEntry["level"], message: string, data?: any) => void;
  clearLogs: () => void;
}

const MAX_LOGS = 200;

export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (level, message, data) =>
    set((state) => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).slice(2, 9),
        timestamp: new Date().toISOString(),
        level,
        message,
        data,
      };
      const newLogs = [newLog, ...state.logs].slice(0, MAX_LOGS);
      return { logs: newLogs };
    }),
  clearLogs: () => set({ logs: [] }),
}));
