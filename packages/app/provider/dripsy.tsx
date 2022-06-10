import { DripsyProvider, makeTheme } from 'dripsy'
import useOnAppStart from 'app/hooks/useOnAppStart'

const sizeList = {
  $0: 0,
  $1: 2,
  $2: 4,
  $3: 6,
  $4: 8,
  $5: 10,
  $6: 12,
  $7: 14,
  $8: 16,
  $9: 18,
  $10: 20,
  $11: 22,
  $12: 24,
  $15: 30,
  $16: 32,
  $20: 40,
}

const size = {
  $0: 0,
  $0a: 2,
  '$1-5': 20,
  $1: 4,
  $1a: 6,
  $2: 8,
  $2a: 10,
  $3: 12,
  $3a: 14,
  $4: 16,
  $5: 20,
  $6: 24,
  $7: 28,
  $7a: 32,
  $8: 32,
  $9: 36,
  $10: 40,
  $10a: 48,
  $11: 64,
  $11a: 72,
  $12: 88,
  $12a: 96,
  $13: 112,
  $14: 136,
  $15: 160,
}

const commonColors = {
  $background: '#033454',
  $shadow: 'rgb(26,64,98)',
  $text: '#FFFFFF',
  $primary: '#0E2B46',
  accent: 'cyan',
  success: 'green',
  $error: '#F37070',
  $yellow: 'rgb(255,255,84)',
  $border: '#B3BADE',
  $secondary: '#0D2035',
  $navyBlue: '#066D9A',
  $navyBlue2: '#246d92',
  $lightNavyBlue: '#33A0D0',
  $lightNavyBlue2: '#AFE4FF',
  $lightCyan: '#9CD9FA',
  $darkNavyBlue: '#014F71',
  $dark: '#132C43',
  $oceanBlue: '#9AC9FF',
  $cyan: '#00E5FF',
  $darkOcean: '#002243',
  $darkOcean2: '#133351',
  $disabled: '#BDBDBD',
  $PaleBlue: '#C0E0FD',
  $PastelBlue: '#6397B7',
  $yellowLight: '#F6FF7A',
  $taupeGray: '#8B8787',
  placeholderTextColor: 'this string is ignored but must be declared',
  $orange: '#F15D12',
  $accent: '#F15D12',
}

const colorGradient = {
  maroon: ['rgb(160,50,100)', 'rgb(112,27,42)'],
  lightPurple: ['rgb(174,98,206)', 'rgb(115,54,124)'],
  purple: ['rgb(71,82,200)', 'rgb(40,47,120)'],
  blue: ['rgb(115,218,191)', 'rgb(46,101,99)'],
  darkBlue: ['rgb(25,52,93)', 'rgb(18,33,53)'],
  navyBlue: ['rgb(6, 109, 154)', 'rgb(1, 79, 113)'],
  darkNavyBlue: ['rgb(19, 51, 81)', 'rgb(13, 32, 53)'],
  lightNavyBlue: ['rgb(51, 160, 208)', 'rgb(1, 79, 113)'],
  oceanBlue: ['rgb(24, 95, 161)', 'rgb(51, 160, 208)'],
  lightOceanBlue: ['rgb(36, 108, 158)', 'rgb(29, 89, 135)'],
  darkOceanBlue: ['rgb(3, 62, 116)', 'rgb(19, 44, 71)'],
  green: ['rgb(88,173,64)', 'rgb(47,106,50)'],
  pink: ['rgb(204,64,87)', 'rgb(179,43,60)'],
  yellow: ['rgb(213,190,63)', 'rgb(206,121,45)'],
  gold: ['rgb(242,168,59)', 'rgb(247,209,70)', 'rgb(242,168,59)'],
  orange: ['rgb(235,166,78)', 'rgb(210,78,86)'],
  orangeRed: ['rgb(231, 97, 21)', 'rgb(206, 48, 8)'],
  main: ['#24C0E3', '#3799CC'],
  secondary: ['#33A0D0', '#0B76A5'],
  PaleBlue: ['#066D9A', '#014F71'],
  lightRed: ['#FC819B', '#E13256'],
  lightGreen: ['#91F5CA', '#24AA3F'],
  lightBlue: ['#8EB0FF', '#2B32F9'],
  lightYellow: ['#F7ED7B', '#F9B32B'],
  wineRed: ['#BF0A31', '#78031D'],
  white: ['#FFF', '#FFF'],
}

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    body: {
      color: 'white',
      fontSize: 16,
    },
    p: {
      color: 'white',
      fontSize: 16,
    },
    error: {
      color: '$error',
    },
    xs: {
      fontSize: '$0',
    },
    sm: {
      fontSize: '$1',
    },
    md: {
      fontSize: '$2',
    },
    lg: {
      fontSize: 20,
    },
  },
  buttons: {
    xs: {
      height: 22,
      px: '$4',
    },
    sm: {
      height: 28,
      px: '$7',
    },
    md: {
      height: 40,
      px: '$10',
    },
    lg: {
      height: 50,
      px: '$20',
    },
  },
  forms: {
    wrapper: {
      mb: '$2',
    },
    input: {
      color: 'white',
    },
  },
  icon: {
    color: 'white',
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32,
  },
  colors: commonColors,
  linearGradients: colorGradient,
  space: sizeList,
  sizes: {
    $button: 40,
  },
  roundness: {
    sm: 5,
    md: 8,
    lg: 25,
  },
})

type MyTheme = typeof theme
declare module 'dripsy' {
  // eslint-disable-next-line
  interface DripsyCustomTheme extends MyTheme {}
}

export function Dripsy({ children }: { children: React.ReactNode }) {
  useOnAppStart()

  return (
    <DripsyProvider
      theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr
    >
      {children}
    </DripsyProvider>
  )
}
