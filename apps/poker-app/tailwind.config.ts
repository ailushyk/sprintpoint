import { Config } from 'tailwindcss'

import { tailwindPreset } from '@easypoker/ui/lib/tailwind-preset'

const tailwindConfig = {
  presets: [tailwindPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@easypoker/ui/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@easypoker/ui/lib/**/*.{js,ts,jsx,tsx}',
    './node_modules/@easypoker/ui/theme/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config

export default tailwindConfig
