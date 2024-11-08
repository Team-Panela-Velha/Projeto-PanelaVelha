/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "body-color": "#f7efe4",
        "aside-color": "#c13236",
        "img-border-color": "#430009"
      },
      boxShadow: {
        'right-only': '4px 0 8px rgba(0, 0, 0, 0.2)', // ajuste o valor conforme necessário
      },
    },
  },
  plugins: [],
}
