import { DripsyProvider, makeTheme } from 'dripsy'

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    p: {
      fontSize: 16,
    },
  },
  colors: {
    '0D2035': '#0D2035', // WIP: Should be change to better naming
    'fffff': '#ffffff', // WIP: Should be change to better naming
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
