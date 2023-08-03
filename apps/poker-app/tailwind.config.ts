import { Config } from 'tailwindcss'

import { tailwindPreset } from '@easypoker/ui/lib/tailwind-preset'

const tailwindConfig = {
  presets: [tailwindPreset],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components_next/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@easypoker/ui/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@easypoker/ui/lib/**/*.{js,ts,jsx,tsx}',
    './node_modules/@easypoker/ui/theme/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config

export default tailwindConfig
