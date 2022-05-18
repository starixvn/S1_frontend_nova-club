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
  $15: 30,
}

const commonColors = {
  $background: '#033454',
  $shadow: 'rgb(26,64,98)',
  $text: '#FFFFFF',
  $primary: '#0E2B46',
  accent: 'cyan',
}

const colorGradient = {
  maroon: ['rgb(160,50,100)', 'rgb(112,27,42)'],
  purple: ['rgb(71,82,200)', 'rgb(40,47,120)'],
  green: ['rgb(88,173,64)', 'rgb(47,106,50)'],
  pink: ['rgb(204,64,87)', 'rgb(179,43,60)'],
  orange: ['rgb(235,166,78)', 'rgb(210,78,86)'],
}

const theme = makeTheme({
  text: {
    p: {
      fontSize: 16,
    },
  },
  colors: commonColors,
  linearGradients: colorGradient,
  space: sizeList,
})
type MyTheme = typeof theme
declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
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
