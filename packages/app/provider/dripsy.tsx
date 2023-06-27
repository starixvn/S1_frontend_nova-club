import AvertaStd from 'app/assets/fonts/Averta'
import { DripsyProvider, makeTheme } from 'dripsy'
import { Platform } from 'react-native'

const webFont = (font: string) =>
  Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`,
    default: font,
  })

/* sizes, space, radii
  https://github.com/nandorojo/dripsy/blob/master/packages/dripsy/src/core/css/scales.ts

  $0: 0,
  $1: 4,
  $2: 8,
  $3: 16,
  $4: 32,
  $5: 64,
  $6: 128,
  $7: 256,
  $8: 512,
*/

// default breakpoints [0, 576, 768, 992, 1200]
const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  customFonts: {
    [AvertaStd.Regular.name]: {
      bold: webFont(AvertaStd.Bold.name),
      default: webFont(AvertaStd.Regular.name),
      normal: webFont(AvertaStd.Regular.name),
      '400': webFont(AvertaStd.Regular.name),
      '500': webFont(AvertaStd.Semibold.name),
      '600': webFont(AvertaStd.Bold.name),
      '700': webFont(AvertaStd.Bold.name),
      '800': webFont(AvertaStd.Bold.name),
      '900': webFont(AvertaStd.Black.name),
    },
  },
  breakpoints: [576, 768, 992, 1200, 1400],
  layout: {
    container: {
      width: ['100%', '100%', '100%', '100%', '95%'],
      maxWidth: ['100%', '100%', '100%', '100%', 1360],
    },
  },
  fonts: {
    root: AvertaStd.Regular.name,
  },
  forms: {
    input: {
      fontSize: 16,
      color: '$text',
      fontFamily: AvertaStd.Regular.name,
    },
    icon: {
      size: 16,
      color: '$text',
    },
    body: {
      alignItems: 'stretch',
      mx: [0, 0, 0, 'auto'],
      minWidth: [0, 0, 0, 590],
    },
  },
  text: {
    body: {
      fontSize: 16,
      color: '$text',
    },
  },
  colors: {
    $text: '#fff',
    $background: '#1E2238',
    $primary: {
      50: '#9696ff',
      100: '#9696E6',
      200: '#7B7BCF',
      300: '#50509E',
      500: '#32325A',
      700: '#1E2238',
    },
    $secondary: {
      100: '#FAFA7F',
      200: '#FFC65D',
      300: '#F9B32A',
      500: '#E69B0D',
      600: '#D79535',
    },
    $tertiary: '#7fcfff',
    $success: '#01ff0d',
    $error: '#E43221',
    $placeholder: '#ffffff80',
    $otp: '#E69B0D',
    $info: '#F9B32A',
    $accent: '#F15D12',

    $black: '#000',
    $white: '#fff',
    $transparent: 'rgba(0,0,0,0)',
    $transparentWhite: 'rgba(255,255,255,0)',
    $disabled: '#7D7D7D',
    // selectionColor: '$tertiary',
  },
  linearGradients: {
    button: ['$primary.100', '$tertiary'],
    // surface: ['$primary.300', '#$primary.500'],
    surface: ['$primary.300', '$primary.500'],
    ball: ['$success', '$error'],
    shading: ['$primary.500', '$transparent'],
    secondary: ['$secondary.100', '$secondary.500'],
  },
  shadows: {
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.7,
      shadowRadius: 2.1,
      elevation: 3,
    },
  },
  space: {
    $pagePadding: 24,
    $sectionBottomSpace: 20,
    $layoutSpace: 16,
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
    $7: 256,
    $8: 512,
  },
  sizes: {
    container: 768,
    header: [50, 60],
  },
})

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

type MyTheme = typeof theme
declare module 'dripsy' {
  interface DripsyCustomTheme extends MyTheme {}
}
