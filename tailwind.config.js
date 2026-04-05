/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "primary-light": "#e0e7ff",
        secondary: "#10b981",
        danger: "#ef4444",
        "dark-gray": "#1e293b",
        "medium-gray": "#64748b",
        "light-gray": "#cbd5e1",
        dark: {
          DEFAULT: "#020617",
        },
        surface: {
          light: "#ffffff",
          dark: "#0f172a", // slate-900
        },
        muted: {
          light: "#64748b", // slate-500
          dark: "#94a3b8", // slate-400
        },
        border: {
          light: "#e2e8f0", // slate-200
          dark: "#1e293b", // slate-800
        },
      },
    },
  },
  plugins: [],
};
