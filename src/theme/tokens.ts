/**
 * Central Design Token System for 2026 Expo Template.
 * All design values (colors, spacing, typography) should be defined here.
 */

export const colors = {
  // Brand
  primary: "#6366f1", // Indigo 500
  primaryLight: "#e0e7ff", // Indigo 100
  secondary: "#10b981", // Emerald 500
  danger: "#ef4444", // Rose 500
  warning: "#f59e0b", // Amber 500
  info: "#3b82f6", // Blue 500

  // Neutrals (Slate palette)
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  // Semantic
  background: {
    light: "#f8fafc",
    dark: "#020617",
  },
  surface: {
    light: "#ffffff",
    dark: "#0f172a",
  },
  text: {
    light: "#0f172a",
    dark: "#f8fafc",
    muted: "#64748b",
  },
  border: {
    light: "#e2e8f0",
    dark: "#1e293b",
  },

  /** Full-screen placeholders (e.g. auth + DB bootstrap before navigation mounts). */
  shell: {
    bootstrap: "#263238",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  "3xl": 64,
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: {
    sans: ["Inter", "System"],
    mono: ["Menlo", "Courier New"],
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeight: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "900",
  },
  // Added for professional polish
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
};
