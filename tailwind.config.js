/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        scaleImg: "scaleImg 0.5s ease-out forwards",
      },
      keyframes: {
        scaleImg: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1) rotate-[5deg]" },
        },
      },
    },
  },
  plugins: [],
};
