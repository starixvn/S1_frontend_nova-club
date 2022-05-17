import { DripsyProvider, makeTheme } from 'dripsy'

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
    colors: {
        $text: 'white',
        success: 'green',
        $primary: 'blue',
        $error: '#F37070',
        $border: '#B3BADE',
        '0D2035': '#0D2035', // WIP: Should be change to better naming
        fffff: '#ffffff', // WIP: Should be change to better naming
        placeholderTextColor: 'this string is ignored but must be declared',
    },
    space: {
        $1: 4,
        $2: 8,
        $3: 12,
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
