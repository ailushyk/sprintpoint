'use client'

import { ThemeProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

interface UiProviderProps extends ThemeProviderProps {}
export const UIProvider = ({ children, ...props }: UiProviderProps) => {
  const theme = {
    attribute: 'class',
    defaultTheme: 'dark',
    enableSystem: true,
    ...props,
  }
  return <ThemeProvider {...theme}>{children}</ThemeProvider>
}
