/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans Bengali", "Hind Siliguri", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        nextgen: {
          "primary": "#0f5f86",
          "secondary": "#10a7a0",
          "accent": "#8fe6d0",
          "neutral": "#09283a",
          "base-100": "#ffffff",
          "base-200": "#f3f8fa",
          "base-300": "#e4eef2",
          "info": "#1687b9",
          "success": "#16966f",
          "warning": "#d18b18",
          "error": "#d34f4f"
        }
      }
    ]
  }
};