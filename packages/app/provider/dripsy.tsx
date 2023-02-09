import { DripsyProvider, makeTheme } from 'dripsy'
import { Platform } from 'react-native'
export const fontName = 'Noto Sans'
export const NotoSansBold = 'Noto Sans Bold'
export const NotoSansBoldItalic = 'Noto Sans Bold Italic'

const webFont = (font: string) =>
  Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, Inter-serif`,
    default: font,
  })

const size = {
  $0: 0,
  $0a: 2,
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
  $7a: 30,
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
  $backgroundSecondary: '#0D2035',
  $shadow: 'rgb(26,64,98)',
  $text: '#FFFFFF',
  $primary: '#0E2B46',
  $success: '#00FF19',
  $error: '#F37070',
  $info: '#F9B32B',
  $yellow: 'rgb(255,255,84)',
  $yellowOrange: '#f7ff00',
  $border: '#B3BADE',
  $borderBlue: '#33A0D0',
  $secondary: '#0D2035',
  $blue: '#1e79d4',
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
  $placeholder: '#8B8787',
  placeholderTextColor: 'this string is ignored but must be declared',
  $orange: '#F15D12',
  $accent: '#F15D12',
  $transparent: '#00000000',
  $gray: '#DBDBDB',
  $black: '#062646',
  $dim: '#FFFFFFBF', //opacity 75%
  $dim1: '#FFFFFF80', // opacity 50%
  $yellowGold: '#FFDB6D',
}

const colorGradient = {
  grey: ['#CCCCCC', '#666666'],
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
  plainLightBlue: ['rgba(61, 127, 156, 0.6)', 'rgba(61, 127, 156, 0.6)'],
  green: ['rgb(88,173,64)', 'rgb(47,106,50)'],
  pink: ['rgb(204,64,87)', 'rgb(179,43,60)'],
  yellow: ['rgb(213,190,63)', 'rgb(206,121,45)'],
  yellowOrange: ['#E7D215', '#D9A20D', '#CE7F08'],
  gold: ['rgb(242,168,59)', 'rgb(247,209,70)', 'rgb(242,168,59)'],
  orange: ['rgb(235,166,78)', 'rgb(210,78,86)'],
  orangeRed: ['rgb(231, 97, 21)', 'rgb(206, 48, 8)'],
  main: ['#24C0E3', '#3799CC'],
  secondary: ['#33A0D0', '#0B76A5'],
  PaleBlue: ['#066D9A', '#014F71'],
  PaleBlue60: ['#066D9A99', '#014F7199'],
  lightPurple2x: ['#a044ff', '#6a3093'],
  lightRed: ['#FC819B', '#E13256'],
  lightGreen: ['#91F5CA', '#24AA3F'],
  lightBlue: ['#8EB0FF', '#2B32F9'],
  lightYellow: ['#F7ED7B', '#F9B32B'],
  orangeDark: ['#FBC000', '#C26202'],
  wineRed: ['#BF0A31', '#78031D'],
  white: ['#FFF', '#FFF'],
  transparent: ['', ''],
  disabled: ['#CCC', '#CCC'],
  disabledSecondary: ['#666', '#666'],
  background: ['#066D9A', '#014F71'],
  backgroundSecondary: ['#33A0D0', '#0B76A5'],
}

// default breakpoints [0, 576, 768, 992, 1200]
const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    body: {
      color: 'white',
    },
    p: {
      color: 'white',
      fontSize: 16,
    },
    error: {
      color: '$error',
      fontSize: 14,
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
      fontSize: '$3',
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
      px: '$10',
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
  activityIndicator: {
    primary: {
      color: commonColors.$lightCyan,
    },
  },
  // fontSizes: {
  //   $0: '0.75rem', // 12px
  //   $1: '1rem', // 16px
  //   $2: '1.125rem', // 18px
  //   $3: '1.25rem', // 20px
  //   $4: '1.375rem', // 22px
  //   $5: '1.5em', // 24px
  //   $6: '1.625rem', // 26px
  //   $7: '1.75rem', // 28px
  //   $8: '1.875rem', // 30px
  //   $9: '2rem', // 32px
  // },
  fontSizes: {
    $0: 12,
    $1: 16,
    $2: 18,
    $3: 20,
    $4: 22,
    $5: 24,
    $6: 26,
    $7: 28,
    $8: 30,
    $9: 32,
  },
  colors: commonColors,
  linearGradients: colorGradient,
  space: size,
  sizes: {
    $button: 40,
    container: 768,
    header: [50, 60],
  },
  roundness: {
    sm: 5,
    md: 8,
    lg: 25,
  },
  fonts: {
    root: fontName,
  },
  customFonts: {
    [fontName]: {
      // I recommend setting every weight here
      bold: webFont(NotoSansBold),
      default: webFont(fontName),
      normal: webFont(fontName),
      // 500: 'arialMedium',
      // 600: 'arialBold',
      // 700: HelveticaBold,
      // 800: 'arialBold',
      900: webFont(NotoSansBoldItalic),
    },
  },
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
