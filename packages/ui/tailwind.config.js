/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  presets: [require('./lib/tailwind-preset')],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
}
