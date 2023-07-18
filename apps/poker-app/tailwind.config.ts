const sharedConfig = require('@easypoker/ui/lib/tailwind-preset')

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  presets: [sharedConfig],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@easypoker/ui/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@easypoker/ui/theme/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
