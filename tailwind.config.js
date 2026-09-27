export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: { ink: "#0f172a", brand: { DEFAULT: "#2563eb", dark: "#1d4ed8", soft: "#e8efff" } },
    fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
  } },
  plugins: [],
};
