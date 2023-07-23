import { Config } from 'tailwindcss'

import { tailwindPreset } from './lib/tailwind-preset'

module.exports = {
  presets: [tailwindPreset],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
} satisfies Config
