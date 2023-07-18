import { tailwindPreset } from '@easypoker/ui/lib/tailwind-preset'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  presets: [tailwindPreset],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@easypoker/ui/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@easypoker/ui/theme/**/*.{js,ts,jsx,tsx}',
  ],
}

export default tailwindConfig
