/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(main)/**/*.{js,ts,jsx,tsx,mdx}',
    './app/admin/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF69B4', // Hot pink
        secondary: '#FF1493', // Deep pink
        accent: '#FFB6C1', // Light pink
        horse: '#8B4513', // Saddle brown
        gold: '#FFD700', // Gold
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
