import { errorTracking } from "../services/ErrorTracking";
import { useLogStore } from "../store/useLogStore";

/**
 * A standardized logging utility for the 2026 Expo Template.
 * Supports levels: info, warn, error, and debug.
 * Can be extended to pipe logs to external services (Sentry, Datadog).
 */

type LogLevel = "info" | "warn" | "error" | "debug";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Default to info in production, debug in dev
const CURRENT_LOG_LEVEL = __DEV__ ? LOG_LEVELS.debug : LOG_LEVELS.info;

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    if (LOG_LEVELS[level] < CURRENT_LOG_LEVEL) return;

    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

    // Leave a breadcrumb for observability in production crashes
    if (level !== "debug") {
      errorTracking.addBreadcrumb(message, level);
    }

    // Defer so logging never runs synchronous Zustand updates during React commit/error recovery,
    // which can trigger "state update on a component that hasn't mounted yet" (e.g. ErrorBoundary).
    queueMicrotask(() => {
      useLogStore.getState().addLog(level, message, data);
    });

    switch (level) {
      case "debug":
        console.debug(formattedMessage, data ?? "");
        break;
      case "info":
        console.info(formattedMessage, data ?? "");
        break;
      case "warn":
        console.warn(formattedMessage, data ?? "");
        break;
      case "error":
        console.error(formattedMessage, data ?? "");
        // Automatically report errors to our tracking service
        errorTracking.captureException(data?.error ?? message, data);
        break;
    }
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data);
  }

  info(message: string, data?: any) {
    this.log("info", message, data);
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  error(message: string, error?: Error | unknown, additionalData?: any) {
    this.log("error", message, { error, ...additionalData });
  }
}

export const logger = new Logger();
