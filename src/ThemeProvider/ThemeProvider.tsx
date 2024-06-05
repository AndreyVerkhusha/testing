import { getContrastRatio } from '@mui/material'
import { createTheme, ThemeProvider as ThemeProviderMui } from '@mui/material/styles'
import { ReactNode } from 'react'

import { brownMain } from '../constants/theme'

declare module '@mui/material/styles' {
  interface Palette {
    brown: Palette['primary']
  }

  interface PaletteOptions {
    brown?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brown: true
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    palette: {
      brown: {
        main: brownMain,
        contrastText: getContrastRatio(brownMain, '#fff') > 4.5 ? '#fff' : '#111',
      },
    },
  })

  return <ThemeProviderMui theme={theme}>{children}</ThemeProviderMui>
}
