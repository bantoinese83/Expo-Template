/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          light: "#e0e7ff",
        },
        secondary: {
          DEFAULT: "#10b981",
        },
        dark: {
          DEFAULT: "#020617",
          gray: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
