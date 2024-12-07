/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "butterscotch": " #D59037ff",
        "jet": "#343434ff",
        "persian-red": " #BB3335ff",
        "rosy-brown": " #CC9D9Eff",
        "redwood": "#B34043ff",
        "snow": "#FBF5F8ff",
        "russet": "#854426ff",
        "chocolate-cosmos": " #490007ff",
        "peaches":"#eed4c1",
        "redwoodOP":"#b3404457"
      },
      boxShadow: {
        'right-only': '4px 0 8px rgba(0, 0, 0, 0.2)', // ajuste o valor conforme necessário
      },
      objectPosition: {
        'center-center': 'center center',
      }
    },
  },
  plugins: [],
}
