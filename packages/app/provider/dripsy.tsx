import { DripsyProvider, makeTheme } from 'dripsy'

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
  fffff: '#ffffff', // WIP: Should be change to better naming
  placeholderTextColor: 'this string is ignored but must be declared',
}

const colorGradient = {
  maroon: ['rgb(160,50,100)', 'rgb(112,27,42)'],
  purple: ['rgb(71,82,200)', 'rgb(40,47,120)'],
  blue: ['rgb(115,218,191)', 'rgb(46,101,99)'],
  darkBlue: ['rgb(25,52,93)', 'rgb(18,33,53)'],
  green: ['rgb(88,173,64)', 'rgb(47,106,50)'],
  pink: ['rgb(204,64,87)', 'rgb(179,43,60)'],
  yellow: ['rgb(213,190,63)', 'rgb(206,121,45)'],
  orange: ['rgb(235,166,78)', 'rgb(210,78,86)'],
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
    sm: {
      fontSize: 12,
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
  // space: {
  //     $1: 4,
  //     $2: 8,
  //     $3: 12,
  // },
  colors: commonColors,
  linearGradients: colorGradient,
  space: sizeList,
})

type MyTheme = typeof theme
declare module 'dripsy' {
  // eslint-disable-next-line
  interface DripsyCustomTheme extends MyTheme {}
}

export function Dripsy({ children }: { children: React.ReactNode }) {
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
