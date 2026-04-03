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
      },
    },
  },
  plugins: [],
};
