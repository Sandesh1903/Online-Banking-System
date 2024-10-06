/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding a custom color
        darkBulish: '#407bff',
        mediumBluish: '#2486ff',
        normalBlusih: '#85b7ff',
        lightBlusih: '#e9f2ff'
      },
      animation: {
        'fade-spin': 'spin 2s linear infinite',
        'spin-reverse': 'spin 1s linear infinite reverse'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}