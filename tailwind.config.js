/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2ecc71',
        secondary: '#f8f9fa',
        accent: '#e74c3c',
      },
    },
  },
  plugins: [],
}

