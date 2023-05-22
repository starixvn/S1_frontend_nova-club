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
      100: '#9696E6',
      200: '#7B7BCF',
      300: '#50509E',
      500: '#32325A',
      700: '#1E2238',
    },
    $secondary: {
      100: '#FAFA7F',
      500: '#E69B0D',
    },
    $tertiary: '#80CEFF',
    $success: '#0DBF00',
    $error: '#E43221',
    $placeholder: '#ffffff80',
    // selectionColor: '$tertiary',
  },
  linearGradients: {
    // nesteed color not working for now, https://github.com/nandorojo/dripsy/issues/286
    button: ['#9696E6', '#7fc9fc'],
    // surface: ['$primary.300', '#$primary.500'],
    surface: ['$primary.300', '$primary.500'],
    ball: ['$success', '$error'],
  },
  space: {
    $pagePadding: 24,
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
